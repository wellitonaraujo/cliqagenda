'use client';

import HeaderWithBackButton from '@/componentes/HeaderWithBackButton';
import { HiOutlineMail, HiOutlineClock} from 'react-icons/hi';
import { Collaborator, Horario } from '@/types/collaborator';
import Skeleton from '../../new-collaborator/ui/Skeleton';
import { TrashIcon } from '@heroicons/react/24/outline';
import { useParams, useRouter } from 'next/navigation';
import HorarioItem from '@/componentes/ScheduleItem';
import { useEffect, useState } from 'react';
import { FiMapPin } from 'react-icons/fi';
import api from '@/services/api';
import { toast } from 'react-toastify';

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
  fotoUrl?: string;
}

export default function CollaboratorProfile() {
  const { id } = useParams();
  const router = useRouter();

  const [collaborator, setCollaborator] = useState<CollaboratorWithSchedule | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fetchCollaborator = async () => {
      setLoading(true);
      try {
        const response = await api.get(`/collaborators/${id}`);
        setCollaborator({
          ...response.data,
          horarios: response.data.horariosDisponiveis ?? [],
        });
      } catch (err) {
        console.error('Erro ao carregar colaborador', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCollaborator();
}, [id]);


  const handleDelete = async () => {
    if (!id) return;
    try {
      setIsDeleting(true);
      await api.delete(`/collaborators/${id}`);
      router.back();
      window.location.href = '/collaborators';
      toast.success('Colaborador deletado com sucesso!');
    } catch (error) {
      toast.error('Erro ao deletar colaborador');
    } finally {
      setIsDeleting(false);
      setIsModalOpen(false);
    }
  };

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
        <section className="flex flex-col items-center text-center space-y-3 relative">
          <img
            src={collaborator.fotoUrl || '/user-default.svg'}
            alt="Foto do colaborador"
            className="w-20 h-20 rounded-full object-cover border border-gray-300"
          />

          <h1 className="text-xl font-bold text-gray-900">{collaborator.nome}</h1>

          {/* Exibir botão de deletar apenas se o colaborador NÃO for OWNER */}
          {collaborator.role !== 'OWNER' && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="text-red-500 hover:text-red-700 transition absolute top-0 right-0"
              title="Deletar colaborador"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
            )}
          </section>
          {/* Informações pessoais */}
          <section className="text-gray-700 space-y-1">
            <h2 className="text-base font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <HiOutlineMail className="w-5 h-5 text-gray-600" />
              Informações de Contato
            </h2>
            <p><span className="font-medium">Email:</span> {collaborator.email}</p>
            <p><span className="font-medium">Telefone:</span> {collaborator.telefone}</p>
            <p><span className="font-medium">Função:</span> {collaborator.role}</p>
          </section>

          <hr className="border-gray-200" />

          {/* Endereço */}
          <section className="text-gray-700 space-y-1">
            <h2 className="text-base font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <FiMapPin className="w-5 h-5 text-gray-600" />
              Endereço
            </h2>
            <p><span className="font-medium">Rua:</span> {collaborator.rua}, <span className="font-medium">Nº:</span> {collaborator.numero}</p>
            <p><span className="font-medium">Bairro:</span> {collaborator.bairro}</p>
            <p><span className="font-medium">Cidade:</span> {collaborator.cidade}</p>
          </section>

          <hr className="border-gray-200" />

          {/* Horários */}
          <section>
            <h2 className="text-base font-semibold text-gray-800 mb-3 flex items-center gap-2">
              <HiOutlineClock className="w-5 h-5 text-gray-600" />
              Horários
            </h2>
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

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Tem certeza?</h3>
            <p className="text-sm text-gray-600 mb-4">
              Essa ação não poderá ser desfeita. Ao deletar este colaborador, todos os agendamentos vinculados a ele também serão permanentemente removidos.
            </p>

            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-md bg-gray-100 text-gray-800 hover:bg-gray-200"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
              >
                {isDeleting ? 'Deletando...' : 'Deletar'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
