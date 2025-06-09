import { useMemo } from 'react';
import { format, getDay } from 'date-fns';
import { useBusiness } from '../context/BusinessContext';
import { DiaSemana } from '@/types/DiaSemana';

export function useAvailableHours(selectedDate: string) {
  const { horarios } = useBusiness();

  const options = useMemo(() => {
    if (!horarios || !selectedDate) return [];

    const date = new Date(selectedDate);
    const diaSemana = getDay(date);

    const diaSemanaEnum = Object.values(DiaSemana)[diaSemana];
    const diaHorario = horarios.find((h) => h.diaSemana === diaSemanaEnum);

    if (!diaHorario?.aberto || !diaHorario.horaAbertura || !diaHorario.horaFechamento) {
      return [];
    }

    const [startHour, startMin] = diaHorario.horaAbertura.split(':').map(Number);
    const [endHour, endMin] = diaHorario.horaFechamento.split(':').map(Number);

    const start = new Date();
    start.setHours(startHour, startMin, 0, 0);

    const end = new Date();
    end.setHours(endHour, endMin, 0, 0);

    const result = [];
    const current = new Date(start);

    while (current <= end) {
      result.push(format(current, 'HH:mm'));
      current.setMinutes(current.getMinutes() + 15);
    }

    return result;
  }, [horarios, selectedDate]);

  return options;
}
