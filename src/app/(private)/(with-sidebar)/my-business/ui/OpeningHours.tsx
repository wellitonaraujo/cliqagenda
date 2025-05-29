'use client';

import { Horario } from '@/context/BusinessContext';
import OpeningHourItem from './OpeningHourItem';
import { DiaSemana } from '@/types/DiaSemana';

interface Props {
  horarios: Horario[];
  onToggleDay: (diaSemana: DiaSemana) => void;
  onTimeChange: (
    diaSemana: DiaSemana,
    field: 'horaAbertura' | 'horaFechamento',
    value: string
  ) => void;
}

export default function OpeningHours({ horarios, onToggleDay, onTimeChange }: Props) {
  return (
    <div className="border border-[#DEDEDE] rounded-md p-4">
      <h2 className="text-md font-medium mb-4">Horário de funcionamento</h2>
      {horarios.map((h) => (
        <OpeningHourItem
          key={h.diaSemana}
          horario={h}
          onToggleDay={onToggleDay}
          onTimeChange={onTimeChange}
        />
      ))}
    </div>
  );
}
