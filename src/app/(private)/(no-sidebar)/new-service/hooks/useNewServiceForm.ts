'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useService } from '@/context/ServiceContext';
import { useCollaborators } from '../hooks/useCollaborators';
import { formatCurrency } from '../../../../../../utils/formatCurrency';
import { generateDurationOptions, Option } from '../../../../../../utils/durationOptions';
import { MultiValue } from 'react-select';


export function useNewServiceForm() {
  const router = useRouter();
  const { createService } = useService();
  const { colaboradores, loading: loadingColabs, error: errorColabs } = useCollaborators();

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [duracaoMin, setDuracaoMin] = useState(15);
  const [preco, setPreco] = useState(formatCurrency(0));
  const [colaboradoresIds, setColaboradoresIds] = useState<number[]>([]);

  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState('');

  const collaboratorOptions: Option[] = colaboradores.map(c => ({
    value: c.id,
    label: c.nome,
  }));

  function parseCurrency(value: string): number {
    const numeric = value.replace(/\D/g, '');
    return Number(numeric);
  }

  const durationOptions = generateDurationOptions();

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const number = parseCurrency(e.target.value);
    setPreco(formatCurrency(number));
  };

  const handleDurationChange = (selected: Option | null) => {
    setDuracaoMin(selected ? Number(selected.value) : 0);
  };


  const handleCollaboratorChange = (selected: MultiValue<Option>) => {
    const values = selected.map(option => Number(option.value));
    setColaboradoresIds(values);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage('');

    const precoNumber = parseCurrency(preco);

    if (!nome.trim() || duracaoMin < 15 || precoNumber < 0 || colaboradoresIds.length === 0) {
      setError('Preencha todos os campos obrigatórios corretamente.');
      return;
    }

    try {
      await createService({
        nome,
        descricao,
        duracaoMin,
        preco: precoNumber,
        colaboradoresIds,
      });

      setSuccessMessage('Serviço criado com sucesso!');
      setNome('');
      setDescricao('');
      setDuracaoMin(60);
      setPreco(formatCurrency(0));
      setColaboradoresIds([]);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return {
    nome, setNome,
    descricao, setDescricao,
    duracaoMin,
    preco, handlePriceChange,
    colaboradoresIds,
    durationOptions,
    collaboratorOptions,
    loadingColabs,
    errorColabs,
    handleDurationChange,
    handleCollaboratorChange,
    handleSubmit,
    error,
    successMessage,
    router
  };
}
