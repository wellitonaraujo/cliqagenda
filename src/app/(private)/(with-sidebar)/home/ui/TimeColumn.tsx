import { TimeSlot } from "@/types/Appointment";

interface TimeColumnProps {
  timeSlots: TimeSlot[];
}

export default function TimeColumn({ timeSlots }: TimeColumnProps) {
  return (
    <div className="flex flex-col w-10 pr-2">
      <div className="h-[32px]" />
      {timeSlots.map(({ id, label }, index) => (
        <div key={id} className="h-10 flex justify-end">
          {index % 2 === 0 && label && (
            <span className="text-sm text-gray-400 leading-none">{label}</span>
          )}
        </div>
      ))}
    </div>
  );
}
