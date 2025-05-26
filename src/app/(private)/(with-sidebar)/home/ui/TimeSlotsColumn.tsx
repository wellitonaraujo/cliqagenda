'use client';

interface TimeSlotsColumnProps {
  timeSlots: { id: number; label: string }[];
}

export default function TimeSlotsColumn({ timeSlots }: TimeSlotsColumnProps) {
  return (
    <div className="flex flex-col w-10 pr-2">
      <div className="h-[32px]" />
      {timeSlots.map(({ label }, index) => (
        <div key={label} className="h-10 flex justify-end">
          {index % 2 === 0 && label && (
            <span className="text-sm text-gray-400 leading-none">{label}</span>
          )}
        </div>
      ))}
    </div>
  );
}
