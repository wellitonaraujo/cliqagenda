'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface Address {
  street: string;
  number: string;
  district: string;
  city: string;
  state: string;
}

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: Address;
}

interface CustomerContextType {
  customers: Customer[];
  addCustomer: (customer: Customer) => void;
  getCustomers: () => Customer[];
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export const useCustomers = (): CustomerContextType => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error('useCustomers must be used within a CustomerProvider');
  }
  return context;
};

interface CustomerProviderProps {
  children: ReactNode;
}

export const CustomerProvider = ({ children }: CustomerProviderProps) => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    const storedCustomers = localStorage.getItem('customers');
    if (storedCustomers) {
      setCustomers(JSON.parse(storedCustomers));
    }
  }, []);

  const addCustomer = (customer: Customer) => {
    const updatedCustomers = [...customers, customer];
    setCustomers(updatedCustomers);
    if (typeof window !== 'undefined') {
      localStorage.setItem('customers', JSON.stringify(updatedCustomers));
    }
  };

  const getCustomers = () => {
    return customers;
  };

  return (
    <CustomerContext.Provider value={{ customers, addCustomer, getCustomers }}>
      {children}
    </CustomerContext.Provider>
  );
};
