import { useBusiness } from '@/context/BusinessContext';
import { DiaSemana } from '@/types/DiaSemana';
import { useMemo } from 'react';

function getDiaSemanaAtual(): DiaSemana {
  const dias: DiaSemana[] = [
    DiaSemana.DOMINGO,
    DiaSemana.SEGUNDA,
    DiaSemana.TERCA,
    DiaSemana.QUARTA,
    DiaSemana.QUINTA,
    DiaSemana.SEXTA,
    DiaSemana.SABADO,
  ];
  const hoje = new Date().getDay();
  return dias[hoje];
}

export function useHorarioDoDia() {
  const { horarios } = useBusiness();
  const diaAtual = getDiaSemanaAtual();

  const horarioDoDia = useMemo(() => {
    if (!horarios) return null;

    const horario = horarios.find((h) => h.diaSemana === diaAtual);

    return {
      aberto: horario?.aberto ?? false,
      horaAbertura: horario?.horaAbertura ?? '08:00',
      horaFechamento: horario?.horaFechamento ?? '18:00',
    };
  }, [horarios, diaAtual]);

  return horarioDoDia;
}
