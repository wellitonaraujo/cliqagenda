'use client';

import { AppointmentStatusButton } from "@/componentes/AppointmentStatusButton";
import { RemoveAppointmentButton } from "@/componentes/RemoveAppointmentButton";
import {
  FiCalendar,
  FiCheckCircle,
  FiHelpCircle,
  FiUserX,
  FiXCircle,
  FiX,
} from "react-icons/fi";

interface AppointmentModalProps {
  open: boolean;
  onClose: () => void;
  onRemove: () => void;
  onStatusChange: (status: string) => void;
}

export const AppointmentModal = ({
  open,
  onClose,
  onRemove,
  onStatusChange,
}: AppointmentModalProps) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-30 bg-black/5">
      <div className="relative bg-white w-80 p-5 rounded-xl shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
          aria-label="Fechar modal"
        >
          <FiX size={20} />
        </button>

        <h2 className="font-semibold text-lg text-center text-gray-800">Alterar Status</h2>

        <div className="mt-4 space-y-2">
          <AppointmentStatusButton
            icon={<FiCalendar className="text-gray-500" />}
            label="Agendado"
            onClick={() => onStatusChange("AGENDADO")}
          />
          <AppointmentStatusButton
            icon={<FiHelpCircle className="text-gray-500" />}
            label="Em atendimento"
            onClick={() => onStatusChange("EM_ATENDIMENTO")}
          />
          <AppointmentStatusButton
            icon={<FiCheckCircle className="text-gray-500" />}
            label="Concluído"
            onClick={() => onStatusChange("CONCLUIDO")}
          />
          <AppointmentStatusButton
            icon={<FiXCircle className="text-gray-500" />}
            label="Cancelado"
            onClick={() => onStatusChange("CANCELADO")}
          />
          <AppointmentStatusButton
            icon={<FiUserX className="text-gray-500" />}
            label="Cliente faltou"
            onClick={() => onStatusChange("CLIENTE_FALTOU")}
          />
          <RemoveAppointmentButton onClick={onRemove} />
        </div>
      </div>
    </div>
  );
};
