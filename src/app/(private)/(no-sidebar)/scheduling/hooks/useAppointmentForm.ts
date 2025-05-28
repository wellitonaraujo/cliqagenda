"use client";

import { generateDurationOptions, Option } from '../../../../../../utils/durationOptions';
import { formatCurrency } from '../../../../../../utils/formatCurrency';
import { useHorarioMensagem } from '@/hooks/useHorarioMensagem';
import { useAvailableHours } from '@/hooks/useAvailableHours';
import { useService } from '@/context/ServiceContext';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SingleValue } from 'react-select';
import { toast } from 'react-toastify';
import api from '@/services/api';
import { AxiosError } from 'axios';

interface FormState {
  cliente: Option | null;
  colaborador: Option | null;
  servico: Option | null;
  data: string;
  hora: string;
  duracaoMin: Option | null;
  preco: string;
}

export function useAppointmentForm() {
  const router = useRouter();
  const { services } = useService();
  const durationOptions = generateDurationOptions();

  const [form, setForm] = useState<FormState>({
    cliente: null,
    colaborador: null,
    servico: null,
    data: '',
    hora: '',
    duracaoMin: null,
    preco: '',
  });

  const mensagem = useHorarioMensagem(form.data);
  const availableHours = useAvailableHours(form.data);

  const [clientes, setClientes] = useState<Option[]>([]);
  const [colaboradores, setColaboradores] = useState<Option[]>([]);
  const servicos = services.map((s) => ({ value: s.id, label: s.nome }));

  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const [resClientes, resColaboradores] = await Promise.all([
          api.get('/customers'),
          api.get('/collaborators'),
        ]);

        setClientes(resClientes.data.map((c: any) => ({ value: c.id, label: c.nome })));
        setColaboradores(resColaboradores.data.map((c: any) => ({ value: c.id, label: c.nome })));
      } catch {
        toast.error('Erro ao carregar dados');
      }
    }
    fetchData();
  }, []);

  const handleSelectChange = (field: keyof FormState) => (option: SingleValue<Option>) => {
    setForm((prev) => {
      if (field === 'servico' && option) {
        const selected = services.find((s) => s.id === option.value);
        const duracao = durationOptions.find((opt) => opt.value === selected?.duracaoMin) || null;
        return {
          ...prev,
          servico: option,
          preco: formatCurrency(selected?.preco ?? 0),
          duracaoMin: duracao,
        };
      }
      return { ...prev, [field]: option };
    });
  };

  const numericPrice = Number(form.preco.replace(/[^\d,.-]/g, '').replace(',', '.')) || 0;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'preco') {
      const onlyNumbers = value.replace(/[^\d,.-]/g, '');
      setForm((prev) => ({ ...prev, preco: onlyNumbers }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'preco') {
      const numeric = Number(value.replace(/[^\d,.-]/g, '').replace(',', '.')) || 0;
      const formatted = formatCurrency(numeric);
      setForm((prev) => ({ ...prev, preco: formatted }));
    }
  };

  const handleSelectHoraChange = (value: string) => {
    setForm((prev) => ({ ...prev, hora: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!form.data || !form.hora || !form.cliente || !form.colaborador || !form.servico) {
      toast.warning('Preencha todos os campos obrigatórios.');
      return;
    }

    try {
      await api.post('/appointments', {
        clienteId: form.cliente.value,
        colaboradorId: form.colaborador.value,
        servicoId: form.servico.value,
        data: form.data,
        hora: form.hora,
        duracaoMin: form.duracaoMin?.value,
        preco: numericPrice,
      });
      router.push('/home');
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      toast.error(error.response?.data?.message || 'Erro ao criar agendamento.');
    }
  };

  return {
    form,
    error,
    clientes,
    colaboradores,
    servicos,
    durationOptions,
    hourOptions: availableHours.map((h) => ({ label: h, value: h })),
    mensagem,
    handleInputChange,
    handleInputBlur,
    handleSelectChange,
    handleSelectHoraChange,
    handleSubmit
  };
}