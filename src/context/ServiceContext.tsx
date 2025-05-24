'use client';

import api from '@/services/api';
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type Collaborator = {
  id: number;
  nome: string;
  email: string;
  role: string;
  telefone: string;
  endereco: string;
  empresaId: number;
  createdAt: string;
  updatedAt: string;
};

export type Service = {
  id: number;
  nome: string;
  descricao?: string;
  preco: number;
  duracaoMin: number;
  empresaId: number;
  createdAt: string;
  updatedAt: string;
  colaboradores: Collaborator[];
};

type ServiceContextType = {
  services: Service[];
  fetchServices: () => Promise<void>;
  addService: (
    serviceInput: Omit<Service, 'id' | 'createdAt' | 'updatedAt' | 'colaboradores'> & { colaboradoresIds: number[] }
  ) => Promise<void>;
  loading: boolean;
};

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

const STORAGE_KEY = 'myapp_services';

export function ServiceProvider({ children }: { children: ReactNode }) {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchServices = async () => {
    setLoading(true);
    
  };

  const addService = async (
    serviceInput: Omit<Service, 'id' | 'createdAt' | 'updatedAt' | 'colaboradores'> & { colaboradoresIds: number[] }
  ) => {
    if (!serviceInput.empresaId) {
      alert('Não foi possível identificar a empresa. Faça login novamente.');
      return;
    }

    try {
      setLoading(true);
      const response = await api.post<Service>('/services', {
        nome: serviceInput.nome,
        descricao: serviceInput.descricao,
        preco: serviceInput.preco,
        duracaoMin: serviceInput.duracaoMin,
        empresaId: serviceInput.empresaId,
        colaboradoresIds: serviceInput.colaboradoresIds,
      });
      setServices((prev) => {
        const updated = [...prev, response.data];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return updated;
      });
    } catch (error) {
      console.error('Erro ao adicionar serviço:', error);
      alert('Erro ao salvar serviço. Verifique se está autenticado e os dados.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  return (
    <ServiceContext.Provider value={{ services, fetchServices, addService, loading }}>
      {children}
    </ServiceContext.Provider>
  );
}

export function useServices() {
  const context = useContext(ServiceContext);
  if (!context) throw new Error('useServices must be used within a ServiceProvider');
  return context;
}
