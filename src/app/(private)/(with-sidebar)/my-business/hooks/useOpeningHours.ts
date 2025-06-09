import { Horario, useBusiness } from '@/context/BusinessContext';
import { useAuth } from '@/context/AuthContext';
import { DiaSemana } from '@/types/DiaSemana';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const allDays: DiaSemana[] = [
  'SEGUNDA',
  'TERCA',
  'QUARTA',
  'QUINTA',
  'SEXTA',
  'SABADO',
  'DOMINGO',
];

export function useOpeningHours() {
  const { user } = useAuth();
  const { horarios, fetchSchedules, updateSchedules } = useBusiness();
  const [editableHorarios, setEditableHorarios] = useState<Horario[]>([]);
  const [inputErrors, setInputErrors] = useState<Record<DiaSemana, boolean>>({} as Record<DiaSemana, boolean>);
  const hasChanges = JSON.stringify(horarios) !== JSON.stringify(editableHorarios);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.empresaId) {
      fetchSchedules(user.empresaId);
    }
  }, [user?.empresaId]);

  useEffect(() => {
    if (!horarios) return;

    const merged = allDays.map((dia) => {
      const existente = horarios.find((h) => h.diaSemana === dia);
      return existente ?? {
        diaSemana: dia,
        aberto: false,
        horaAbertura: '00:00',
        horaFechamento: '00:00',
      };
    });

    setEditableHorarios(merged as Horario[]);
  }, [horarios]);

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

    const errors: Record<DiaSemana, boolean> = allDays.reduce((acc, dia) => {
      acc[dia] = false;
      return acc;
    }, {} as Record<DiaSemana, boolean>);

    for (const h of editableHorarios) {
      if (h.aberto) {
        const aberturaInvalida = !h.horaAbertura?.trim();
        const fechamentoInvalido = !h.horaFechamento?.trim();

        if (aberturaInvalida || fechamentoInvalido) {
          errors[h.diaSemana] = true;
        }
      }
    }

    const hasErrors = Object.values(errors).some((v) => v);
    if (hasErrors) {
      setInputErrors(errors);
      toast.error('Preencha os horários obrigatórios');
      return;
    }

    setInputErrors(getEmptyErrors());
    setLoading(true);

    try {
      const horariosOrdenados = editableHorarios
        .map(h => ({
          ...h,
          horaAbertura: h.aberto ? h.horaAbertura : '',
          horaFechamento: h.aberto ? h.horaFechamento : '',
        }))
        .sort((a, b) => allDays.indexOf(a.diaSemana) - allDays.indexOf(b.diaSemana));

      await updateSchedules(user.empresaId, { horarios: horariosOrdenados });
      toast.success('Horários atualizados com sucesso!');
    } catch {
      toast.error('Erro ao atualizar horários');
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
