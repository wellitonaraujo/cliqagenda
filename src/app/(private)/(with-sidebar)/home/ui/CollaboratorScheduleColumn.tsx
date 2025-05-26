import { Collaborator } from "@/types/collaborator";
import { AppointmentsColumn } from "./AppointmentsColumn";
import { Appointment } from "@/types/Appointment";

interface CollaboratorScheduleColumnProps {
    collaborator: Collaborator;
    timeSlots: { label: string }[];
    selectedSlot: { collaboratorId: number; timeSlotIndex: number } | null;
    setSelectedSlot: React.Dispatch<
      React.SetStateAction<{ collaboratorId: number; timeSlotIndex: number } | null>
    >;
    appointmentsOfTheDay: Appointment[];
    expandedId: string | number | null;
    setExpandedId: React.Dispatch<React.SetStateAction<string | number | null>>;
    onOpenModal: (appointment: Appointment) => void;
  }
  
  export function CollaboratorScheduleColumn({
    collaborator,
    timeSlots,
    selectedSlot,
    setSelectedSlot,
    appointmentsOfTheDay,
    expandedId,
    setExpandedId,
    onOpenModal,
  }: CollaboratorScheduleColumnProps) {
    return (
      <div className="flex flex-col border-l border-gray-200 min-w-[220px] flex-1 relative">
        {timeSlots.map(({ label }, index) => {
          const isSelected =
            selectedSlot?.collaboratorId === collaborator.id &&
            selectedSlot?.timeSlotIndex === index;
  
          return (
            <div
              key={index}
              onClick={() =>
                isSelected
                  ? setSelectedSlot(null)
                  : setSelectedSlot({ collaboratorId: collaborator.id, timeSlotIndex: index })
              }
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
  
        <AppointmentsColumn
          collaboratorId={collaborator.id}
          appointmentsOfTheDay={appointmentsOfTheDay}
          timeSlots={timeSlots.map(slot => slot.label)}
          expandedId={expandedId}
          setExpandedId={setExpandedId}
          onOpenModal={onOpenModal}
        />
      </div>
    );
  }
  