'use client'; 

import HeaderWithBackButton from '@/componentes/HeaderWithBackButton';
import { useNewCollaborator } from './hooks/useNewCollaborator';
import PersonalInfoSection from './ui/PersonalInfoSection';
import HorarioItem from '@/componentes/ScheduleItem';
import AddressSection from './ui/AddressSection';
import { useRouter } from 'next/navigation';
import Button from '@/componentes/Button';
import Skeleton from './ui/Skeleton';
import React from 'react';

export default function NewCollaborator() {
  const router = useRouter();

  const {
    nome, email, telefone, rua, numero, bairro, cidade, horarios,
    setNome, setEmail, setTelefone, setRua, setNumero, setBairro, setCidade,
    handleHorarioChange, handleSubmit, loading, diaSemanaMap,
  } = useNewCollaborator();

  return (
     <div className="flex justify-center items-start min-h-screen bg-white py-10">
      <div className="w-full max-w-2xl px-6 py-8 bg-white rounded-xl shadow-md border border-gray-200">
       <HeaderWithBackButton title="Novo colaborador" />  
        <form onSubmit={handleSubmit}>
         <PersonalInfoSection
            nome={nome}
            email={email}
            telefone={telefone}
            setNome={setNome}
            setEmail={setEmail}
            setTelefone={setTelefone}
          />
         <AddressSection
            rua={rua}
            numero={numero}
            bairro={bairro}
            cidade={cidade}
            setRua={setRua}
            setNumero={setNumero}
            setBairro={setBairro}
            setCidade={setCidade}
          />

        <h2 className="text-sd font-semibold mb-6 text-[#252525]">Horário</h2>
         {loading ? (
            Array.from({ length: 5 }).map((_, idx) => (
              <div key={idx} className="border-t border-gray-200 pt-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 w-40">
                    <Skeleton className="h-6 w-11" />
                    <Skeleton className="h-5 w-20" />
                  </div>
                  <div className="flex items-center gap-2 justify-end w-full">
                    <Skeleton className="h-10 w-24" />
                    <span className="text-sm">às</span>
                    <Skeleton className="h-10 w-24" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            horarios.map((h, idx) => (
            <HorarioItem
              key={idx}
              diaSemana={diaSemanaMap[h.diaSemana as keyof typeof diaSemanaMap]}
              ativo={h.ativo}
              horaInicio={h.horaInicio}
              horaFim={h.horaFim}
              onChange={(field, value) => handleHorarioChange(idx, field, value)}
            />
           ))
          )}
          <div className="flex justify-end gap-4 mt-10">
            <button
              type="button"
              onClick={() => router.back()}
              className="text-gray-700 text-sm font-medium hover:underline"
            >
              Cancelar
            </button>

            <Button
              type="submit"
              disabled={loading}
            >
              {loading ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
