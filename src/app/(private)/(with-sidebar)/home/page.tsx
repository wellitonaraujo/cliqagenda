'use client';

import { normalizeDayName } from "../../../../../utils/normalizeDayName";
import { useAppointments } from "@/context/AppointmentsProvider";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useHorarios } from "@/context/HoursProvider";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Button from "@/componentes/Button";
import Header from "@/componentes/Header";

export default function Home() {
  const { appointments } = useAppointments();
  const { hours } = useHorarios();
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const shortDayName = selectedDate.toLocaleDateString('pt-BR', { weekday: 'short' });

  const convertToMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

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

  const dayName = normalizeDayName(shortDayName);
  const timeSlots = generateTimeSlots(dayName);

  useEffect(() => {
    if (scrollRef.current && timeSlots.length > 0) {
      const itemHeight = 40;
      scrollRef.current.scrollTop = 4 * itemHeight;
    }
  }, [timeSlots]);

  const handleDayChange = (days: number) => {
    setSelectedDate(prev => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() + days);
      return newDate;
    });
  };
  
  const formattedSelectedDate = selectedDate.toISOString().split('T')[0];
  
  const appointmentsOfTheDay = appointments.filter(
    (appointment) => appointment.day === formattedSelectedDate
  );
  
  useEffect(() => {
    console.log('Agendamentos no dia selecionado:', appointmentsOfTheDay);
  }, [appointmentsOfTheDay]);
  
  useEffect(() => {
    console.log('Agendamentos no dia selecionado:', appointmentsOfTheDay);
  }, [appointmentsOfTheDay]);

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

        <button onClick={() => handleDayChange(-1)}><FiChevronLeft size={20} /></button>
        <span>{selectedDate.toLocaleDateString('pt-BR')}</span>
        <button onClick={() => handleDayChange(1)}><FiChevronRight size={20} /></button>

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
        <ul className="mt-4">
      {appointmentsOfTheDay.map((a) => (
        <li key={a.id} className="border p-2 rounded mb-2">
          <p>Cliente: {a.customerName}</p>
          <p>Serviço: {a.serviceName}</p>
          <p>Colaborador: {a.customerName}</p>
          <p>Horário: {a.time}</p>
          <p>Preço: R$ {a.price}</p>
        </li>
      ))}
     </ul>

      </div>

    </div>
  );
}
