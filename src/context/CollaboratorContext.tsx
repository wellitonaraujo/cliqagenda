
'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { toast } from "react-toastify";
import api from '../services/api';
import { useAuth } from './AuthContext';

type DiaSemana = 'DOMINGO' | 'SEGUNDA' | 'TERCA' | 'QUARTA' | 'QUINTA' | 'SEXTA' | 'SABADO';

export interface Horario {
  diaSemana: DiaSemana;
  horaInicio: string;
  horaFim: string;
  ativo: boolean;
}

export interface Collaborator {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  role: string;
  empresaId: number;
}

export interface CreateCollaboratorInput {
  nome: string;
  email: string;
  telefone: string;
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  horarios: Horario[];
}

interface CollaboratorContextData {
  collaborators: Collaborator[];
  loading: boolean;
  createCollaborator: (data: CreateCollaboratorInput) => Promise<void>;
  fetchCollaborators: () => Promise<void>;
}

const CollaboratorContext = createContext<CollaboratorContextData>(
  {} as CollaboratorContextData
);

export const CollaboratorProvider = ({ children }: { children: ReactNode }) => {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [loading, setLoading] = useState(false);

  const { isAuthenticated, isLoading: authLoading } = useAuth();

  const fetchCollaborators = async () => {
    setLoading(true);
    try {
      const response = await api.get<Collaborator[]>('/collaborators');
      setCollaborators(response.data);
    } catch (error) {
      toast.error('Erro ao buscar colaboradores');
      if ((error as any)?.response?.status === 401) {
        window.dispatchEvent(new Event('unauthorized'));
      }
    } finally {
      setLoading(false);
    }
  };


  const createCollaborator = async (data: CreateCollaboratorInput) => {
    setLoading(true);
    try {
      await api.post('/collaborators', data);
      await fetchCollaborators();
    } catch (error: any) {
      if (error.response?.status === 409) {
        toast.error('Já existe um colaborador com este e-mail.');
      }
      throw error;
    }
    
  };

 useEffect(() => {
    if (!isAuthenticated || authLoading) return;
    fetchCollaborators();
  }, [isAuthenticated, authLoading]);

  
  return (
    <CollaboratorContext.Provider
      value={{
        collaborators,
        loading,
        createCollaborator,
        fetchCollaborators,
      }}
    >
      {children}
    </CollaboratorContext.Provider>
  );
};

export const useCollaborator = () => {
  const context = useContext(CollaboratorContext);
  if (!context) {
    throw new Error('useCollaborator deve ser usado dentro de um CollaboratorProvider');
  }
  return context;
};
