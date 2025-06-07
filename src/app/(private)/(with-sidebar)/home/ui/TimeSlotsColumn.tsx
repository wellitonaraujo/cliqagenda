'use client';

interface TimeSlotsColumnProps {
  timeSlots: { id: number; label: string }[];
}

export default function TimeSlotsColumn({ timeSlots }: TimeSlotsColumnProps) {
  return (
    <div className="flex flex-col w-10 pr-3">
      <div className="h-[32px]" />
      {timeSlots.map(({ label }) => (
        <div key={label} className="h-[50px] flex justify-end">
          {label && (
            <span className="text-sm text-gray-400 leading-none">{label}</span>
          )}
        </div>
      ))}

    </div>
  );
}
