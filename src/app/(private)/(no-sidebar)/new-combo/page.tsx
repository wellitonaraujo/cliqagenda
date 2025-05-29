'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from "@/componentes/Button";
import Input from "@/componentes/Input";
import { useCombos } from '@/context/ComboContext';
import { v4 } from 'uuid';
import { HiArrowLeft } from 'react-icons/hi';
import { useCollaborator } from '@/context/CollaboratorContext';
import { useService } from '@/context/ServiceContext';

export default function NewCombo() {
  const { addCombo } = useCombos();
  const { services: availableServices } = useService();
  const { collaborators } = useCollaborator();
  const router = useRouter();

  const [name, setName] = useState('');
  const [services, setServices] = useState<{ id: string; name: string }[]>([]);
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [professionals, setProfessionals] = useState<string[]>([]);

  const handleSave = () => {
    if (!name || !price || !duration) {
      alert('Preencha todos os campos obrigatórios!');
      return;
    }

    const newCombo = {
      id: v4(),
      name,
      services,
      price,
      duration,
      professionals,
    };

    addCombo(newCombo);
    router.push('/combos');
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-white">
      <div className="w-full max-w-2xl bg-white rounded-lg p-6 relative">
        <div className="flex justify-between items-center mb-8">
          <button onClick={() => router.back()} className="text-gray-600 hover:text-gray-800">
            <HiArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold mx-auto">Novo Combo</h1>
        </div>

        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Informações do Combo</h2>

          <div className="mb-6">
            <Input
              placeholder="Nome do Combo"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Select de Serviços */}
          <div className="mb-6">
            <label htmlFor="services" className="block text-md font-medium text-gray-700 mb-2">
              Serviços
            </label>
            <select
              id="services"
              multiple
              value={services.map(service => service.id)}
              onChange={(e) => {
                const selectedServices = Array.from(e.target.selectedOptions).map(option => {
                  return {
                    id: option.value,
                    name: option.label,
                  };
                });
                setServices(selectedServices);
              }}
              className="w-full p-3 border border-gray-300 rounded-lg text-gray-700"
            >
              <option key="placeholder-service" value="" disabled>
                Selecione os serviços
              </option>
              {availableServices.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.nome}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-6 flex gap-4">
            <div className="w-1/2">
              <Input
                placeholder="Preço"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="w-1/2">
              <Input
                placeholder="Duração"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
          </div>

          {/* Select de Profissionais */}
          <div className="mb-2">
            <label htmlFor="professionals" className="block text-md font-medium text-gray-700 mb-2">
              Profissionais
            </label>
            <select
              id="professionals"
              multiple
              value={professionals}
              onChange={(e) => {
                const selectedProfessionals = Array.from(e.target.selectedOptions).map(option => option.value);
                setProfessionals(selectedProfessionals);
              }}
              className="w-full p-3 border border-gray-300 rounded-lg text-gray-700"
            >
              <option key="placeholder-prof" value="" disabled>
                Selecione os profissionais
              </option>
              {collaborators.map((colab) => (
                <option key={colab.id} value={colab.id}>
                  {colab.nome}
                </option>
              ))}
            </select>
          </div>
          <p className="text-sm text-gray-500 mb-6">Profissionais que realizam esse combo</p>
        </section>

        {/* Ações */}
        <div className="flex justify-end gap-4">
          <button
            onClick={() => router.push('/combos')}
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
