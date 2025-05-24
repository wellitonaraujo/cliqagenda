'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Input from '@/componentes/Input';
import Button from '@/componentes/Button';
import { useServices } from '@/context/ServiceContext';
import { v4 as uuidv4 } from 'uuid';
import { HiArrowLeft } from 'react-icons/hi';
import { formatCurrency } from '../../../../../utils/formatCurrency';
import { generateDurations } from '../../../../../utils/generateDurations';
import Select from 'react-select';
import { customSelectStyles } from '../../../../../utils/customSelectStyles';
import { useCollaborator } from '@/context/CollaboratorContext';

export default function NewService() {
  const router = useRouter();
  const { collaborators } = useCollaborator();
  const { addService } = useServices();

  const [name, setName] = useState('');
  const [descricao, setDescricao] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [selectedCollaboratorIds, setSelectedCollaboratorIds] = useState<string[]>([]);

  const durations = generateDurations();

  const collaboratorOptions = collaborators.map((c) => ({
    value: c.id,
    label: c.nome,
  }));

  const durationOptions = durations.map((d) => ({
    value: d,
    label: d,
  }));

  const handleSave = () => {
    if (!name || !price || !duration || selectedCollaboratorIds.length === 0) {
      alert('Preencha todos os campos');
      return;
    }

    const newService = {
      id: uuidv4(),
      name,
      price,
      duration,
      collaboratorIds: selectedCollaboratorIds,
    };

    console.log('Serviço criado:', newService);

    addService(newService);
    router.push('/services');
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    const numeric = rawValue.replace(/\D/g, '');
    setPrice(formatCurrency(numeric));
  };

  const handleCollaboratorChange = (selectedOptions: any) => {
    if (!selectedOptions) return;
    
    // Quando 'isMulti' está ativo, selectedOptions será um array de objetos
    const selectedValues = selectedOptions.map((opt: any) => opt.value);
    console.log("Selected collaborators:", selectedValues); // Log para depurar

    setSelectedCollaboratorIds(selectedValues); // Atualiza o estado com os IDs selecionados
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
           type="text"
           placeholder="Descrição"
           value={descricao}
           onChange={(e) => setDescricao(e.target.value)}
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
          <Select
            options={durationOptions}
            value={durationOptions.find((opt) => opt.value === duration) || null}
            onChange={(selectedOption) => setDuration(selectedOption?.value ?? '')}
            placeholder="Selecione a duração"
            classNames={customSelectStyles.classNames}
          />
        </div>

        <div className="mb-6">
          <Select
            isMulti
            options={collaboratorOptions}
            value={collaboratorOptions.filter((opt) =>
              selectedCollaboratorIds.includes(opt.value)
            )}
            onChange={handleCollaboratorChange}
            placeholder="Selecione os colaboradores"
            classNames={customSelectStyles.classNames}
          />
          <p className="text-sm text-gray-500 mt-1">Profissionais que realizam esse serviço</p>
        </div>

        <div className="flex justify-end gap-4 mt-auto mb-20">
          <button
            onClick={() => router.back()}
            className="text-gray-700 font-medium hover:underline"
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
