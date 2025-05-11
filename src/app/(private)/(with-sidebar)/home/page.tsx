'use client';

import Button from "@/componentes/Button";
import { useEffect, useState, useRef } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Header from "@/componentes/Header";
import { useHorarios } from "@/context/HoursProvider";

export default function Home() {
  const { hours } = useHorarios(); // acesso ao contexto
  const [selectedDate, setSelectedDate] = useState("Seg. 5 de mai.");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 🔁 Mapeia o nome do dia para o nome usado no objeto `hours`
  const getDayName = (dateString: string) => {
    if (dateString.startsWith("Seg")) return "Segunda";
    if (dateString.startsWith("Ter")) return "Terça";
    if (dateString.startsWith("Qua")) return "Quarta";
    if (dateString.startsWith("Qui")) return "Quinta";
    if (dateString.startsWith("Sex")) return "Sexta";
    if (dateString.startsWith("Sáb")) return "Sábado";
    if (dateString.startsWith("Dom")) return "Domingo";
    return "";
  };

  // 🔁 Gera os horários apenas com base no dia e intervalo definidos
  const generateTimeSlots = (day: string) => {
    const config = hours[day];
    if (!config || !config.open) return [];

    const slots = config.ranges.flatMap((range) => {
      const start = convertToMinutes(range.start);
      const end = convertToMinutes(range.end);
      const times = [];

      for (let t = start; t < end; t += 15) {
        const hour = Math.floor(t / 60);
        const minute = t % 60;
        const label = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
        times.push({ id: t, label });
      }

      return times;
    });

    return slots;
  };

  const convertToMinutes = (time: string) => {
    const [hour, minute] = time.split(":").map(Number);
    return hour * 60 + minute;
  };

  const dayName = getDayName(selectedDate);
  const timeSlots = generateTimeSlots(dayName);

  useEffect(() => {
    if (scrollRef.current && timeSlots.length > 0) {
      const itemHeight = 40;
      scrollRef.current.scrollTop = 4 * itemHeight;
    }
  }, [timeSlots]);

  return (
<div className="flex flex-col min-h-screen bg-white">

      {/* Header (fixado no topo) */}
      <div className="sticky top-0 z-10 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Header />
          </div>
        </div>
      </div>

      {/* Date navigation + botão (fixado logo abaixo do header) */}
      <div className="sticky top-16 z-10 bg-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-2 text-primary font-medium">
          <button className="text-gray-700">
            <FiChevronLeft size={20} />
          </button>
          <span className="text-gray-700">{selectedDate}</span>
          <button className="text-gray-700">
            <FiChevronRight size={20} />
          </button>
        </div>
        <div className="ml-auto">
          <Button>Agendar</Button>
        </div>
      </div>

   {/* Conteúdo principal */}
   <div className="flex-1 overflow-y-auto p-2 flex">
        {/* Coluna de horários */}
        <div className="flex flex-col w-10 pr-2">
          {timeSlots.map(({ id, label }, index) => (
            <div key={id} className="h-8 flex items-end justify-end pb-[1px]">
              {label && (
                <span className="text-xs text-gray-500 leading-none translate-y-1/2">
                  {label}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="flex-1">
          {timeSlots.map(({ label }, index) => {
            const isSelected = selectedIndex === index;
            return (
              <div
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`relative h-8 border group flex items-center justify-center cursor-pointer
                  ${isSelected ? 'border-[#7567E4]' : 'border-gray-200'} hover:border-[#7567E4]`}
              >
                <span className={`text-xs text-[#7567E4] ${isSelected ? 'block' : 'hidden group-hover:block'}`}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
