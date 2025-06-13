"use client";

import { useAppointmentLayoutWithBusiness } from '@/hooks/useAppointmentLayoutWithBusiness';
import React, { Dispatch, SetStateAction } from 'react';
import { Appointment } from '@/types/Appointment';
import { FiMoreVertical } from 'react-icons/fi';

interface AppointmentItemProps {
  appointment: Appointment;
  expandedId: string | number | null;
  setExpandedId: Dispatch<SetStateAction<string | number | null>>;
  onOpenModal: (appointment: Appointment) => void;
}

const colorPatterns = [
  {
    cardBg: '#F4FCF5',
    borderColor: '#8833FF',
    horaBg: '#8833FF',
  },
  {
    cardBg: '#F9F5FF',
    borderColor: '#29CC39',
    horaBg: '#29CC39',
  },
  {
    cardBg: '#FEF5F8',
    borderColor: '#E62E2E',
    horaBg: '#E62E2E',
  },
  {
    cardBg: '#FFFCF5',
    borderColor: '#FFCB33',
    horaBg: '#FFCB33',
  },
  {
    cardBg: '#F5FCFF',
    borderColor: '#33BFFF',
    horaBg: '#33BFFF',
  },
   {
    cardBg: '#FEF5F8',
    borderColor: '#CC7429',
    horaBg: '#CC7429',
  },
];

export const AppointmentItem: React.FC<AppointmentItemProps> = ({
  appointment,
  expandedId,
  setExpandedId,
  onOpenModal,
}) => {
  const { getTopFromHora, getHeightFromDuracao } = useAppointmentLayoutWithBusiness();

  const top = getTopFromHora(appointment.hora);
  const height = getHeightFromDuracao(appointment.duracaoMin);

  const isShort = height <= 700;
  const isExpanded = expandedId === appointment.id;
  const displayHeight = isShort && isExpanded ? 100 : height;

  const patternIndex = appointment.colaborador?.id
    ? parseInt(appointment.colaborador.id.toString(), 10) % colorPatterns.length
    : 0;

  const { cardBg, borderColor, horaBg } = colorPatterns[patternIndex];

  return (
    <div
      key={appointment.id}
      className="absolute left-0 right-0 rounded-md overflow-hidden transition-all duration-300 cursor-pointer"
      style={{
        top,
        height: displayHeight,
        backgroundColor: cardBg,
        border: `2px solid ${borderColor}`,
        zIndex: isExpanded ? 30 : 10,
      }}
      onClick={() => {
        if (!isShort) return;
        setExpandedId((prev) => (prev === appointment.id ? null : appointment.id));
      }}
    >
      <div className="relative pl-2 pt-1 text-[#4D5E80] h-full flex flex-col">
        <div className="flex justify-between items-start">
          <p className="font-semibold text-sm">{appointment.cliente.nome}</p>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenModal(appointment);
            }}
            className="text-[#4D5E80] pr-1"
          >
            <FiMoreVertical size={18} />
          </button>
        </div>

        <div className="flex-grow flex items-center">
          <p className="text-sm font-bold text-[#4D5E80]">
            {appointment.servico.nome}
          </p>
        </div>

        {appointment.status && (
          <div>
            <p className="text-xs text-[#4D5E80] mb-1">{appointment.status}</p>
          </div>
        )}
        <div
          className="absolute bottom-1 right-1 rounded px-2 py-[2px] text-[12px] text-white font-semibold"
          style={{ backgroundColor: horaBg }}
        >
          {appointment.hora}
        </div>
      </div>
    </div>
  );
};
