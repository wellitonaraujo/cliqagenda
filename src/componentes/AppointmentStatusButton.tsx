import { ReactNode } from "react";

interface AppointmentStatusButtonProps {
  icon: ReactNode;
  label: string;
  onClick: () => void;
}

export const AppointmentStatusButton = ({
  icon,
  label,
  onClick,
}: AppointmentStatusButtonProps) => (
  <button
    onClick={onClick}
    className="w-full py-2 px-4 text-sm text-left rounded-md hover:bg-gray-100 transition flex items-center gap-2"
  >
    {icon}
    {label}
  </button>
);
