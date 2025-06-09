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
        horaFechamento: '0:00',
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

  const saveSchedules = async () => {
    if (!user?.empresaId) return;

    setLoading(true);
    try {
      const horariosOrdenados = editableHorarios
        .map(h => ({
          ...h,
          horaAbertura: h.aberto ? h.horaAbertura || '08:00' : '',
          horaFechamento: h.aberto ? h.horaFechamento || '18:00' : '',
        }))
        .sort((a, b) => allDays.indexOf(a.diaSemana) - allDays.indexOf(b.diaSemana));

      await updateSchedules(user.empresaId, { horarios: horariosOrdenados });
      toast.success('Horários atualizados com sucesso!');
    } catch (e) {
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
  };
}
