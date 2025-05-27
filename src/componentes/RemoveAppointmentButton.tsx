import { FiTrash2 } from "react-icons/fi";

interface RemoveAppointmentButtonProps {
  onClick: () => void;
}

export const RemoveAppointmentButton = ({ onClick }: RemoveAppointmentButtonProps) => (
  <button
    onClick={onClick}
    className="w-full py-2 px-4 text-sm text-left text-red-500 hover:bg-red-50 transition rounded-md flex items-center gap-2"
  >
    <FiTrash2 className="text-red-500" />
    Remover
  </button>
);
