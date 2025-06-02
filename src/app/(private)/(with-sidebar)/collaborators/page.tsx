'use client';

import { useRouter } from 'next/navigation';
import Button from '@/componentes/Button';
import Header from '@/componentes/Header';
import Image from 'next/image';
import { useCollaborator } from '@/context/CollaboratorContext';
import Spinner from '@/componentes/Spinner';
import EmptyState from '@/componentes/EmptyState';
import { useEffect } from 'react';
import { formatTelefone } from '../../../../../utils/formatPhone';

export default function Collaborators() {
  const router = useRouter();
  const { collaborators, loading, setLoading, fetchCollaborators } = useCollaborator();

   useEffect(() => {
      const fetchData = async () => {
        setLoading(true);
        await fetchCollaborators();
        setLoading(false);
      };
      fetchData();
    }, []);
  

  if (loading) {
    return <Spinner message="Carregando colaboradores..." />;
  }

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="flex items-center gap-2">
        <Header />
      </div>

      {collaborators.length === 0 ? (
        <EmptyState
          title="Sem colaboradores cadastrados"
          subtitle="Cadastre um novo colaborador"
        />
      ) : (
        <div className="flex flex-col gap-4 p-4 flex-1 overflow-y-auto w-full max-w-xl mx-auto">
          {collaborators.map((colab) => (
            <div
            onClick={() => router.push(`/collaborator-profile/${colab.id}`)}

              key={colab.id}
              className="flex items-center gap-4 p-4 rounded-lg bg-white border border-gray-200 hover:shadow-md transition-shadow duration-200 cursor-pointer"
            >
              <div className="flex items-center justify-center w-14 h-14 border-1 border-[#DEDEDE] rounded-full">
                <Image
                  src="/user-default.svg"
                  alt="Foto"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
              </div>
              <div>
                <p className="text-base text-gray-700 font-semibold">{colab.nome}</p>
                <p className="text-base text-gray-600">{formatTelefone(colab.telefone)}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div
        className="mt-auto p-6 mb-20 w-full max-w-xl mx-auto"
        onClick={() => {
          router.push('/new-collaborator');
        }}
      >
        <Button full>Novo colaborador</Button>
      </div>
    </div>
  );
}

