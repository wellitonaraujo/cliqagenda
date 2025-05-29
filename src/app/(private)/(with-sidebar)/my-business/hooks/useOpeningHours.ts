'use client';

import { Horario, useBusiness } from '@/context/BusinessContext';
import { useAuth } from '@/context/AuthContext';
import { DiaSemana } from '@/types/DiaSemana';
import { useEffect, useState } from 'react';

export function useOpeningHours() {
  const { user } = useAuth();
  const { horarios, fetchSchedules } = useBusiness();
  const [editableHorarios, setEditableHorarios] = useState<Horario[]>([]);

  useEffect(() => {
    if (user?.empresaId) {
      fetchSchedules(user.empresaId);
    }
  }, [user?.empresaId]);

  useEffect(() => {
    if (horarios) {
      setEditableHorarios(horarios);
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

  return {
    editableHorarios,
    toggleDay,
    handleTimeChange,
  };
}
