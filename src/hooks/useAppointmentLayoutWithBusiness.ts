import { useAppointmentsLayout } from '@/hooks/useAppointmentsLayout';
import { useBusiness } from '@/context/BusinessContext';

export function useAppointmentLayoutWithBusiness() {
  const { horarios } = useBusiness();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  function getDiaSemanaFromDate(date: Date) {
    const map = [
      'DOMINGO',
      'SEGUNDA',
      'TERCA',
      'QUARTA',
      'QUINTA',
      'SEXTA',
      'SABADO',
    ];
    return map[date.getDay()];
  }

  const diaSemana = getDiaSemanaFromDate(today);

  const horarioDoDia = horarios?.find((h) => h.diaSemana === diaSemana);

  const horaAbertura = horarioDoDia?.horaAbertura ?? '08:00';

  return useAppointmentsLayout([horaAbertura]);
}
