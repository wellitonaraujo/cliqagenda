import { DiaSemana, useBusiness } from "@/context/BusinessContext";

export const useHorarioMensagem = (data?: string) => {
  const { horarios } = useBusiness();

  const getDiaSemana = (data: string): DiaSemana | null => {
    const date = new Date(data);
    const dias: DiaSemana[] = [
      DiaSemana.DOMINGO,
      DiaSemana.SEGUNDA,
      DiaSemana.TERCA,
      DiaSemana.QUARTA,
      DiaSemana.QUINTA,
      DiaSemana.SEXTA,
      DiaSemana.SABADO,
    ];
    return dias[date.getDay()] || null;
  };

  const isFechado = (data: string): boolean => {
    const diaSemana = getDiaSemana(data);
    const diaInfo = horarios?.find((h) => h.diaSemana === diaSemana);
    return diaInfo ? !diaInfo.aberto : false;
  };

  if (!data) return 'Selecione uma data';
  if (isFechado(data)) return 'Estabelecimento fechado nesse dia';
  return 'Nenhum horário disponível';
};
