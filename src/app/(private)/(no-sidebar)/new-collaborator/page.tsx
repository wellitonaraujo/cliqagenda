'use client';

import { useRouter } from 'next/navigation';
import { HiCamera, HiArrowLeft } from 'react-icons/hi';
import Button from '@/componentes/Button';

export default function NewCollaborator() {
  const router = useRouter();

  return (
    <div className="flex justify-center items-start min-h-screen bg-white">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6 relative">

        {/* Botão de Voltar */}
        <button
          onClick={() => router.back()}
          className="absolute top-4 left-4 text-gray-600 hover:text-gray-800"
        >
          <HiArrowLeft size={24} />
        </button>

        <h1 className="text-xl font-semibold mb-8 text-center">Novo colaborador</h1>

        <div className="flex justify-end mb-4">
          <button className="bg-purple-500 p-2 rounded-full text-white">
            <HiCamera size={20} />
          </button>
        </div>

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Informações pessoais</h2>
          <input className="w-full mb-2 p-3 border rounded" placeholder="Nome" />
          <input className="w-full mb-2 p-3 border rounded" placeholder="Como prefere ser chamado" />
          <input className="w-full mb-1 p-3 border rounded" placeholder="Email do colaborador" />
          <p className="text-sm text-gray-500 mb-2">Será usado para entrar no sistema</p>
          <input className="w-full mb-2 p-3 border rounded" placeholder="Telefone" />
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Endereço</h2>
          <input className="w-full mb-2 p-3 border rounded" placeholder="Logradouro" />
          <div className="grid grid-cols-2 gap-2 mb-2">
            <input className="p-3 border rounded" placeholder="Número" />
            <input className="p-3 border rounded" placeholder="Bairro" />
          </div>
          <div className="grid grid-cols-2 gap-2 mb-2">
            <input className="p-3 border rounded" placeholder="Cidade" />
            <input className="p-3 border rounded" placeholder="Estado" />
          </div>
        </section>

        <Button full>Salvar</Button>
      </div>
    </div>
  );
}
