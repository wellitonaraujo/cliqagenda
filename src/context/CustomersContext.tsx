"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';

export type Customer = {
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
};

type CustomerContextType = {
  customers: Customer[];
  addCustomer: (customer: Customer) => void;
  fetchCustomers: () => Promise<void>;
  loading: boolean;
};

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export const CustomerProvider = ({ children }: { children: ReactNode }) => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchCustomers() {
    setLoading(true);
    try {
      const response = await axios.get<Customer[]>('http://localhost:3000/customers');
      setCustomers(response.data);
      localStorage.setItem('customers', JSON.stringify(response.data));
    } catch (error) {
      console.error('Erro ao buscar clientes', error);
    } finally {
      setLoading(false);
    }
  }
  

  useEffect(() => {
    const stored = localStorage.getItem('customers');
    if (stored) {
      setCustomers(JSON.parse(stored));
      setLoading(false);
    } else {
      fetchCustomers();
    }
  }, []);

  const addCustomer = async (c: Customer) => {
    try {
      // Faz o POST no backend
      const response = await axios.post<Customer>('http://localhost:3000/customers', c);
  
      // Atualiza o estado local só se a requisição deu certo
      setCustomers((prev) => {
        const updated = [...prev, response.data];
        localStorage.setItem('customers', JSON.stringify(updated));
        return updated;
      });
    } catch (error) {
      console.error('Erro ao adicionar cliente', error);
      alert('Erro ao adicionar cliente. Tente novamente.');
    }
  };
  

  return (
    <CustomerContext.Provider value={{ customers, addCustomer, fetchCustomers, loading }}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomers = () => {
  const context = useContext(CustomerContext);
  if (!context) throw new Error('useCustomers must be used within a CustomerProvider');
  return context;
};
