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

return (
  <div
    key={appointment.id}
    className={`absolute left-0 right-0 rounded-md overflow-hidden bg-[#F7FDFF] border border-[#68d7ff] transition-all duration-300 cursor-pointer
      ${isExpanded ? 'z-30' : 'z-10'}`}
    style={{
      top,
      height: displayHeight,
      borderLeftColor: '#00AEEF',
    }}
    onClick={() => {
      if (!isShort) return;
      setExpandedId((prev) => (prev === appointment.id ? null : appointment.id));
    }}
  >
    <div className="pl-2 pt-1 text-[#5C5C5C] h-full flex flex-col">
      <div className="flex justify-between items-start">
        <p className="font-semibold text-[14px]">{appointment.cliente.nome}</p>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onOpenModal(appointment);
          }}
          className="text-[#b1b1b1] pr-1"
        >
          <FiMoreVertical size={18} />
        </button>
      </div>

      <div className="flex-grow flex items-center">
        <p className="text-[13px] text-gray-400">
          {appointment.servico.nome} às {appointment.hora}
        </p>
      </div>

      {appointment.status && (
        <div>
          <p className="text-xs text-[#00AEEF] mb-1">{appointment.status}</p>
        </div>
      )}
    </div>
  </div>
);

};
