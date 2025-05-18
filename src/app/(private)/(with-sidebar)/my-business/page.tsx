"use client";

import { FiEdit2, FiLink } from 'react-icons/fi';
import { Switch } from '@headlessui/react';
import Image from 'next/image';
import Header from '@/componentes/Header';
import { useHorarios } from '@/context/HoursProvider';

const daysOfWeek = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

type TimeRange = {
  start: string;
  end: string;
};

export default function MeuNegocioPage() {
  const { hours, setHours } = useHorarios();

  const handleToggle = (day: string) => {
    setHours((prev) => ({
      ...prev,
      [day]: { ...prev[day], open: !prev[day].open },
    }));
  };

  const handleTimeChange = (day: string, index: number, field: 'start' | 'end', value: string) => {
    const newRanges = [...hours[day].ranges];
    newRanges[index][field] = value;
    setHours((prev) => ({
      ...prev,
      [day]: { ...prev[day], ranges: newRanges },
    }));
  };

  const handleAddRange = (day: string) => {
    setHours((prev) => ({
      ...prev,
      [day]: { ...prev[day], ranges: [...prev[day].ranges, { start: '', end: '' }] },
    }));
  };

  const handleDeleteRange = (day: string, index: number) => {
    setHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        ranges: prev[day].ranges.filter((_, i) => i !== index),
      },
    }));
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="flex items-center gap-2">
        <Header />
      </div>
  
      {/* Card geral */}
      <div className="bg-white rounded-xl p-4 space-y-6 max-w-3xl mx-auto">
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
            <span className="text-xl font-medium">Minha Barbearia</span>
            <FiEdit2 className="text-sm text-gray-500 cursor-pointer" />
          </div>
        </div>

        {/* Agendamento online */}
        <div>
          <label className="text-md text-gray-700 font-medium">Agendamento online</label>
          <div className="mt-1 flex items-center justify-between border border-[#DEDEDE] px-3 py-2 rounded-md">
            <span className="text-sm text-[#00AEEF] font-medium">www.cliqagenda.com/minha-barbearia</span>
            <FiLink />
          </div>
        </div>
  
        {/* Endereço */}
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
  
        {/* Horário de funcionamento */}
        <div className="border border-[#DEDEDE] rounded-md p-4">
          <h2 className="text-md font-medium mb-4">Horário de funcionamento</h2>
  
          {daysOfWeek.map((day) => (
            <div key={day} className="border-t border-gray-200 pt-4 mb-4">
              {hours[day].open ? (
                hours[day].ranges.map((range, index) => (
                  <div key={index} className="flex items-center justify-between mb-2">
                    {/* Toggle e Nome do dia à esquerda */}
                    {index === 0 ? (
                      <div className="flex items-center gap-2 w-36">
                        <Switch
                          checked={hours[day].open}
                          onChange={() => handleToggle(day)}
                          className={`${
                            hours[day].open ? 'bg-[#00AEEF]' : 'bg-gray-300'
                          } relative inline-flex h-5 w-10 items-center rounded-full`}
                        >
                          <span
                            className={`${
                              hours[day].open ? 'translate-x-5' : 'translate-x-1'
                            } inline-block h-3.5 w-3.5 transform bg-white rounded-full transition-transform`}
                          />
                        </Switch>
                        <span className="text-sm">{day}</span>
                      </div>
                    ) : (
                      <div className="w-36" />
                    )}
  
                    {/* Horários à direita */}
                    <div className="flex items-center gap-2 justify-end w-full">
                      <input
                        type="time"
                        value={range.start}
                        onChange={(e) => handleTimeChange(day, index, 'start', e.target.value)}
                        className="border border-gray-300 rounded px-2 py-2 text-md w-24"
                      />
                      <span className="text-sm">às</span>
                      <input
                        type="time"
                        value={range.end}
                        onChange={(e) => handleTimeChange(day, index, 'end', e.target.value)}
                        className="border border-gray-300 rounded px-2 py-2 text-md w-24"
                      />
                    </div>
  
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 w-36">
                    <Switch
                      checked={hours[day].open}
                      onChange={() => handleToggle(day)}
                      className={`${
                        hours[day].open ? 'bg-purple-500' : 'bg-gray-300'
                      } relative inline-flex h-5 w-10 items-center rounded-full`}
                    >
                      <span
                        className={`${
                          hours[day].open ? 'translate-x-5' : 'translate-x-1'
                        } inline-block h-3.5 w-3.5 transform bg-white rounded-full transition-transform`}
                      />
                    </Switch>
                    <span className="text-sm">{day}</span>
                  </div>
                  <span className="text-sm text-gray-400">Fechado</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  
}
