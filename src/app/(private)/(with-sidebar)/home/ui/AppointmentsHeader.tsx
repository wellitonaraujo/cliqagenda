'use client';

import { FiChevronLeft, FiChevronRight, FiRefreshCw } from 'react-icons/fi';
import Button from '@/componentes/Button';

interface AppointmentsHeaderProps {
  selectedDate: Date;
  onDateChange: (days: number) => void;
  appointmentsCount: number;
  onNewAppointment: () => void;
  onRefresh: () => void;
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
  onRefresh,
  loading = false,
}: AppointmentsHeaderProps) {

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
})
  .format(date)
  .replace('.', '');

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
              className="h-12 w-12 flex items-center border-2 border-[#F5F6F7] justify-center text-gray-400 bg-[#fafafa] rounded-3xl"
              aria-label="Dia anterior"
            >
              <FiChevronLeft size={22} color='#C3CAD9'/>
            </button>

            <span className="flex text-[#4D5E80] items-center justify-center text-md font-bold">
              {formatDate(selectedDate)}
            </span>

            <button
              onClick={() => onDateChange(1)}
              className="h-12 w-12 flex items-center justify-center border-2 border-[#F5F6F7]  text-gray-400 bg-[#fafafa] rounded-3xl"
              aria-label="Próximo dia"
            >
              <FiChevronRight size={22} color='#C3CAD9'/>
            </button>
          </div>

          <div className="flex items-center gap-2 text-[#1195FF] font-semibold pt-4 md:pt-0 min-w-[120px] ml-11">
            {loading ? <Skeleton width={100} height={20} /> : getAppointmentsLabel()}
            <button
              onClick={onRefresh}
              aria-label="Atualizar agendamentos"
              disabled={loading}
              className={`p-1 rounded-md hover:bg-gray-200 transition ${
                loading ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
              }`}
            >
              <FiRefreshCw size={22} />
            </button>
          </div>
          
        </div>
      </div>

      <div className="ml-auto" onClick={onNewAppointment}>
        <Button>Agendar</Button>
      </div>
    </div>
  );
}
