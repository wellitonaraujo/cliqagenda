'use client';

import { useState, useEffect, useRef } from "react";
import Button from "@/componentes/Button";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Header from "@/componentes/Header";
import { useHorarios } from "@/context/HoursProvider";
import { useRouter } from "next/navigation";
import { useAppointments } from "@/context/AppointmentsProvider";

export default function Home() {
  const { appointments } = useAppointments();
  const { hours } = useHorarios();
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    const dayName = today.toLocaleDateString('pt-BR', { weekday: 'long' });
    return capitalizeFirstLetter(dayName);
  });
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

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
  
  const dayName = getDayName(selectedDate);

  const generateTimeSlots = (day: string) => {
    const config = hours[day];
    if (!config) return [];    

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
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const timeSlots = generateTimeSlots(dayName);

  useEffect(() => {
    if (scrollRef.current && timeSlots.length > 0) {
      const itemHeight = 40;
      scrollRef.current.scrollTop = 4 * itemHeight;
    }
  }, [timeSlots]);

  const handleDayChange = (direction: number) => {
    const daysOfWeek = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

    const currentIndex = daysOfWeek.indexOf(getDayName(selectedDate));

    let newIndex = currentIndex + direction;

    if (newIndex < 0) newIndex = daysOfWeek.length - 1;

    if (newIndex >= daysOfWeek.length) newIndex = 0;

    const newSelectedDate = daysOfWeek[newIndex];

    setSelectedDate(newSelectedDate);
    setSelectedIndex(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <div className="sticky top-0 z-10 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Header />
          </div>
        </div>
      </div>

      <div className="sticky top-16 z-10 bg-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-2 text-primary font-medium">
          <button 
            className="text-gray-700" 
            onClick={() => handleDayChange(-1)}
          >
            <FiChevronLeft size={20} />
          </button>
          <span className="text-gray-700">{selectedDate}</span>
          <button 
            className="text-gray-700" 
            onClick={() => handleDayChange(1)}
          >
            <FiChevronRight size={20} />
          </button>
        </div>
        <div className="ml-auto" onClick={() => router.push('/scheduling')}>
          <Button>Agendar</Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 flex">
        <div className="flex flex-col w-10 pr-2">
          {
            timeSlots.map(({ id, label }, index) => (
              <div key={id} className="h-10 flex items-end justify-end pb-[1px]">
                {index % 2 === 0 && label && (
                  <span className="text-sm text-gray-800 leading-none translate-y-1/2">
                    {label}
                  </span>
                )}
              </div>
            ))
          }
        </div>
        <div className="flex-1 relative">
          {timeSlots.map(({ label }, index) => {
            const isSelected = selectedIndex === index;
            return (
              <div
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`h-10 border group flex items-center justify-center cursor-pointer
                  ${isSelected ? 'border-[#7567E4] border-3 rounded-2xl' : 'border-gray-200'} hover:border-[#7567E4]`}
              >
                <span className={`text-xs font-bold text-[#7567E4] ${isSelected ? 'block' : 'hidden group-hover:block'}`}>
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
