import { useBusiness } from '@/context/BusinessContext';
import { DiaSemana, Horario } from '@/types/DiaSemana';
import { useAuth } from '@/context/AuthContext';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

const allDays: DiaSemana[] = [
  DiaSemana.SEGUNDA,
  DiaSemana.TERCA,
  DiaSemana.QUARTA,
  DiaSemana.QUINTA,
  DiaSemana.SEXTA,
  DiaSemana.SABADO,
  DiaSemana.DOMINGO,
];

export function useOpeningHours() {
  const { user } = useAuth();
  const { horarios, updateSchedules, version } = useBusiness();
  const [editableHorarios, setEditableHorarios] = useState<Horario[]>([]);
  const [inputErrors, setInputErrors] = useState<Record<DiaSemana, boolean>>({} as Record<DiaSemana, boolean>);
  const [loading, setLoading] = useState(false);

  const hasChanges = !editableHorarios.every((editable) => {
  const original = horarios?.find(h => h.diaSemana === editable.diaSemana);
    return (
      editable.aberto === original?.aberto &&
      editable.horaAbertura === original?.horaAbertura &&
      editable.horaFechamento === original?.horaFechamento
    );
  });

  useEffect(() => {
    if (horarios) {
      const merged = allDays.map((dia) => {
        const existente = horarios.find((h) => h.diaSemana === dia);
        return existente ?? {
          diaSemana: dia,
          aberto: false,
          horaAbertura: '',
          horaFechamento: '',
        };
      });

    setEditableHorarios(merged);
    }
  }, [version]);

  const toggleDay = (diaSemana: DiaSemana) => {
    setEditableHorarios((prev) =>
      prev.map((h) =>
        h.diaSemana === diaSemana ? { ...h, aberto: !h.aberto } : h
      )
    );
  };

  const handleTimeChange = (
    diaSemana: DiaSemana,
    field: 'horaAbertura' | 'horaFechamento',
    value: string
  ) => {
    setEditableHorarios((prev) =>
      prev.map((h) =>
        h.diaSemana === diaSemana ? { ...h, [field]: value } : h
      )
    );
  };

  const getEmptyErrors = (): Record<DiaSemana, boolean> =>
    allDays.reduce((acc, dia) => {
      acc[dia] = false;
      return acc;
  }, {} as Record<DiaSemana, boolean>);

  const saveSchedules = async () => {
    if (!user?.empresaId) return;

    const errors: Record<DiaSemana, boolean> = getEmptyErrors();
    const hasErrors = Object.values(errors).some(Boolean);

    for (const h of editableHorarios) {
      if (h.aberto) {
        const aberturaInvalida = !h.horaAbertura?.trim();
        const fechamentoInvalido = !h.horaFechamento?.trim();
        if (aberturaInvalida || fechamentoInvalido) {
          errors[h.diaSemana] = true;
        }
      }
    }

    if (hasErrors) {
      setInputErrors(errors);
      toast.error('Preencha todos os horários obrigatórios');
      return;
    }

    setInputErrors(getEmptyErrors());
    setLoading(true);

    try {
      const horariosOrdenados: Horario[] = allDays.map((dia) => {
        const diaEditado = editableHorarios.find((h) => h.diaSemana === dia);
        return {
          diaSemana: dia,
          aberto: diaEditado?.aberto ?? false,
          horaAbertura: diaEditado?.aberto ? diaEditado.horaAbertura?.trim() ?? '' : '',
          horaFechamento: diaEditado?.aberto ? diaEditado.horaFechamento?.trim() ?? '' : '',
        };
      });

    await updateSchedules(user.empresaId, { horarios: horariosOrdenados });
      toast.success('Horários atualizados com sucesso!');
      } catch (err) {
        let msg = 'Erro desconhecido';

        if (axios.isAxiosError(err)) {
          msg = err.response?.data?.message ?? err.message;
        } else if (err instanceof Error) {
          msg = err.message;
        }

        toast.error(`Erro ao atualizar horários: ${msg}`);
      } finally {
        setLoading(false);
      }
    };

  return {
    editableHorarios,
    toggleDay,
    handleTimeChange,
    saveSchedules,
    loading,
    inputErrors,
    hasChanges
  };
}
