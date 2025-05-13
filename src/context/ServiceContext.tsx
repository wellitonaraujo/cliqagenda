'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Service = {
  id: string;
  name: string;
  price: string;
  duration: string;
  collaboratorIds: string[];
};

type ServiceContextType = {
  services: Service[];
  addService: (service: Service) => void;
};

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

const STORAGE_KEY = 'myapp_services';

export function ServiceProvider({ children }: { children: ReactNode }) {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setServices(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(services));
  }, [services]);

  const addService = (service: Service) => {
    setServices((prev) => [...prev, service]);
  };  

  return (
    <ServiceContext.Provider value={{ services, addService }}>
      {children}
    </ServiceContext.Provider>
  );
}

export function useServices() {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error('useServices must be used within a ServiceProvider');
  }
  return context;
}
