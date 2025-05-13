'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

// Para criação
interface AppointmentInput {
  customerName: string;
  serviceId: string;
  collaboratorId: string;
  day: string;
}

// Para exibição no front
interface Appointment extends AppointmentInput {
  id: string;
  serviceName: string;
  duration: string;
  price: string;
}

interface AppointmentsContextData {
  appointments: Appointment[];
  addAppointment: (appointment: Appointment) => void;
}

const AppointmentsContext = createContext<AppointmentsContextData | undefined>(undefined);

export function AppointmentsProvider({ children }: { children: ReactNode }) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const addAppointment = (appointment: Appointment) => {
    setAppointments(prev => [...prev, appointment]);
  };

  return (
    <AppointmentsContext.Provider value={{ appointments, addAppointment }}>
      {children}
    </AppointmentsContext.Provider>
  );
}

export const useAppointments = () => {
  const context = useContext(AppointmentsContext);
  if (!context) throw new Error('useAppointments must be used within AppointmentsProvider');
  return context;
};
