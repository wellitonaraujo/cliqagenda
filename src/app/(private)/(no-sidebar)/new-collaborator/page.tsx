'use client'; 

import Input from '@/componentes/Input';
import React from 'react';
import { Switch } from '@headlessui/react'
import HeaderWithBackButton from '@/componentes/HeaderWithBackButton';
import { useNewCollaborator } from './hooks/useNewCollaborator';
import Skeleton from './ui/Skeleton';


export default function NewCollaborator() {
  const {
    nome, email, telefone, rua, numero, bairro, cidade, horarios,
    setNome, setEmail, setTelefone, setRua, setNumero, setBairro, setCidade,
    handleHorarioChange, handleSubmit, loading, error, diaSemanaMap,
  } = useNewCollaborator();

  return (
    <div className="flex justify-center items-start min-h-screen bg-white">
      <div className="w-full max-w-2xl bg-white rounded-lg p-6 relative">
       <HeaderWithBackButton title="Novo colaborador" />
  
        {error && <p className="mb-4 text-red-600">{error}</p>}
  
        <form onSubmit={handleSubmit}>
          <section className="mb-6">
            <h2 className="text-sd font-semibold mb-2 text-[#252525]">Informações pessoais</h2>
            <div className="mb-6">
              <Input placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
            </div>
            <div className="mb-6">
              <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <p className="text-sm text-gray-500 mt-1">Será usado para entrar no sistema</p>
            </div>
            <div className="mb-6">
              <Input placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
            </div>
          </section>
  
          <section className="mt-10 mb-6">
            <h2 className="text-sd font-semibold mb-2 text-[#252525]">Endereço</h2>
            <div className="mb-6">
              <Input placeholder="Rua" value={rua} onChange={(e) => setRua(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <Input placeholder="Número" value={numero} onChange={(e) => setNumero(e.target.value)} />
              <Input placeholder="Bairro" value={bairro} onChange={(e) => setBairro(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-2 mb-4">
              <Input placeholder="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} />
            </div>
          </section>
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
              <div key={idx} className="border-t border-gray-200 pt-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 w-40">
                    <Switch
                      checked={h.ativo}
                      onChange={(val) => handleHorarioChange(idx, 'ativo', val)}
                      className={`${h.ativo ? 'bg-[#00AEEF]' : 'bg-gray-300'}
                        relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
                    >
                      <span
                        className={`${h.ativo ? 'translate-x-6' : 'translate-x-1'}
                          inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                      />
                    </Switch>
                    <span className="text-base whitespace-nowrap">
                      {diaSemanaMap[h.diaSemana]}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 justify-end w-full">
                    <input
                      type="time"
                      value={h.horaInicio}
                      onChange={(e) => handleHorarioChange(idx, 'horaInicio', e.target.value)}
                      className="border border-gray-300 rounded px-2 py-2 text-md w-24"
                      required
                    />
                    <span className="text-sm">às</span>
                    <input
                      type="time"
                      value={h.horaFim}
                      onChange={(e) => handleHorarioChange(idx, 'horaFim', e.target.value)}
                      className="border border-gray-300 rounded px-2 py-2 text-md w-24"
                      required
                    />
                  </div>
                </div>
              </div>
            ))
          )}
          <button
            type="submit"
            disabled={loading}
            className={`mt-6 w-full py-3 text-white font-semibold rounded ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#00AEEF] hover:bg-[#00AEEF]'
            }`}
          >
            {loading ? 'Salvando...' : 'Criar Colaborador'}
          </button>
        </form>
      </div>
    </div>
  );
  
}
