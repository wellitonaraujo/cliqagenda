'use client';

import Button from "@/componentes/Button";
import Header from "@/componentes/Header";
import { useRouter } from "next/navigation";

export default function Collaborators() {
    // Verificar se há colaboradores cadastrados
    const hasCollaborators = false;
    const router = useRouter();

  return (
      <div className="flex flex-col h-screen bg-white">
          <div className="flex items-center gap-2">
            <Header />
          </div>
    
          {!hasCollaborators ? (
            // Quando não há serviços cadastrados
            <div className="flex flex-col justify-center items-center flex-1 text-center">
              <p className="text-lg font-semibold text-gray-700">Sem colaboradores cadastrado</p>
              <p className="mt-2 text-md text-gray-500">Cadastre um novo colaborador</p>
            </div>
          ) : (
            // Aqui você pode renderizar os colaboradores, caso haja algum
            <div>
              {/* Renderizar colaboradores aqui */}
            </div>
          )}
    
          <div className="mt-auto p-20" onClick={() => router.push('/new-collaborator')}>
            <Button full >Novo colaborador</Button>
          </div>
        </div>
  );
}
