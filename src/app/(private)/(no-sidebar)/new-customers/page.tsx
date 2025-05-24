'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HiArrowLeft, HiCamera } from 'react-icons/hi';
import Button from '@/componentes/Button';
import Input from '@/componentes/Input';
import { useCustomers } from '@/context/CustomersContext';

export default function NewCustomer() {
  const router = useRouter();
  const { createCustomer } = useCustomers();

  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    rua: '',
    numero: '',
    bairro: '',
    cidade: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    await createCustomer(form);
    router.push('/customers');
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-white">
      <div className="w-full max-w-2xl bg-white rounded-lg p-6 relative">
        <div className="flex justify-between items-center mb-8">
          <button onClick={() => router.back()} className="text-gray-600 hover:text-gray-800">
            <HiArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold mx-auto">Novo Cliente</h1>
        </div>

        <div className="flex justify-end mb-4">
          <button className="bg-purple-500 p-2 rounded-full text-white">
            <HiCamera size={20} />
          </button>
        </div>

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Informações pessoais</h2>

          <div className="mb-6">
            <Input
              placeholder="Nome"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-6">
            <Input
              placeholder="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              required
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

        <section className="mt-28 mb-6">
          <h2 className="text-lg font-semibold mb-2">Endereço</h2>

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
            onClick={() => router.back()}
            className="text-gray-600 font-medium hover:underline"
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
