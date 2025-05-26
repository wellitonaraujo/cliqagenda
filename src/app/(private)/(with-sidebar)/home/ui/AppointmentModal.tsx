'use client';

import { FiHelpCircle, FiTrash2, FiUserX, FiXCircle } from "react-icons/fi";

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
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 z-30">
      <div className="bg-white w-80 p-5 rounded-xl shadow-2xl shadow-black/30">
        <h2 className="font-semibold text-lg text-center text-gray-800">Alterar Status</h2>

        <div className="mt-4 space-y-2">
          <button
            onClick={() => onStatusChange('Em entendimento')}
            className="w-full py-2 px-4 text-sm text-left rounded-md hover:bg-gray-100 transition flex items-center gap-2"
          >
            <FiHelpCircle className="text-gray-500" />
            Em entendimento
          </button>

          <button
            onClick={() => onStatusChange('Cliente faltou')}
            className="w-full py-2 px-4 text-sm text-left rounded-md hover:bg-gray-100 transition flex items-center gap-2"
          >
            <FiUserX className="text-gray-500" />
            Cliente faltou
          </button>

          <button
            onClick={() => onStatusChange('Cancelado')}
            className="w-full py-2 px-4 text-sm text-left rounded-md hover:bg-gray-100 transition flex items-center gap-2"
          >
            <FiXCircle className="text-gray-500" />
            Cancelado
          </button>

          <button
            onClick={onRemove}
            className="w-full py-2 px-4 text-sm text-left text-red-500 hover:bg-red-50 transition rounded-md flex items-center gap-2"
          >
            <FiTrash2 className="text-red-500" />
            Remover
          </button>
        </div>
      </div>
    </div>
  );
};
