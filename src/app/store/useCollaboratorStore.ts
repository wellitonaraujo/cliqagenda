import { create } from 'zustand';
import api from '@/services/api';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';

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

interface CollaboratorState {
  collaborators: Collaborator[];
  loading: boolean;
  fetchCollaborators: () => Promise<void>;
  createCollaborator: (data: CreateCollaboratorInput) => Promise<void>;
}

export const useCollaboratorStore = create<CollaboratorState>((set, get) => ({
  collaborators: [],
  loading: false,

  fetchCollaborators: async () => {
    set({ loading: true });
    try {
      const response = await api.get('/collaborators');
      set({ collaborators: response.data });
    } catch (error: unknown) {
      toast.error('Erro ao buscar colaboradores');
      if (
        error &&
        typeof error === 'object' &&
        'response' in error &&
        (error as AxiosError).response?.status === 401
      ) {
        window.dispatchEvent(new Event('unauthorized'));
      }
    } finally {
      set({ loading: false });
    }
  },

  createCollaborator: async (data: Partial<Collaborator>) => {
      set({ loading: true });
      try {
        await api.post('/collaborators', data);
        await get().fetchCollaborators();
      } catch (error: unknown) {
        if (
          error &&
          typeof error === 'object' &&
          'response' in error &&
          (error as AxiosError).response?.status === 409
        ) {
          toast.error('Já existe um colaborador com este e-mail.');
        }
        throw error;
      } finally {
        set({ loading: false });
      }
   },
}));