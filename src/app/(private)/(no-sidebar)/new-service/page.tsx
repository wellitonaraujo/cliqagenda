'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/componentes/Input';
import Button from '@/componentes/Button';
import { useServices } from '@/context/ServiceContext';
import { v4 as uuidv4 } from 'uuid';
import { HiArrowLeft } from 'react-icons/hi';
import { formatCurrency } from '../../../../../utils/formatCurrency';
import { generateDurations } from '../../../../../utils/generateDurations';

export default function NewService() {
  const router = useRouter();
  const { addService } = useServices();

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  
  const durations = generateDurations();

  const handleSave = () => {
    if (!name || !price || !duration) {
      alert('Preencha todos os campos');
      return;
    }
  
    addService({
      id: uuidv4(),
      name,
      price,
      duration,
    });
  
    router.push('/services');
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const numeric = rawValue.replace(/\D/g, '');
    setPrice(formatCurrency(numeric));
  };
       
  return (
    <div className="flex justify-center items-start min-h-screen bg-white">
      <div className="w-full max-w-2xl bg-white rounded-lg p-6 relative">
        <div className="flex justify-between items-center mb-8">
          <button onClick={() => router.back()} className="text-gray-600 hover:text-gray-800">
            <HiArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold mx-auto">Novo serviço</h1>
        </div>
  
        <div className="mb-4">
          <Input
            placeholder="Nome do serviço"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
  
        <div className="mb-4">
          <Input
            placeholder="Valor"
            value={price}
            onChange={handlePriceChange}
          />
        </div>

        <div className="mb-4">
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700"
          >
            <option value="">Selecione a duração</option>
            {durations.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
  
        <div className="flex justify-end gap-4 mt-auto mb-20">
          <button
            onClick={() => router.back()}
            className="text-purple-500 font-medium hover:underline"
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
