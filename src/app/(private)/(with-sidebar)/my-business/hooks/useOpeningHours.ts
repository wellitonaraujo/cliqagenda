import { Horario, useBusiness } from '@/context/BusinessContext';
import { useAuth } from '@/context/AuthContext';
import { DiaSemana } from '@/types/DiaSemana';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const orderDiaSemana: DiaSemana[] = [
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

  useEffect(() => {
    if (user?.empresaId) {
      fetchSchedules(user.empresaId);
    }
  }, [user?.empresaId]);

  useEffect(() => {
    if (horarios) {
      const horariosOrdenados = [...horarios].sort(
        (a, b) =>
          orderDiaSemana.indexOf(a.diaSemana) - orderDiaSemana.indexOf(b.diaSemana)
      );
      setEditableHorarios(horariosOrdenados);
    }
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

    try {
      await updateSchedules(user.empresaId, { horarios: editableHorarios });
      toast.success('Horários atualizados com sucesso!');
    } catch {
      toast.error('Erro ao atualizar horários');
    }
  };

  return {
    editableHorarios,
    toggleDay,
    handleTimeChange,
    saveSchedules,
  };
}
