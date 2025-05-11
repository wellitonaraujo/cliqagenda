'use client';

import { useCollaborators } from '@/context/CollaboratorContext';
import { useRouter } from 'next/navigation';
import Button from '@/componentes/Button';
import Header from '@/componentes/Header';
import Image from 'next/image';

export default function Collaborators() {
  const router = useRouter();
  const { collaborators } = useCollaborators();

  return (
    <div className="flex flex-col h-screen bg-white">
    <div className="flex items-center gap-2">
      <Header />
    </div>
    {collaborators && collaborators.length === 0 ? (
    <div className="flex flex-col justify-center items-center flex-1 text-center">
      <p className="text-lg font-semibold text-gray-700">Sem colaboradores cadastrado</p>
      <p className="mt-2 text-md text-gray-500">Cadastre um novo colaborador</p>
    </div>
    ) : (
      <div className="flex flex-col gap-4 p-4 flex-1 overflow-y-auto w-full max-w-xl mx-auto">
        {collaborators.map((colab, index) => (
          <div
            key={index}
            className="flex items-center gap-4 border p-4 rounded-lg shadow-sm border-gray-300"
          >
            <div className="flex items-center justify-center w-16 h-16 border-1 border-[#DEDEDE] rounded-full">
              <Image
                src="/user-default.svg"
                alt="Foto"
                width={38}
                height={38}
                className="rounded-full"
              />
            </div>
            <div>
              <p className="font-semibold text-md">
                {colab.name} ({colab.nickname})
              </p>
              <p className="text-sm text-gray-600">{colab.phone}</p>
            </div>
          </div>
        ))}
      </div>
    )}

      <div className="mt-auto p-6 mb-20 w-full max-w-xl mx-auto" onClick={() => {
        router.push('/new-collaborator');
        }}>
      <Button full>
        Novo colaborador
      </Button>
    </div>
  </div>
  );
}


