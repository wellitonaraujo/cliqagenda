'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from 'react';
import { User, Empresa } from '@/types/user';
import { useRouter } from 'next/navigation';
import api from '@/services/api';

interface AuthContextData {
  user: User | null;
  empresa: Empresa | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext({} as AuthContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [empresa, setEmpresa] = useState<Empresa | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const normalizeEmpresaFromUser = (user: User): Empresa => {
    return {
      id: user.empresaId,
      nome: user.empresaNome,
    };
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedEmpresa = localStorage.getItem('empresa');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
      try {
        const parsedUser: User = JSON.parse(storedUser);
        setUser(parsedUser);

        if (storedEmpresa) {
          try {
            const parsedEmpresa: Empresa = JSON.parse(storedEmpresa);
            setEmpresa(parsedEmpresa);
          } catch {
            // Se der erro no parse da empresa, tenta normalizar a partir do user
            setEmpresa(normalizeEmpresaFromUser(parsedUser));
          }
        } else {
          // Se não tem empresa armazenada, cria a partir do user
          setEmpresa(normalizeEmpresaFromUser(parsedUser));
        }

        api.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
      } catch (e) {
        console.error('Erro ao fazer parse do usuário:', e);
        setUser(null);
        setEmpresa(null);
      }
    }

    setIsLoading(false);
  }, []);

  const login = async (email: string, senha: string) => {
    setIsLoading(true);

    try {
      const response = await api.post('/auth/login', { email, senha });
      const { token, user } = response.data;

      // Criar o objeto empresa a partir do user
      const empresaNormalizada = normalizeEmpresaFromUser(user);

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('empresa', JSON.stringify(empresaNormalizada));

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      setUser(user);
      setEmpresa(empresaNormalizada);
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
    localStorage.removeItem('empresa');
    setUser(null);
    setEmpresa(null);
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
    <AuthContext.Provider
      value={{
        user,
        empresa,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
