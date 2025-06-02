import { useEffect, useState } from 'react';
import api from '@/services/api';

export interface User {
  id: number;
  nome: string;
}

export function useCollaborators() {
  const [colaboradores, setColaboradores] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetch() {
      try {
        setLoading(true);
        const response = await api.get<User[]>('/collaborators');
        setColaboradores(response.data);
      } catch (err) {
        setError((err as Error).message || 'Erro ao carregar colaboradores');
      } finally {
        setLoading(false);
      }
    }
    fetch();
  }, []);

  return { colaboradores, loading, error };
}
