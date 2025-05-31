import { useEffect, useState } from "react";

const SLOT_HEIGHT = 60;

type TimeSlot = { id: number; label: string };

interface NowLineProps {
  timeSlots: TimeSlot[];
  startTime: string;
  endTime: string;
  offsetTop?: number; // nova prop para ajustar o deslocamento
}

export default function NowLine({
  timeSlots,
  startTime,
  endTime,
  offsetTop = 0,
}: NowLineProps) {
  const [nowPosition, setNowPosition] = useState<number | null>(null);
  const [currentTime, setCurrentTime] = useState<string>("");

  function toMinutes(t: string) {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  }

  function formatTime(date: Date) {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  function calculateNowPosition() {
    if (timeSlots.length === 0) return null;

    const now = new Date();
    setCurrentTime(formatTime(now));

    const nowTotalMins =
      now.getHours() * 60 +
      now.getMinutes() +
      now.getSeconds() / 60 +
      now.getMilliseconds() / 60000;

    const firstMinutes = toMinutes(startTime);
    const lastMinutes = toMinutes(endTime);

    if (nowTotalMins < firstMinutes || nowTotalMins > lastMinutes) {
      return null;
    }

    const totalRangeMinutes = lastMinutes - firstMinutes;
    const nowOffsetMinutes = nowTotalMins - firstMinutes;

    const totalHeight = SLOT_HEIGHT * timeSlots.length;

    const position = (nowOffsetMinutes / totalRangeMinutes) * totalHeight;

    return position + offsetTop; // ajusta a posição somando o offset
  }

  useEffect(() => {
    function update() {
      setNowPosition(calculateNowPosition());
    }
    update();

    const interval = setInterval(update, 60 * 1000);
    return () => clearInterval(interval);
  }, [timeSlots, startTime, endTime, offsetTop]);

  if (nowPosition === null) return null;

  return (
    <>
      {/* Linha tracejada */}
      <div
        style={{
          position: "absolute",
          top: nowPosition,
          left: 0,
          right: 0,
          borderTop: "2px dashed #00AEEF",
          zIndex: 10,
        }}
      />
      {/* Caixa com hora */}
      <div
        style={{
          position: "absolute",
          top: nowPosition - 10,
          left: 4,
          backgroundColor: "#00AEEF",
          color: "#FFF",
          fontSize: "10px",
          fontWeight: "bold",
          border: "1px solid #00AEEF",
          borderRadius: 4,
          padding: "4px 8px",
          zIndex: 11,
        }}
      >
        {currentTime}
      </div>
    </>
  );
}
