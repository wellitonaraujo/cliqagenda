'use client';

import { createContext, useContext, useState, ReactNode, useRef } from 'react';
import { Appointment } from '@/types/Appointment';
import { toast } from 'react-toastify';
import api from '@/services/api';

interface CreateAppointmentPayload {
  clienteId: number;
  colaboradorId: number;
  servicoId: number;
  data: string;
  hora: string;
  duracaoMin?: number;
  preco?: number;
}

interface AppointmentContextType {
  appointments: Appointment[];
  fetchAppointments: (filters?: { colaboradorId?: number; data?: string; status?: string }) => Promise<void>;
  createAppointment: (payload: CreateAppointmentPayload) => Promise<void>;
  updateAppointment: (id: number, payload: Partial<CreateAppointmentPayload> & { status?: string }) => Promise<void>;
  updateAppointmentStatus: (id: number, status: string) => Promise<void>;
  removeAppointment: (id: number) => Promise<void>;
  loading: boolean;
  error: string | null;
}

interface ApiError {
  response?: { data?: { message?: string } };
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export const AppointmentProvider = ({ children }: { children: ReactNode }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cacheRef = useRef<Record<string, Appointment[]>>({});

  const fetchAppointments = async (filters = {}) => {
    const cacheKey = JSON.stringify(filters);

    if (cacheRef.current[cacheKey]) {
      setAppointments(cacheRef.current[cacheKey]);
      setError(null);
      return;
    }

    setLoading(true);
    try {
      const { data } = await api.get('/appointments', { params: filters });
      setAppointments(data);
      cacheRef.current[cacheKey] = data;
      setError(null);
    } catch (err: any) {
      setError(err?.response?.data?.message ?? 'Erro ao buscar agendamentos');
    } finally {
      setLoading(false);
    }
  };

  const createAppointment = async (payload: CreateAppointmentPayload) => {
    setLoading(true);
    try {
      const { data } = await api.post('/appointments', payload);
  
      setAppointments(prev => {
        const updated = [...prev, data];
        cacheRef.current = {};
        return updated;
      });
  
      toast.success('Agendamento realizado.');
      setError(null);
    } catch (err: unknown) {
      const error = err as ApiError;
      const message = error.response?.data?.message ?? 'Erro ao criar agendamento';
      toast.error(message);
      setError(message);
    } finally {
      setLoading(false);
    }
  };
  
  const updateAppointment = async (
    id: number,
    payload: Partial<CreateAppointmentPayload> & { status?: string }
  ) => {
    setLoading(true);
    try {
      const { data } = await api.patch(`/appointments/${id}`, payload);

      setAppointments(prev => {
        const updated = prev.map(appointment => (appointment.id === id ? { ...appointment, ...data } : appointment));
        cacheRef.current = {}; // limpa cache
        return updated;
      });

      toast.success('Agendamento atualizado.');
      setError(null);
    } catch (err: unknown) {
      const error = err as ApiError;
      const message = error.response?.data?.message ?? 'Erro ao atualizar agendamento';
      toast.error(message);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const updateAppointmentStatus = async (id: number, status: string) => {
    setLoading(true);
    try {
      const { data } = await api.patch(`/appointments/${id}/status`, { status });

      setAppointments(prev => {
        const updated = prev.map(app => (app.id === id ? { ...app, ...data } : app));
        cacheRef.current = {}; // limpa cache
        return updated;
      });

      toast.success('Status atualizado.');
      setError(null);
    } catch (err: unknown) {
      const error = err as ApiError;
      const message = error.response?.data?.message ?? 'Erro ao atualizar status';
      toast.error(message);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const removeAppointment = async (id: number) => {
    setLoading(true);
    try {
      await api.delete(`/appointments/${id}`);

      setAppointments(prev => {
        const updated = prev.filter(appointment => appointment.id !== id);
        cacheRef.current = {}; // limpa cache
        return updated;
      });

      toast.success('Agendamento removido.');
      setError(null);
    } catch (err: unknown) {
      const error = err as ApiError;
      const message = error.response?.data?.message ?? 'Erro ao remover agendamento';
      toast.error(message);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        fetchAppointments,
        createAppointment,
        updateAppointment,
        updateAppointmentStatus,
        removeAppointment,
        loading,
        error,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
};

export const useAppointments = () => {
  const context = useContext(AppointmentContext);
  if (!context) throw new Error('useAppointments deve ser usado dentro de AppointmentProvider');
  return context;
};
