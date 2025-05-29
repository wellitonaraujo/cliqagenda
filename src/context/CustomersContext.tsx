'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-toastify';
import api from '@/services/api';

interface Customer {
  id: number;
  nome: string;
  email: string;
  telefone?: string;
  rua?: string;
  numero?: string;
  bairro?: string;
  cidade?: string;
}

interface CreateCustomerInput {
  nome: string;
  email: string;
  telefone?: string;
  rua?: string;
  numero?: string;
  bairro?: string;
  cidade?: string;
}

interface CustomerContextData {
  customers: Customer[];
  fetchCustomers: () => Promise<void>;
  createCustomer: (data: CreateCustomerInput) => Promise<void>;
}

const CustomerContext = createContext<CustomerContextData>({} as CustomerContextData);

export const CustomerProvider = ({ children }: { children: React.ReactNode }) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const { isAuthenticated, isLoading: authLoading } = useAuth();

  const fetchCustomers = async () => {
    try {
      const res = await api.get('/customers');
      setCustomers(res.data);
    } catch (error: any) {
      console.error('Erro ao buscar clientes:', error);
      if (error.response?.status === 401) {
        window.dispatchEvent(new Event('unauthorized'));
      } else {
        toast.error('Erro ao buscar clientes.');
      }
    }
  };

  const createCustomer = async (data: CreateCustomerInput) => {
    try {
      await api.post('/customers', data);
      await fetchCustomers();
    } catch (error: any) {
      if (error.response?.status === 409) {
        toast.error('Cliente já cadastrado com esse CPF ou dados duplicados.');
      } else {
        toast.error('Erro ao cadastrar cliente.');
      }
    }
  };

  useEffect(() => {
    if (!isAuthenticated || authLoading) return; 
    fetchCustomers();
  }, [isAuthenticated, authLoading]);

  return (
    <CustomerContext.Provider value={{ customers, fetchCustomers, createCustomer }}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomers = () => useContext(CustomerContext);
