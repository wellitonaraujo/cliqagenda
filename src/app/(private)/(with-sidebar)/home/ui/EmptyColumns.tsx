'use client';

interface EmptyColumnsProps {
  count: number;
  timeSlotsLength: number;
}

export function EmptyColumns({ count, timeSlotsLength }: EmptyColumnsProps) {
  if (count <= 0) return null;

  return (
    <>
      {Array(count)
        .fill(0)
        .map((_, i) => (
          <div
            key={`empty-body-${i}`}
            className="flex flex-col border-l border-gray-200 min-w-[220px] flex-1"
            style={{
              backgroundImage:
                'repeating-linear-gradient(-45deg, #ffff 0px, #ffff 10px, #fafafa 10px, #fafafa 20px)',
            }}
          >
            {Array(timeSlotsLength)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="h-[50px] border-b border-gray-200" />
              ))}
          </div>
        ))}
    </>
  );
}
