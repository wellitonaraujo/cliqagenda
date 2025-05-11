'use client';

import { HiCamera, HiArrowLeft } from 'react-icons/hi';
import { useRouter } from 'next/navigation';
import Button from '@/componentes/Button';
import Input from '@/componentes/Input';

export default function NewCollaborator() {
  const router = useRouter();

  return (
    <div className="flex justify-center items-start min-h-screen bg-white">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6 relative">
        <div className="flex justify-between items-center mb-8">
          {/* Botão de Voltar */}
          <button
            onClick={() => router.back()}
            className="text-gray-600 hover:text-gray-800"
          >
            <HiArrowLeft size={24} />
          </button>

          {/* Título centralizado */}
          <h1 className="text-xl font-semibold mx-auto">Novo colaborador</h1>
        </div>

        <div className="flex justify-end mb-4">
          <button className="bg-purple-500 p-2 rounded-full text-white">
            <HiCamera size={20} />
          </button>
        </div>

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Informações pessoais</h2>
          <div className="mb-6">
          <Input placeholder="Nome" />
          </div>
          <div className="mb-6">
          <Input placeholder="Como prefere ser chamado" />
          </div>
          <div className="mb-2">
          <Input placeholder="Email do colaborador" />
          </div>
          <div className="mb-6">
          <p className="text-sm text-gray-500 mb-2">Será usado para entrar no sistema</p>
          </div>
          <div className="mb-6">
          <Input placeholder="Telefone" />
          </div>
         
        </section>

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Endereço</h2>
          
          <div className="mb-6">
            <Input placeholder="Logradouro" />
          </div>
        
          <div className="grid grid-cols-2 gap-2 mb-4">
            <Input placeholder="Número" />
            <Input placeholder="Bairro" />
          </div>
          <div className="grid grid-cols-2 gap-2 mb-4">
            <Input placeholder="Cidade" />
            <Input placeholder="Estado" />
          </div>
        </section>

        <Button full>Salvar</Button>
      </div>
    </div>
  );
}
