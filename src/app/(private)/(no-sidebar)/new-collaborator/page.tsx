'use client';

import { useState } from 'react';
import { HiCamera, HiArrowLeft } from 'react-icons/hi';
import { useRouter } from 'next/navigation';
import Button from '@/componentes/Button';
import Input from '@/componentes/Input';
import { useCollaborators } from '@/context/CollaboratorContext';
import { v4 as uuidv4 } from 'uuid';

import type { TimeRange } from '@/types/collaborator';
import { Switch } from '@headlessui/react';

type BusinessHours = {
  [day: string]: {
    open: boolean;
    ranges: TimeRange[];
  };
};

export default function NewCollaborator() {
  const router = useRouter();
  const { addCollaborator } = useCollaborators();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  // Estados de endereço
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
  const [district, setDistrict] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');

  const daysOfWeek = [
    'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo',
  ];
  
  const initialHours = daysOfWeek.reduce((acc, day) => {
    acc[day] = { open: true, ranges: [{ start: '08:00', end: '18:00' }] };
    return acc;
  }, {} as BusinessHours);
  
  const [hours, setHours] = useState<BusinessHours>(initialHours);
  
  const handleToggle = (day: string) => {
    setHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        open: !prev[day].open,
      },
    }));
  };
  
  const handleTimeChange = (
    day: string,
    index: number,
    type: 'start' | 'end',
    value: string
  ) => {
    const updatedRanges = [...hours[day].ranges];
    updatedRanges[index][type] = value;
  
    setHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        ranges: updatedRanges,
      },
    }));
  };
  
  const handleSave = () => {
    if (!name || !email || !phone || !street || !number || !district || !city || !state) {
      alert('Preencha todos os campos.');
      return;
    }

    const newCollaborator = {
      id: uuidv4(),
      name,
      email,
      phone,
      address: {
        street,
        number,
        district,
        city,
        state,
      },
      schedule: hours,
    };
    
    console.log(JSON.stringify(newCollaborator, null, 2));
    
    addCollaborator(newCollaborator);

    router.push('/collaborators');
  };

  return (
    <div className="flex justify-center items-start min-h-screen bg-white">
      <div className="w-full max-w-2xl bg-white rounded-lg p-6 relative">
        <div className="flex justify-between items-center mb-8">
          <button onClick={() => router.back()} className="text-gray-600 hover:text-gray-800">
            <HiArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold mx-auto">Novo colaborador</h1>
        </div>
  
        <div className="flex justify-end mb-4">
          <button className="bg-purple-500 p-2 rounded-full text-white">
            <HiCamera size={20} />
          </button>
        </div>
  
        <section className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Informações pessoais</h2>
  
          <div className="mb-6">
            <Input placeholder="Nome" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
  
          <div className="mb-6">
          <div className="mb-6">
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <p className="text-sm text-gray-500 mt-1">Será usado para entrar no sistema</p>
          </div>

          </div>
  
          <div className="mb-6">
            <Input placeholder="Telefone" value={phone} onChange={(e) => setPhone(e.target.value)} />
          </div>
        </section>
  
        {/* Empurrando a seção Endereço para baixo */}
        <section className="mt-10 mb-6"> {/* Adicionando mt-8 */}
          <h2 className="text-lg font-semibold mb-2">Endereço</h2>
  
          <div className="mb-6">
            <Input placeholder="Logradouro" value={street} onChange={(e) => setStreet(e.target.value)} />
          </div>
  
          <div className="grid grid-cols-2 gap-2 mb-4">
            <Input placeholder="Número" value={number} onChange={(e) => setNumber(e.target.value)} />
            <Input placeholder="Bairro" value={district} onChange={(e) => setDistrict(e.target.value)} />
          </div>
  
          <div className="grid grid-cols-2 gap-2 mb-4">
            <Input placeholder="Cidade" value={city} onChange={(e) => setCity(e.target.value)} />
            <Input placeholder="Estado" value={state} onChange={(e) => setState(e.target.value)} />
          </div>
        </section>
        <section className="mt-8 mb-6">
          <h2 className="text-lg font-semibold mb-2">Horário de trabalho</h2>
          <div className="border border-[#DEDEDE] rounded-md p-4">
            {daysOfWeek.map((day) => (
              <div key={day} className="border-t border-gray-200 pt-4 mb-4">
                {hours[day].open ? (
                  hours[day].ranges.map((range, index) => (
                    <div key={index} className="flex items-center justify-between mb-2">
                      {index === 0 ? (
                        <div className="flex items-center gap-2 w-36">
                          {/* Switch e Nome do dia à esquerda */}
                          <Switch
                            checked={hours[day].open}
                            onChange={() => handleToggle(day)}
                            className={`${
                              hours[day].open ? 'bg-[#7567E4]' : 'bg-gray-300'
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
                          onChange={(e) =>
                            handleTimeChange(day, index, 'start', e.target.value)
                          }
                          className="border border-gray-300 rounded px-2 py-2 text-md w-24"
                        />
                        <span className="text-sm">às</span>
                        <input
                          type="time"
                          value={range.end}
                          onChange={(e) =>
                            handleTimeChange(day, index, 'end', e.target.value)
                          }
                          className="border border-gray-300 rounded px-2 py-2 text-md w-24"
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 w-36">
                      {/* Switch e Nome do dia à esquerda */}
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
        </section>

        <div className="flex justify-end gap-4">
          <button
            onClick={() => router.back()}
            className="text-gray-600 font-medium hover:underline"
          >
            Cancelar
          </button>

          <div onClick={handleSave}>
            <Button>Salvar</Button>
          </div>
        </div>
      </div>
    </div>
  );  
}
