'use client';

import { Horario, useBusiness } from '@/context/BusinessContext';
import { FiEdit2, FiLink } from 'react-icons/fi';
import { useAuth } from '@/context/AuthContext';
import { DiaSemana } from '@/types/DiaSemana';
import { useEffect, useState } from 'react';
import { Switch } from '@headlessui/react';
import Header from '@/componentes/Header';
import Image from 'next/image';

const dayLabels: Record<DiaSemana, string> = {
  SEGUNDA: 'Segunda',
  TERCA: 'Terça',
  QUARTA: 'Quarta',
  QUINTA: 'Quinta',
  SEXTA: 'Sexta',
  SABADO: 'Sábado',
  DOMINGO: 'Domingo',
};

export default function MeuNegocioPage() {
  const { user, empresa } = useAuth();
  const { horarios, updateSchedules, fetchSchedules } = useBusiness();
  const [editableHorarios, setEditableHorarios] = useState<Horario[]>([]);

  useEffect(() => {
    if (user?.empresaId) {
      fetchSchedules(user.empresaId);
      console.log(empresa?.nome)
    }
  }, [user?.empresaId]);

  useEffect(() => {
    if (horarios) {
      setEditableHorarios(horarios);
    }
  }, [horarios]);

  const toggleDay = (diaSemana: DiaSemana) => {
    setEditableHorarios((prev) =>
      prev.map((h) =>
        h.diaSemana === diaSemana ? { ...h, aberto: !h.aberto } : h
      )
    );
  };

  const handleTimeChange = (
    diaSemana: DiaSemana,
    field: 'horaAbertura' | 'horaFechamento',
    value: string
  ) => {
    setEditableHorarios((prev) =>
      prev.map((h) =>
        h.diaSemana === diaSemana ? { ...h, [field]: value } : h
      )
    );
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="flex items-center gap-2">
        <Header />
      </div>

      <div className="bg-white rounded-xl p-4 space-y-6 max-w-3xl mx-auto">
        {/* Perfil */}
        <div className="flex flex-col items-center gap-2">
          <div className="relative">
            <div className="w-25 h-25 rounded-full overflow-hidden border-3 border-[#00AEEF]">
              <Image
                src="/profile.png"
                alt="foto de perfil"
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
            <FiEdit2 className="absolute bottom-1 right-1 bg-white rounded-full p-1 text-xl border" />
          </div>
          <div className="flex items-center gap-2 m-5">
          <span>{empresa?.nome ?? 'Carregando empresa...'}</span>

            <FiEdit2 className="text-sm text-gray-500 cursor-pointer" />
          </div>
        </div>

        <div>
          <label className="text-md text-gray-700 font-medium">Agendamento online</label>
          <div className="mt-1 flex items-center justify-between border border-[#DEDEDE] px-3 py-2 rounded-md">
            <span className="text-sm text-[#00AEEF] font-medium">
             www.cliqagenda.com/{empresa?.nome}
            </span>
            <FiLink />
          </div>
        </div>

        <div>
          <label className="text-md text-gray-700 font-medium">Endereço</label>
          <div className="mt-1 border border-[#DEDEDE] rounded-md overflow-hidden">
            <div className="px-3 py-2 text-sm">
              Avenida Vai Quem Tem Vontade, 123, Velho Horizonte, Teresina - PI
            </div>
            <Image
              src="/location.svg"
              width={38}
              height={38}
              alt="mapa"
              className="w-full h-36 object-cover"
            />
          </div>
        </div>

        {/* Horários */}
        <div className="border border-[#DEDEDE] rounded-md p-4">
          <h2 className="text-md font-medium mb-4">Horário de funcionamento</h2>

          {editableHorarios.map((h) => (
            <div key={h.diaSemana} className="border-t border-gray-200 pt-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                {/* Toggle e Nome do dia */}
                <div className="flex items-center gap-2 w-36">
                  <Switch
                    checked={h.aberto}
                    onChange={() => toggleDay(h.diaSemana)}
                    className={`${
                      h.aberto ? 'bg-[#00AEEF]' : 'bg-gray-300'
                    } relative inline-flex h-5 w-10 items-center rounded-full`}
                  >
                    <span
                      className={`${
                        h.aberto ? 'translate-x-5' : 'translate-x-1'
                      } inline-block h-3.5 w-3.5 transform bg-white rounded-full transition-transform`}
                    />
                  </Switch>
                  <span className="text-sm">{dayLabels[h.diaSemana]}</span>
                </div>

                {/* Horários */}
                {h.aberto ? (
                  <div className="flex items-center gap-2 justify-end w-full">
                    <input
                      type="time"
                      value={h.horaAbertura || ''}
                      onChange={(e) => handleTimeChange(h.diaSemana, 'horaAbertura', e.target.value)}
                      className="border border-gray-300 rounded px-2 py-2 text-md w-24"
                    />
                    <span className="text-sm">às</span>
                    <input
                      type="time"
                      value={h.horaFechamento || ''}
                      onChange={(e) => handleTimeChange(h.diaSemana, 'horaFechamento', e.target.value)}
                      className="border border-gray-300 rounded px-2 py-2 text-md w-24"
                    />
                  </div>
                ) : (
                  <span className="text-sm text-gray-400">Fechado</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
