"use client"

import { createContext, useContext, useEffect, useState } from 'react';
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

  const fetchCustomers = async () => {
    const res = await api.get('/customers');
    setCustomers(res.data);
  };

  const createCustomer = async (data: CreateCustomerInput) => {
    await api.post('/customers', data);
    await fetchCustomers();
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <CustomerContext.Provider value={{ customers, fetchCustomers, createCustomer }}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomers = () => useContext(CustomerContext);
