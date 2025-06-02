import { Switch } from '@headlessui/react';

interface HorarioItemProps {
  diaSemana: string;
  ativo: boolean;
  horaInicio: string;
  horaFim: string;
  onChange: (field: 'ativo' | 'horaInicio' | 'horaFim', value: boolean | string) => void;
}

export default function HorarioItem({
  diaSemana,
  ativo,
  horaInicio,
  horaFim,
  onChange,
}: HorarioItemProps) {
  return (
    <div className="border-t border-gray-200 pt-4 mb-4">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 w-40">
          <Switch
            checked={ativo}
            onChange={(val) => onChange('ativo', val)}
            className={`${
              ativo ? 'bg-[#1195FF]' : 'bg-gray-300'
            } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
          >
            <span
              className={`${
                ativo ? 'translate-x-6' : 'translate-x-1'
              } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
            />
          </Switch>
          <span className="text-sm whitespace-nowrap">{diaSemana}</span>
        </div>

        <div className="flex items-center gap-2 justify-end w-full">
          {ativo ? (
            <>
              <input
                type="time"
                value={horaInicio}
                onChange={(e) => onChange('horaInicio', e.target.value)}
                className="border border-gray-300 rounded px-1 py-1 text-md w-22"
                required
              />
              <span className="text-[14px]">às</span>
              <input
                type="time"
                value={horaFim}
                onChange={(e) => onChange('horaFim', e.target.value)}
                className="border border-gray-300 rounded px-1 py-1 text-md w-22"
                required
              />
            </>
          ) : (
            <>
              <div className="w-24 text-center text-gray-500 text-md">---</div>
              <div className="text-sm w-4 text-center" />
              <div className="w-24 text-center text-gray-500 text-md">---</div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
