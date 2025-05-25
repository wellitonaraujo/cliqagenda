import { Appointment, TimeSlot } from '@/types/Appointment';
import { FiMoreVertical } from 'react-icons/fi';

interface AppointmentCardProps {
  appointment: Appointment;
  timeSlots: TimeSlot[];
  expandedId: string | number | null;
  setExpandedId: React.Dispatch<React.SetStateAction<string | number | null>>;
  setModalOpen: (open: boolean) => void;
  setSelectedAppointment: (appointment: Appointment | null) => void;
}

export default function AppointmentCard({
  appointment,
  timeSlots,
  expandedId,
  setExpandedId,
  setModalOpen,
  setSelectedAppointment,
}: AppointmentCardProps) {
  const index = timeSlots.findIndex((slot) => slot.label === appointment.time);
  if (index === -1) return null;

  const top = index * 40;
  const durationInMinutes = parseInt(appointment.duracaoMin, 10);
  const height = (durationInMinutes / 30) * 40;

  const isShort = height <= 700;
  const isExpanded = expandedId === appointment.id;
  const displayHeight = isShort && isExpanded ? 100 : height;

  return (
    <div
      className={`absolute left-1 right-0 shadow-md rounded overflow-hidden bg-[#F5FCFF] border-l-4 transition-all duration-300 cursor-pointer ${
        isExpanded ? 'z-30' : 'z-10'
      }`}
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
      <div className="pl-2 pt-0.5 text-[#034D82] h-full flex flex-col justify-between">
        <div className="flex justify-between items-start">
          <p className="font-semibold text-xs">{appointment.cliente.nome}</p>

          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedAppointment(appointment);
              setModalOpen(true);
            }}
            className="text-[#034D82] pr-1"
          >
            <FiMoreVertical size={18} />
          </button>
        </div>

        <div>
          <p className="text-xs text-gray-400 ">
            {appointment.servico.nome} às {appointment.time}
          </p>
          <p className="text-xs text-gray-400">R$ {appointment.preco}</p>
          {appointment.status && (
            <p className="text-xs text-[#00AEEF] mt-2">{appointment.status}</p>
          )}
        </div>
      </div>
    </div>
  );
}
