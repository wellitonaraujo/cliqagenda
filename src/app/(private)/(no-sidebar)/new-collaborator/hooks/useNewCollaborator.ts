import { useCollaboratorStore } from '@/app/store/useCollaboratorStore';
import { Horario as HorarioColaborador } from '@/types/collaborator';
import { useBusiness } from '@/context/BusinessContext';
import { DiaSemana } from '@/types/DiaSemana';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const orderDiaSemana: DiaSemana[] = [
  DiaSemana.SEGUNDA,
  DiaSemana.TERCA,
  DiaSemana.QUARTA,
  DiaSemana.QUINTA,
  DiaSemana.SEXTA,
  DiaSemana.SABADO,
  DiaSemana.DOMINGO,
];

const diaSemanaMap: Record<DiaSemana, string> = {
  [DiaSemana.SEGUNDA]: 'Segunda-feira',
  [DiaSemana.TERCA]: 'Terça-feira',
  [DiaSemana.QUARTA]: 'Quarta-feira',
  [DiaSemana.QUINTA]: 'Quinta-feira',
  [DiaSemana.SEXTA]: 'Sexta-feira',
  [DiaSemana.SABADO]: 'Sábado',
  [DiaSemana.DOMINGO]: 'Domingo',
};

function isDiaSemana(value: string): value is DiaSemana {
  return Object.values(DiaSemana).includes(value as DiaSemana);
}

export function useNewCollaborator() {
  const { createCollaborator, loading } = useCollaboratorStore();
  const { horarios: empresaHorarios } = useBusiness();
  const router = useRouter();

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [error, setError] = useState('');
  const [horarios, setHorarios] = useState<HorarioColaborador[]>([]);
  const [localLoading, setLocalLoading] = useState(false);

  function ordenarHorarios(horariosToSort: HorarioColaborador[]) {
    return [...horariosToSort].sort(
      (a, b) =>
        orderDiaSemana.indexOf(a.diaSemana as DiaSemana) -
        orderDiaSemana.indexOf(b.diaSemana as DiaSemana)
    );
  }

  function loadHorariosFromEmpresa() {
    if (!empresaHorarios) return [];
    const converted = empresaHorarios.map(h => ({
      diaSemana: String(h.diaSemana),
      horaInicio: h.horaAbertura || '',
      horaFim: h.horaFechamento || '',
      ativo: h.aberto,
    }));
    return ordenarHorarios(converted);
  }

  useEffect(() => {
    setHorarios(loadHorariosFromEmpresa());
  }, [empresaHorarios]);

  function handleHorarioChange<K extends keyof HorarioColaborador>(
    index: number,
    field: K,
    value: HorarioColaborador[K]
  ) {
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
        horarios: horarios.map(h => {
          if (!isDiaSemana(h.diaSemana)) {
            throw new Error(`Dia da semana inválido: ${h.diaSemana}`);
          }

          return {
            ...h,
            diaSemana: h.diaSemana as DiaSemana,
          };
        }),
      });

      toast.success('Colaborador criado com sucesso!');
      router.push('/collaborator');
      resetForm();
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Erro ao criar colaborador');
      }
    } finally {
      setLocalLoading(false);
    }
  }

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
