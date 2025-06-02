'use client';

import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import Button from '@/componentes/Button';

interface AppointmentsHeaderProps {
  selectedDate: Date;
  onDateChange: (days: number) => void;
  appointmentsCount: number;
  onNewAppointment: () => void;
  loading?: boolean;
}

function Skeleton({ width = 80, height = 20 }: { width?: number; height?: number }) {
  return (
    <div
      className="bg-gray-300 rounded animate-pulse"
      style={{ width, height }}
      aria-label="loading"
    />
  );
}

export default function AppointmentsHeader({
  selectedDate,
  onDateChange,
  appointmentsCount,
  onNewAppointment,
  loading = false,
}: AppointmentsHeaderProps) {
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-BR');
  };

  const getAppointmentsLabel = () => {
    if (appointmentsCount === 0) return 'Nenhum agendamento';
    if (appointmentsCount === 1) return '1 agendamento';
    return `${appointmentsCount} agendamentos`;
  };

  return (
    <div className="sticky top-15 z-20 bg-white p-4 flex justify-between items-start md:items-center">
      <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4">
          <div className="flex items-center gap-2 text-primary font-medium">
            <button
              onClick={() => onDateChange(-1)}
              className="h-10 w-10 flex items-center justify-center text-gray-400 bg-[#fafafa] rounded-md"
              aria-label="Dia anterior"
            >
              <FiChevronLeft size={20} />
            </button>

            <span className="h-10 flex text-[#5C5C5C] items-center justify-center  bg-gray-50 px-4 rounded-md text-sm font-medium">
              {formatDate(selectedDate)}
            </span>

            <button
              onClick={() => onDateChange(1)}
              className="h-10 w-10 flex items-center justify-center text-gray-400 bg-[#fafafa] rounded-md"
              aria-label="Próximo dia"
            >
              <FiChevronRight size={20} />
            </button>
          </div>

          <span className="text-sl text-[#1195FF] text-center font-semibold md:text-left pt-4 md:pt-0 min-w-[120px]">
            {loading ? <Skeleton width={100} height={20} /> : getAppointmentsLabel()}
          </span>
        </div>
      </div>

      <div className="ml-auto" onClick={onNewAppointment}>
        <Button>Novo agendamento</Button>
      </div>
    </div>
  );
}
