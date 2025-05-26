import { useAppointmentsLayout } from '@/hooks/useAppointmentsLayout';
import { useBusiness } from '@/context/BusinessContext';

export function useAppointmentLayoutWithBusiness() {
  const { horarios } = useBusiness();

  // Pega o horário de abertura do dia atual (ou de algum dia que você queira)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Função que mapeia dia da semana (igual à sua useScheduleLogic)
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

  // Encontra o horário do dia
  const horarioDoDia = horarios?.find((h) => h.diaSemana === diaSemana);

  // Hora abertura do contexto, ou '08:00' como fallback
  const horaAbertura = horarioDoDia?.horaAbertura ?? '08:00';

  // Usa o hook original, só que já com horaAbertura correta
  return useAppointmentsLayout([horaAbertura]);
}
