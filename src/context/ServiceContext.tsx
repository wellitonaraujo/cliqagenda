"use client"

import api from '@/services/api';
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from './AuthContext';

interface Service {
  id: number;
  nome: string;
  descricao?: string;
  duracaoMin: number;
  preco: number;
  colaboradores: { id: number; nome: string }[];
}

interface CreateServiceDto {
  nome: string;
  descricao?: string;
  duracaoMin: number;
  preco: number;
  colaboradoresIds: number[];
}

interface ServiceContextData {
  services: Service[];
  createService: (data: CreateServiceDto) => Promise<void>;
  loadServices: () => Promise<void>;
}

const ServiceContext = createContext<ServiceContextData | undefined>(undefined);

export const ServiceProvider = ({ children }: { children: ReactNode }) => {
  const [services, setServices] = useState<Service[]>([]);
  const { isAuthenticated, isLoading: authLoading } = useAuth(); 
  interface ApiError {
    response?: {
      status?: number;
      data?: {
        message?: string;
      };
    };
    message?: string;
  }

  const loadServices = async () => {
    try {
      const { data } = await api.get<Service[]>('/services');
      setServices(data);
    } catch (error: unknown) {
      const err = error as ApiError;
      console.error('Erro ao carregar serviços:', err);

      if (err.response?.status === 401) {
        window.dispatchEvent(new Event('unauthorized'));
      }
    }
  };

  const createService = async (data: CreateServiceDto) => {
    try {
      const response = await api.post<Service>('/services', data);
      setServices((prev) => [...prev, response.data]);
    } catch (error: unknown) {
      const err = error as ApiError;
      console.error('Erro ao criar serviço:', err);
      throw new Error(err.response?.data?.message || 'Erro ao criar serviço');
    }
  };

  useEffect(() => {
    if (!isAuthenticated || authLoading) return; 
    loadServices();
  }, [isAuthenticated, authLoading]);


  return (
    <ServiceContext.Provider value={{ services, createService, loadServices }}>
      {children}
    </ServiceContext.Provider>
  );
};

export const useService = () => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error('useService deve ser usado dentro de ServiceProvider...');
  }
  return context;
};
