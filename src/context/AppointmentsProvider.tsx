import { createContext, useContext, useState, ReactNode, useEffect } from 'react';

// Para criação
interface AppointmentInput {
  customerName: string;
  serviceId: string;
  collaboratorId: string;
  day: string;
  time: string;
}

// Para exibição no front
interface Appointment extends AppointmentInput {
  id: string;
  serviceName: string;
  duration: string;
  price: string;
  time: string;
  status?: string;
}

interface AppointmentsContextData {
  appointments: Appointment[];
  addAppointment: (appointment: Appointment) => void;
  updateAppointment: (id: string, updatedAppointment: Appointment) => void;
  removeAppointment: (id: string) => void;
}

const AppointmentsContext = createContext<AppointmentsContextData | undefined>(undefined);

export function AppointmentsProvider({ children }: { children: ReactNode }) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const storedAppointments = localStorage.getItem('appointments');
    if (storedAppointments) {
      setAppointments(JSON.parse(storedAppointments));
    }
  }, []);

  const addAppointment = (appointment: Appointment) => {
    const newAppointments = [...appointments, appointment];
    setAppointments(newAppointments);
    localStorage.setItem('appointments', JSON.stringify(newAppointments));
  };

  const updateAppointment = (id: string, updatedAppointment: Appointment) => {
    const updatedAppointments = appointments.map((appointment) =>
      appointment.id === id ? { ...appointment, ...updatedAppointment } : appointment
    );
    setAppointments(updatedAppointments);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
  };

  const removeAppointment = (id: string) => {
    const updatedAppointments = appointments.filter((appointment) => appointment.id !== id);
    setAppointments(updatedAppointments);
    localStorage.setItem('appointments', JSON.stringify(updatedAppointments));
  };

  return (
    <AppointmentsContext.Provider value={{ appointments, addAppointment, updateAppointment, removeAppointment }}>
      {children}
    </AppointmentsContext.Provider>
  );
}

export const useAppointments = () => {
  const context = useContext(AppointmentsContext);
  if (!context) throw new Error('useAppointments must be used within AppointmentsProvider');
  return context;
};
