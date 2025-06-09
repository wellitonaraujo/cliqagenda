'use client';

import { Horario } from '@/context/BusinessContext';
import { DiaSemana } from '@/types/DiaSemana';
import { Switch } from '@headlessui/react';

interface Props {
  horario: Horario;
  onToggleDay: (diaSemana: DiaSemana) => void;
  onTimeChange: (
    diaSemana: DiaSemana,
    field: 'horaAbertura' | 'horaFechamento',
    value: string
  ) => void;
  hasError?: boolean;
}

const dayLabels: Record<DiaSemana, string> = {
  SEGUNDA: 'Segunda',
  TERCA: 'Terça',
  QUARTA: 'Quarta',
  QUINTA: 'Quinta',
  SEXTA: 'Sexta',
  SABADO: 'Sábado',
  DOMINGO: 'Domingo',
};

export default function OpeningHourItem({ horario, onToggleDay, onTimeChange, hasError }: Props) {
  return (
    <div className="border-t border-gray-200 pt-4 mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 w-36">
          <Switch
            checked={horario.aberto}
            onChange={() => onToggleDay(horario.diaSemana)}
            className={`${
              horario.aberto ? 'bg-[#1195FF]' : 'bg-gray-300'
            } relative inline-flex h-5 w-10 items-center rounded-full`}
          >
            <span
              className={`${
                horario.aberto ? 'translate-x-5' : 'translate-x-1'
              } inline-block h-3.5 w-3.5 transform bg-white rounded-full transition-transform`}
            />
          </Switch>
          <span className="text-sm">{dayLabels[horario.diaSemana]}</span>
        </div>

        {horario.aberto ? (
          <div className="flex items-center gap-2 justify-end w-full">
            <input
              type="time"
              value={horario.horaAbertura || ''}
              onChange={(e) =>
                onTimeChange(horario.diaSemana, 'horaAbertura', e.target.value)
              }
              className={`border rounded px-2 py-2 text-md w-24 ${
                hasError && !horario.horaAbertura ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            <span className="text-sm">às</span>
              <input
                type="time"
                value={horario.horaFechamento || ''}
                onChange={(e) =>
                  onTimeChange(horario.diaSemana, 'horaFechamento', e.target.value)
                }
                className={`border rounded px-2 py-2 text-md w-24 ${
                  hasError && !horario.horaFechamento ? 'border-red-500' : 'border-gray-300'
                }`}
              />
          </div>
        ) : (
          <span className="text-sm text-gray-400">Fechado</span>
        )}
      </div>
    </div>
  );
}
