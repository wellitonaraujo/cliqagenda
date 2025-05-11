'use client';

import { useState } from 'react';
import { HiCamera, HiArrowLeft } from 'react-icons/hi';
import { useRouter } from 'next/navigation';
import Button from '@/componentes/Button';
import Input from '@/componentes/Input';
import { useCollaborators } from '@/context/CollaboratorContext';
import { v4 as uuidv4 } from 'uuid';

export default function NewCollaborator() {
  const router = useRouter();
  const { addCollaborator } = useCollaborators();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Estados de endereço
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  const handleSave = () => {
    if (!name || !email || !phone || !street || !number || !district || !city || !state) {
      alert('Preencha todos os campos.');
      return;
    }

    addCollaborator({
      id: uuidv4(),
      name,
      email,
      phone,
      address: {
        street,
        number,
        district,
        city,
        state,
      },
    });

    router.push('/collaborators');
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-white">
      <div className="w-full max-w-2xl bg-white rounded-lg p-6 relative">
        <div className="flex justify-between items-center mb-8">
          <button onClick={() => router.back()} className="text-gray-600 hover:text-gray-800">
            <HiArrowLeft size={24} />
          </button>
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
            <Input placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
  
          <div className="mb-6">
          <div className="mb-6">
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="text-sm text-gray-500 mt-1">Será usado para entrar no sistema</p>
          </div>

          </div>
  
          <div className="mb-6">
            <Input placeholder="Telefone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
        </section>
  
        {/* Empurrando a seção Endereço para baixo */}
        <section className="mt-28 mb-6"> {/* Adicionando mt-8 */}
          <h2 className="text-lg font-semibold mb-2">Endereço</h2>
  
          <div className="mb-6">
            <Input placeholder="Logradouro" value={street} onChange={(e) => setStreet(e.target.value)} />
          </div>
  
          <div className="grid grid-cols-2 gap-2 mb-4">
            <Input placeholder="Número" value={number} onChange={(e) => setNumber(e.target.value)} />
            <Input placeholder="Bairro" value={district} onChange={(e) => setDistrict(e.target.value)} />
          </div>
  
          <div className="grid grid-cols-2 gap-2 mb-4">
            <Input placeholder="Cidade" value={city} onChange={(e) => setCity(e.target.value)} />
            <Input placeholder="Estado" value={state} onChange={(e) => setState(e.target.value)} />
          </div>
        </section>
  
        <div className="flex justify-end gap-4">
          <button
            onClick={() => router.back()}
            className="text-gray-600 font-medium hover:underline"
          >
            Cancelar
          </button>

          <div onClick={handleSave}>
            <Button>Salvar</Button>
          </div>
        </div>
      </div>
    </div>
  );  
}
