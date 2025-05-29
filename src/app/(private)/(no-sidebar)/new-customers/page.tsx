'use client';

import { useNewCustomer } from './hooks/useNewCustomer';
import { HiArrowLeft, HiCamera } from 'react-icons/hi';
import Button from '@/componentes/Button';
import Input from '@/componentes/Input';


export default function NewCustomer() {
  const { form, handleChange, handleSubmit, handleCancel } = useNewCustomer();

  return (
   <div className="flex items-center justify-center min-h-screen bg-white">
    <div className="w-full max-w-xl bg-white p-6 rounded border border-gray-100 shadow-xs">
        <div className="flex justify-between items-center mb-5">
          <button onClick={handleCancel} className="text-gray-600 hover:text-gray-800">
            <HiArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold mx-auto">Novo Cliente</h1>
        </div>

        <div className="flex justify-end mb-4">
          <button className="bg-[#00AEEF] p-2 rounded-full text-white">
            <HiCamera size={20} />
          </button>
        </div>

        <section className="mb-6">
          <h2 className="text-sd font-semibold mb-2 text-[#252525]">Informações pessoais</h2>

          <div className="mb-6">
            <Input
              placeholder="Nome"
              name="nome"
              value={form.nome}
              onChange={handleChange}
            />
          </div>

          <div className="mb-6">
            <Input
              placeholder="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-6">
            <Input
              placeholder="Telefone"
              name="telefone"
              value={form.telefone}
              onChange={handleChange}
            />
          </div>
        </section>

        <section className="mt-10 mb-6">
          <h2 className="text-sd font-semibold mb-2 text-[#252525]">Endereço</h2>

          <div className="mb-6">
            <Input
              placeholder="Logradouro"
              name="rua"
              value={form.rua}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-2 mb-4">
            <Input
              placeholder="Número"
              name="numero"
              value={form.numero}
              onChange={handleChange}
            />
            <Input
              placeholder="Bairro"
              name="bairro"
              value={form.bairro}
              onChange={handleChange}
            />
          </div>

          <div className="grid grid-cols-2 gap-2 mb-4">
            <Input
              placeholder="Cidade"
              name="cidade"
              value={form.cidade}
              onChange={handleChange}
            />
          </div>
        </section>

        <div className="flex justify-end gap-4">
          <button
            onClick={handleCancel}
            className="text-[#252525] font-medium hover:underline"
          >
            Cancelar
          </button>

          <div onClick={handleSubmit}>
            <Button>Salvar</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
