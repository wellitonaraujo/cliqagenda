'use client';

import { generateDurationOptions, Option } from '../../../../../../utils/durationOptions';
import { formatCurrency } from '../../../../../../utils/formatCurrency';
import { useCollaborators } from '../hooks/useCollaborators';
import { useService } from '@/context/ServiceContext';
import { useRouter } from 'next/navigation';
import { MultiValue } from 'react-select';
import { toast } from 'react-toastify';
import { useState } from 'react';

export function useNewServiceForm() {
  const router = useRouter();
  const { createService } = useService();
  const { colaboradores } = useCollaborators();

  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [duracaoMin, setDuracaoMin] = useState(15);
  const [preco, setPreco] = useState(formatCurrency(0));
  const [colaboradoresIds, setColaboradoresIds] = useState<number[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

    const precoNumber = parseCurrency(preco);

    if (!nome.trim() || duracaoMin < 15 || precoNumber < 0 || colaboradoresIds.length === 0) {
      toast.warning('Preencha todos os campos obrigatórios corretamente.');
      return;
    }

    try {
      setIsSubmitting(true);
      await createService({
        nome,
        descricao,
        duracaoMin,
        preco: precoNumber,
        colaboradoresIds,
      });

      toast.success('Serviço criado com sucesso!');
      setNome('');
      setDescricao('');
      setDuracaoMin(60);
      setPreco(formatCurrency(0));
      setColaboradoresIds([]);
    } catch {
      toast.error('Erro ao criar serviço');
    } finally {
      setIsSubmitting(false);
      router.push('/services');
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
    handleDurationChange,
    handleCollaboratorChange,
    handleSubmit,
    router,
    isSubmitting
  };
}
