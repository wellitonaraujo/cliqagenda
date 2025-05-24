'use client'; 

import Input from '@/componentes/Input';
import { useCollaborator } from '@/context/CollaboratorContext';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { HiArrowLeft } from 'react-icons/hi';
import { Switch } from '@headlessui/react'
import { toast } from "react-toastify";

type DiaSemana = 'DOMINGO' | 'SEGUNDA' | 'TERCA' | 'QUARTA' | 'QUINTA' | 'SEXTA' | 'SABADO';

interface Horario {
  diaSemana: DiaSemana;
  horaInicio: string;
  horaFim: string;
  ativo: boolean;
}

export default function NewCollaborator() {
  const { createCollaborator, loading } = useCollaborator();
  const router = useRouter();


  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [horarios, setHorarios] = useState<Horario[]>([
    { diaSemana: 'SEGUNDA', horaInicio: '08:00', horaFim: '18:00', ativo: true },
    { diaSemana: 'TERCA', horaInicio: '08:00', horaFim: '18:00', ativo: true },
    { diaSemana: 'QUARTA', horaInicio: '08:00', horaFim: '18:00', ativo: true },
    { diaSemana: 'QUINTA', horaInicio: '08:00', horaFim: '18:00', ativo: true },
    { diaSemana: 'SEXTA', horaInicio: '08:00', horaFim: '18:00', ativo: true },
    { diaSemana: 'SABADO', horaInicio: '08:00', horaFim: '18:00', ativo: true },
    { diaSemana: 'DOMINGO', horaInicio: '00:00', horaFim: '00:00', ativo: false },
  ]);

  const diaSemanaMap: Record<string, string> = {
    DOMINGO: 'Domingo',
    SEGUNDA: 'Segunda-feira',
    TERCA: 'Terça-feira',
    QUARTA: 'Quarta-feira',
    QUINTA: 'Quinta-feira',
    SEXTA: 'Sexta-feira',
    SABADO: 'Sábado',
  };  
  
  const [error, setError] = useState('');

  function handleHorarioChange(index: number, field: keyof Horario, value: any) {
    const newHorarios = [...horarios];
    newHorarios[index] = {
      ...newHorarios[index],
      [field]: value,
    };
    setHorarios(newHorarios);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    // Validação básica
    if (!nome || !email || !telefone || !rua || !numero || !bairro || !cidade) {
      setError('Preencha todos os campos obrigatórios');
      return;
    }

    if (horarios.length === 0) {
      setError('Adicione pelo menos um horário');
      return;
    }

    for (const h of horarios) {
      if (!h.horaInicio || !h.horaFim) {
        setError('Preencha os horários corretamente');
        return;
      }
    }

    try {
      console.log(horarios)
      await createCollaborator({
        nome,
        email,
        telefone,
        rua,
        numero,
        bairro,
        cidade,
        horarios,
      });
      toast.success('Colaborador criado com sucesso!');
      setNome('');
      setEmail('');
      setTelefone('');
      setRua('');
      setNumero('');
      setBairro('');
      setCidade('');
      setHorarios([{ diaSemana: 'SEGUNDA', horaInicio: '', horaFim: '', ativo: true }]);
    } catch (err) {
      setError('Erro ao criar colaborador');
    }
  }

  return (
    <div className="flex justify-center items-start min-h-screen bg-white">
      <div className="w-full max-w-2xl bg-white rounded-lg p-6 relative">
        <div className="flex justify-between items-center mb-8">
          <button onClick={() => router.back()} className="text-gray-600 hover:text-gray-800">
            <HiArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-semibold mx-auto">Novo colaborador</h1>
        </div>
  
        {error && <p className="mb-4 text-red-600">{error}</p>}
  
        <form onSubmit={handleSubmit}>
          {/* Informações pessoais */}
          <section className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Informações pessoais</h2>
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
  
          {/* Endereço */}
          <section className="mt-10 mb-6">
            <h2 className="text-lg font-semibold mb-2">Endereço</h2>
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
  
          {/* Horário de trabalho */}

          <section className="mt-8 mb-6">
            <h2 className="text-lg font-semibold mb-2">Horário de trabalho</h2>
            <div className="">
              {horarios.map((h, idx) => (
                <div key={idx} className="border-t border-gray-200 pt-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 w-40"> {/* largura maior */}
                    <Switch
                      checked={h.ativo}
                      onChange={(val) => handleHorarioChange(idx, 'ativo', val)}
                      className={`${h.ativo ? 'bg-[#7567E4]' : 'bg-gray-300'}
                        relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
                    >
                      <span
                        className={`${h.ativo ? 'translate-x-6' : 'translate-x-1'}
                          inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                      />
                    </Switch>
                    <span className="text-base whitespace-nowrap"> {/* fonte maior e sem quebra */}
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
              ))}
            </div>
          </section>

          {/* Botão de envio */}
          <button
            type="submit"
            disabled={loading}
            className={`mt-6 w-full py-3 text-white font-semibold rounded ${
              loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {loading ? 'Salvando...' : 'Criar Colaborador'}
          </button>
        </form>
      </div>
    </div>
  );
  
}
