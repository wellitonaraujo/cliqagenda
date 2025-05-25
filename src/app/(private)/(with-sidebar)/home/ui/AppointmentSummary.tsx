interface AppointmentSummaryProps {
    count: number;
  }
  
  export default function AppointmentSummary({ count }: AppointmentSummaryProps) {
    return (
      <span className="text-sl text-[#034D82] text-center md:text-left pt-4 md:pt-0">
        {count === 0
          ? 'Nenhum agendamento'
          : count === 1
          ? '1 agendamento'
          : `${count} agendamentos`}
      </span>
    );
  }
  