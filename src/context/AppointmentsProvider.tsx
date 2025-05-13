'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface Appointment {
  id: string;
  customerName: string;
  serviceName: string;
  day: string;
  time: string;
  duration: number | any;
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
