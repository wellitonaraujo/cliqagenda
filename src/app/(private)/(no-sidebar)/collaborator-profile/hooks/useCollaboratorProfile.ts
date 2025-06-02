import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export function useCollaboratorProfile() {
  const [loading, setLoading] = useState(true);
  const [dados, setDados] = useState<any>({});
  const params = useParams();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/colaboradores/${params.id}`);
      const data = await response.json();
      setDados(data);
      setLoading(false);
    }
    fetchData();
  }, [params.id]);

  return {
    ...dados,
    loading,
    diaSemanaMap: {
      0: 'Domingo',
      1: 'Segunda',
      2: 'Terça',
      3: 'Quarta',
      4: 'Quinta',
      5: 'Sexta',
      6: 'Sábado',
    },
  };
}
