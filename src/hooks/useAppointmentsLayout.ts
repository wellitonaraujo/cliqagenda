import { parseDurationToMinutes } from "@/app/(private)/(with-sidebar)/home/utils/date";

export function useAppointmentsLayout(timeSlots: string[]) {
  const horaAbertura = timeSlots[0]; // usa o primeiro slot como base

  function getTopFromHora(hora: string) {
    const [h, m] = hora.split(':').map(Number);
    const totalMinutes = h * 60 + m;

    const [startH, startM] = horaAbertura.split(':').map(Number);
    const startMinutes = startH * 60 + startM;

    const diff = totalMinutes - startMinutes;
    return (diff / 30) * 40;
  }

  function getHeightFromDuracao(duracaoMin: number) {
    const minutes = parseDurationToMinutes(duracaoMin);
    return (minutes / 30) * 40;
  }

  return {
    getTopFromHora,
    getHeightFromDuracao,
    horaAbertura,
  };
}
