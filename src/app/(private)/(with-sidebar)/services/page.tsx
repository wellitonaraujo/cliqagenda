'use client';

import Header from "@/componentes/Header";
import Button from "@/componentes/Button";

export default function Services() {
  // Verificar se há serviços cadastrados
  const hasServices = false;

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="flex items-center gap-2">
        <Header />
      </div>

      {!hasServices ? (
        // Quando não há serviços cadastrados
        <div className="flex flex-col justify-center items-center flex-1 text-center">
          <p className="text-lg font-semibold text-gray-700">Sem serviços cadastrados</p>
          <p className="mt-2 text-md text-gray-500">Cadastre um novo serviço</p>
        </div>
      ) : (
        // Aqui você pode renderizar os serviços, caso haja algum
        <div>
          {/* Renderizar serviços aqui */}
        </div>
      )}

      <div className="mt-auto p-20">
        <Button full>Novo serviço</Button>
      </div>
    </div>
  );
}
