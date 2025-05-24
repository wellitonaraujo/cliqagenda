"use client"

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Collaborator } from '@/types/collaborator';
import api from '@/services/api';

type CollaboratorContextType = {
  collaborators: Collaborator[];
  addCollaborator: (collaborator: Collaborator) => void;
  fetchCollaborators: () => Promise<void>;
  loading: boolean;
};

const CollaboratorContext = createContext<CollaboratorContextType | undefined>(undefined);

export const CollaboratorProvider = ({ children }: { children: ReactNode }) => {
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchCollaborators() {
    setLoading(true);
    try {
      const response = await api.get('/collaborators')
      setCollaborators(response.data);
      localStorage.setItem('collaborators', JSON.stringify(response.data));
    } catch (error) {
      console.error('Erro ao buscar colaboradores', error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const stored = localStorage.getItem('collaborators');
    if (stored) {
      setCollaborators(JSON.parse(stored));
      setLoading(false);
    } else {
      fetchCollaborators();
    }
  }, []);

  const addCollaborator = (c: Collaborator) => {
    setCollaborators((prev) => {
      const updated = [...prev, c];
      localStorage.setItem('collaborators', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <CollaboratorContext.Provider value={{ collaborators, addCollaborator, fetchCollaborators, loading }}>
      {children}
    </CollaboratorContext.Provider>
  );
};

export const useCollaborators = () => {
  const context = useContext(CollaboratorContext);
  if (!context) throw new Error('useCollaborators must be used within a CollaboratorProvider');
  return context;
};
