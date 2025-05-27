'use client';

import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/services/api';

interface User {
  id: number;
  nome: string;
  role: string;
  email: string;
  empresaId: number;
}

interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }

    setIsLoading(false);
  }, []);

  const login = async (email: string, senha: string) => {
    setIsLoading(true);

    try {
      const response = await api.post('/auth/login', { email, senha });
      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setUser(user);
    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    delete api.defaults.headers.common['Authorization'];
    router.push('/login'); 
  }, [router]);

    useEffect(() => {
    const handleUnauthorized = () => {
      logout();
    };

    window.addEventListener('unauthorized', handleUnauthorized);

    return () => {
      window.removeEventListener('unauthorized', handleUnauthorized);
    };
  }, [logout]);

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
