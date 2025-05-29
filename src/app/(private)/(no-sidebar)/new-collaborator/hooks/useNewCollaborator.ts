
import { useCollaboratorStore } from '@/app/store/useCollaboratorStore';
import { useBusiness } from '@/context/BusinessContext';
import { DiaSemana, Horario } from '@/types/DiaSemana';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const diaSemanaMap: Record<DiaSemana, string> = {
  SEGUNDA: 'Segunda-feira',
  TERCA: 'Terça-feira',
  QUARTA: 'Quarta-feira',
  QUINTA: 'Quinta-feira',
  SEXTA: 'Sexta-feira',
  SABADO: 'Sábado',
  DOMINGO: 'Domingo',
};

export function useNewCollaborator() {
  const { createCollaborator, loading } = useCollaboratorStore();
  const { horarios: empresaHorarios } = useBusiness();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [error, setError] = useState('');
  const [horarios, setHorarios] = useState<Horario[]>([]);
  const [localLoading, setLocalLoading] = useState(false);

  useEffect(() => {
    if (empresaHorarios) {
      const converted = empresaHorarios.map(h => ({
        diaSemana: h.diaSemana,
        horaInicio: h.horaAbertura || '',
        horaFim: h.horaFechamento || '',
        ativo: h.aberto,
      }));
      setHorarios(converted);
    }
  }, [empresaHorarios]);

  function handleHorarioChange(index: number, field: keyof Horario, value: any) {
    const newHorarios = [...horarios];
    newHorarios[index] = { ...newHorarios[index], [field]: value };
    setHorarios(newHorarios);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLocalLoading(true);

    if (!nome || !email || !telefone || !rua || !numero || !bairro || !cidade) {
      toast.warning('Preencha todos os campos obrigatórios');
      setLocalLoading(false);
      return;
    }

    if (horarios.length === 0) {
      toast.warning('Adicione pelo menos um horário');
      setLocalLoading(false);
      return;
    }

    for (const h of horarios) {
      if (!h.horaInicio || !h.horaFim) {
        toast.warning('Preencha os horários corretamente');
        setLocalLoading(false);
        return;
      }
    }

    try {
      await createCollaborator({
        nome,
        email,
        telefone,
        rua,
        numero,
        bairro,
        cidade,
        horarios,
      });

      toast.success('Colaborador criado com sucesso!');
      resetForm();
    } catch (err: any) {
      setError(err?.message || 'Erro ao criar colaborador');
    } finally {
      setLocalLoading(false);
    }
  }

  function loadHorariosFromEmpresa() {
    if (!empresaHorarios) return [];
    return empresaHorarios.map(h => ({
      diaSemana: h.diaSemana,
      horaInicio: h.horaAbertura || '',
      horaFim: h.horaFechamento || '',
      ativo: h.aberto,
    }));
  }

  useEffect(() => {
    setHorarios(loadHorariosFromEmpresa());
  }, [empresaHorarios]);

  function resetForm() {
    setNome('');
    setEmail('');
    setTelefone('');
    setRua('');
    setNumero('');
    setBairro('');
    setCidade('');
    setHorarios(loadHorariosFromEmpresa());
  }

  return {
    nome,
    email,
    telefone,
    rua,
    numero,
    bairro,
    cidade,
    horarios,
    loading: localLoading || loading,
    error,
    diaSemanaMap,
    setNome,
    setEmail,
    setTelefone,
    setRua,
    setNumero,
    setBairro,
    setCidade,
    handleHorarioChange,
    handleSubmit,
  };
}
