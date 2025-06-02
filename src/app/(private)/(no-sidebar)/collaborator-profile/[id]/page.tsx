'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import HeaderWithBackButton from '@/componentes/HeaderWithBackButton';
import HorarioItem from '@/componentes/ScheduleItem';

import api from '@/services/api';
import { Collaborator, Horario } from '@/types/collaborator';
import Skeleton from '../../new-collaborator/ui/Skeleton';

const diaSemanaMap: Record<string, string> = {
  DOMINGO: 'Domingo',
  SEGUNDA: 'Segunda',
  TERCA: 'Terça',
  QUARTA: 'Quarta',
  QUINTA: 'Quinta',
  SEXTA: 'Sexta',
  SABADO: 'Sábado',
};

interface CollaboratorWithSchedule extends Collaborator {
  horarios: Horario[];
  fotoUrl?: string; // imagem futura
}

export default function CollaboratorProfile() {
  const { id } = useParams();
  const [collaborator, setCollaborator] = useState<CollaboratorWithSchedule | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollaborator = async () => {
      try {
        const response = await api.get(`/collaborators/${id}`);
        setCollaborator({
          ...response.data,
          horarios: response.data.horarios ?? [],
        });
      } catch (err) {
        console.error('Erro ao carregar colaborador', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCollaborator();
  }, [id]);

  return (
    <div className="flex justify-center items-start min-h-screen bg-white py-10">
      <div className="w-full max-w-2xl px-6 py-8 bg-white rounded-xl shadow-md border border-gray-200">
        <HeaderWithBackButton title="Perfil do Colaborador" />

        {loading ? (
          <div className="space-y-4 mt-6">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-2/3" />
            <Skeleton className="h-6 w-1/2" />
          </div>
        ) : collaborator ? (
          <div className="mt-6 space-y-10">
            {/* Imagem + Nome */}
            <section className="flex flex-col items-center text-center space-y-3">
              <img
                src={collaborator.fotoUrl || '/user-default.svg'}
                alt="Foto do colaborador"
                className="w-20 h-20 rounded-full object-cover border border-gray-300"
              />
              <h1 className="text-1xl font-bold text-gray-900">{collaborator.nome}</h1>
            </section>

            {/* Informações pessoais */}
            <section className="text-gray-700 space-y-1">
              <h2 className="text-base font-semibold text-gray-800 mb-2">Informações de Contato</h2>
              <p><span className="font-medium">Email:</span> {collaborator.email}</p>
              <p><span className="font-medium">Telefone:</span> {collaborator.telefone}</p>
              <p><span className="font-medium">Função:</span> {collaborator.role}</p>
            </section>

            <hr className="border-gray-200" />

            {/* Endereço */}
            <section className="text-gray-700 space-y-1">
              <h2 className="text-base font-semibold text-gray-800 mb-2">Endereço</h2>
              <p><span className="font-medium">Rua:</span> {collaborator.rua}, <span className="font-medium">Nº:</span> {collaborator.numero}</p>
              <p><span className="font-medium">Bairro:</span> {collaborator.bairro}</p>
              <p><span className="font-medium">Cidade:</span> {collaborator.cidade}</p>
            </section>

            <hr className="border-gray-200" />

            {/* Horários */}
            <section>
              <h2 className="text-base font-semibold text-gray-800 mb-3">Horários</h2>
              <div className="space-y-3">
                {collaborator.horarios.map((h, idx) => (
                  <HorarioItem
                    key={idx}
                    diaSemana={diaSemanaMap[h.diaSemana]}
                    ativo={h.ativo}
                    horaInicio={h.horaInicio}
                    horaFim={h.horaFim}
                    onChange={() => {}}
                  />
                ))}
              </div>
            </section>
          </div>
        ) : (
          <p className="text-red-500 mt-4">Colaborador não encontrado.</p>
        )}
      </div>
    </div>
  );
}
