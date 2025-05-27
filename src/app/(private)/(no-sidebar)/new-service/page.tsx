'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Select, { MultiValue } from 'react-select';
import { HiArrowLeft } from 'react-icons/hi';

import { useService } from '@/context/ServiceContext';
import Input from '@/componentes/Input';
import Button from '@/componentes/Button';
import { useCollaborators } from './hooks/useCollaborators';
import { generateDurationOptions, Option } from '../../../../../utils/durationOptions';

export default function NewService() {
  const router = useRouter();
  const { createService } = useService();

  const { colaboradores, loading: loadingColabs, error: errorColabs } = useCollaborators();

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [duracaoMin, setDuracaoMin] = useState(60);
  const [preco, setPreco] = useState(0);
  const [colaboradoresIds, setColaboradoresIds] = useState<number[]>([]);

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState('');

  const durationOptions = generateDurationOptions();

  const collaboratorOptions: Option[] = colaboradores.map(c => ({
    value: c.id,
    label: c.nome,
  }));

  function handleDurationChange(selectedOption: Option | null) {
    setDuracaoMin(selectedOption ? Number(selectedOption.value) : 0);
  }

  function handleCollaboratorChange(selectedOptions: MultiValue<Option>) {
    setColaboradoresIds(selectedOptions ? selectedOptions.map(o => Number(o.value)) : []);
  }

  function handlePriceChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = Number(e.target.value);
    if (value >= 0) setPreco(value);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccessMessage('');
    if (!nome.trim() || duracaoMin < 15 || preco < 0 || colaboradoresIds.length === 0) {
      setError('Preencha todos os campos obrigatórios corretamente.');
      return;
    }

    try {
      await createService({ nome, descricao, duracaoMin, preco, colaboradoresIds });
      setSuccessMessage('Serviço criado com sucesso!');
      setNome('');
      setDescricao('');
      setDuracaoMin(60);
      setPreco(0);
      setColaboradoresIds([]);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  return (
    <div className="flex justify-center items-start min-h-screen bg-white p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg p-6 shadow-md relative">
        <div className="flex justify-between items-center mb-8">
          <button onClick={() => router.back()} className="text-gray-600 hover:text-gray-800">
            <HiArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold mx-auto">Novo serviço</h1>
          <div style={{ width: 24 }} />
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label="Nome*"
            placeholder="Nome do serviço"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />

          <div>
            <label className="block text-gray-700 mb-1">Descrição</label>
            <textarea
              className="w-full border border-gray-300 rounded-md p-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={4}
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              placeholder="Descrição do serviço"
            />
          </div>

          <Select
            options={durationOptions}
            value={durationOptions.find(opt => opt.value === duracaoMin) || null}
            onChange={handleDurationChange}
            placeholder="Selecione a duração*"
            classNamePrefix="react-select"
            isClearable={false}
          />

          <Input
            label="Preço (R$)*"
            type="number"
            value={preco}
            onChange={handlePriceChange}
          />

          <div>
            <label className="block text-gray-700 mb-1">Colaboradores*</label>
            {loadingColabs ? (
              <p>Carregando colaboradores...</p>
            ) : errorColabs ? (
              <p className="text-red-600">{errorColabs}</p>
            ) : (
              <Select
                options={collaboratorOptions}
                value={collaboratorOptions.filter(opt => colaboradoresIds.includes(opt.value as number))}
                onChange={handleCollaboratorChange}
                placeholder="Selecione os colaboradores"
                isMulti
                closeMenuOnSelect={false}
              />
            )}
            <p className="text-sm text-gray-500 mt-1">Profissionais que realizam esse serviço</p>
          </div>

          {error && <p className="text-red-600">{error}</p>}
          {successMessage && <p className="text-green-600">{successMessage}</p>}

          <div className="flex justify-end gap-4 mt-6">
            <button
              type="button"
              onClick={() => router.back()}
              className="text-gray-700 font-medium hover:underline"
            >
              Cancelar
            </button>
            <Button type="submit">Criar Serviço</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
