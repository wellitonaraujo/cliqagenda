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
  inputErrors?: Record<DiaSemana, boolean>;
  onSave: () => void;
  loading: boolean;
  hasChanges: boolean;
}

export default function OpeningHours({
  horarios,
  onToggleDay,
  onTimeChange,
  inputErrors,
  onSave,
  loading,
  hasChanges
}: Props) {
  return (
    <div className="border border-[#DEDEDE] rounded-md p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-md font-medium">Horário de funcionamento</h2>
        {hasChanges && (
          <button
            onClick={onSave}
            disabled={loading}
            className="text-[#034D82] hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Salvando...' : 'Atualizar'}
          </button>
        )}
      </div>
      {horarios.map((h: Horario) => (
        <OpeningHourItem
          key={h.diaSemana}
          horario={h}
          onToggleDay={onToggleDay}
          onTimeChange={onTimeChange}
          hasError={inputErrors?.[h.diaSemana] || false}
        />
      ))}
    </div>
  );
}
