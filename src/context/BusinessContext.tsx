"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from './AuthContext';
import api from '@/services/api';

export enum DiaSemana {
  DOMINGO = 'DOMINGO',
  SEGUNDA = 'SEGUNDA',
  TERCA = 'TERCA',
  QUARTA = 'QUARTA',
  QUINTA = 'QUINTA',
  SEXTA = 'SEXTA',
  SABADO = 'SABADO',
}

export interface Horario {
  diaSemana: DiaSemana;
  aberto: boolean;
  horaAbertura?: string;
  horaFechamento?: string;
}

export interface UpdateHorarioDto {
  horarios: Horario[];
}

interface BusinessContextData {
  horarios: Horario[] | null;
  loading: boolean;
  error: string | null;
  fetchSchedules: (empresaId: number) => Promise<void>;
  updateSchedules: (empresaId: number, dto: UpdateHorarioDto) => Promise<void>;
}

const BusinessContext = createContext<BusinessContextData | undefined>(undefined);

export const BusinessProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();

  const [horarios, setHorarios] = useState<Horario[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchSchedules = async (empresaId: number) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get<Horario[]>(`/empresa/${empresaId}/horarios`);
      setHorarios(response.data);
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || 'Erro ao buscar horários');
    } finally {
      setLoading(false);
    }
  };

  const updateSchedules = async (empresaId: number, dto: UpdateHorarioDto) => {
    setLoading(true);
    setError(null);
    try {
      await api.patch(`/empresa/${empresaId}/horarios`, dto);
      await fetchSchedules(empresaId);
    } catch (err: any) {
      setError(err?.response?.data?.message || err.message || 'Erro ao atualizar horários');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.empresaId) {
      fetchSchedules(user.empresaId);
      console.log('EmpresaId carregado:', user.empresaId);
    }
  }, [user?.empresaId]);

  return (
    <BusinessContext.Provider
      value={{
        horarios,
        loading,
        error,
        fetchSchedules,
        updateSchedules,
      }}
    >
      {children}
    </BusinessContext.Provider>
  );
};

export const useBusiness = () => {
  const context = useContext(BusinessContext);
  if (!context) {
    throw new Error('useBusiness must be used within a BusinessProvider');
  }
  return context;
};
