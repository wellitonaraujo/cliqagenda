import { Appointment, TimeSlot } from "@/types/Appointment";
import { Collaborator } from "@/types/collaborator";
import { SelectedSlot } from "@/types/SelectedSlot";
import AppointmentCard from "./AppointmentCard";

interface CollaboratorColumnProps {
  collaborator: Collaborator;
  timeSlots: TimeSlot[];
  appointments: Appointment[];
  onSelectSlot: (collaboratorId: number, timeSlotIndex: number) => void;
  selectedSlot: SelectedSlot | null;
  expandedId: string | number | null;
  setExpandedId: React.Dispatch<React.SetStateAction<string | number | null>>;
  setModalOpen: (open: boolean) => void;
  setSelectedAppointment: (appointment: Appointment | null) => void;
}

export default function CollaboratorColumn({
  collaborator,
  timeSlots,
  appointments,
  onSelectSlot,
  selectedSlot,
  expandedId,
  setExpandedId,
  setModalOpen,
  setSelectedAppointment,
}: CollaboratorColumnProps) {
  return (
    <div className="flex flex-col border-l border-gray-200 min-w-[220px] flex-1 relative">
      {timeSlots.map(({ label }, index) => {
        const isSelected =
          selectedSlot?.collaboratorId === collaborator.id &&
          selectedSlot?.timeSlotIndex === index;

        return (
          <div
            key={index}
            onClick={() => onSelectSlot(collaborator.id, index)}
            className={`h-10 border-b border-gray-200 group flex items-center justify-center cursor-pointer ${
              isSelected ? 'bg-[#EFFBFF]' : ''
            }`}
          >
            <span
              className={`text-xs font-bold text-[#00AEEF] ${
                isSelected ? 'block' : 'hidden group-hover:block'
              }`}
            >
              {label}
            </span>
          </div>
        );
      })}

      {appointments
        .filter((a) => a.colaborador.id === collaborator.id)
        .map((a) => (
          <AppointmentCard
            key={a.id}
            appointment={a}
            timeSlots={timeSlots}
            expandedId={expandedId}
            setExpandedId={setExpandedId}
            setModalOpen={setModalOpen}
            setSelectedAppointment={setSelectedAppointment}
          />
        ))}
    </div>
  );
}
