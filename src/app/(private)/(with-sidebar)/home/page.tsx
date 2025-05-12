'use client';

import { useState, useEffect, useRef } from "react";
import Button from "@/componentes/Button";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Header from "@/componentes/Header";
import { useHorarios } from "@/context/HoursProvider";

export default function Home() {
  const { hours } = useHorarios();

  const [selectedDate, setSelectedDate] = useState(() => {
    const today = new Date();
    const dayName = today.toLocaleDateString('pt-BR', { weekday: 'long' });
    return capitalizeFirstLetter(dayName);
  });
  
  function capitalizeFirstLetter(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

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

  const handleDayChange = (direction: number) => {
    const daysOfWeek = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

    // Encontra o índice do dia atual
    const currentIndex = daysOfWeek.indexOf(getDayName(selectedDate));

    // Calcula o novo índice com base na direção (1 = próximo, -1 = anterior)
    let newIndex = currentIndex + direction;

    // Se o novo índice for menor que 0, volta para o último dia
    if (newIndex < 0) newIndex = daysOfWeek.length - 1;

    // Se o novo índice for maior que o número de dias, volta para o primeiro dia
    if (newIndex >= daysOfWeek.length) newIndex = 0;

    // Atualiza o dia selecionado com o novo dia
    const newSelectedDate = daysOfWeek[newIndex];

    
    setSelectedDate(newSelectedDate); // Atualiza a data

    // Reinicia a seleção de horários
    setSelectedIndex(null); // Reinicia a seleção de horários quando a data mudar
  };

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

      <div className="sticky top-16 z-10 bg-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-2 text-primary font-medium">
          <button 
            className="text-gray-700" 
            onClick={() => handleDayChange(-1)}  // Vai para o dia anterior
          >
            <FiChevronLeft size={20} />
          </button>
          <span className="text-gray-700">{selectedDate}</span>
          <button 
            className="text-gray-700" 
            onClick={() => handleDayChange(1)}  // Vai para o próximo dia
          >
            <FiChevronRight size={20} />
          </button>
        </div>
        <div className="ml-auto">
          <Button>Agendar</Button>
        </div>
      </div>

    {/* Conteúdo principal */}
    <div className="flex-1 overflow-y-auto p-6 flex">
      {/* Coluna de horários */}
      <div className="flex flex-col w-10 pr-2">
        {timeSlots.length > 0 ? (
          timeSlots.map(({ id, label }, index) => (
            <div key={id} className="h-10 flex items-end justify-end pb-[1px]">
              {/* Exibe a label apenas de 30 em 30 minutos */}
              {index % 2 === 0 && label && (
                <span className="text-sm text-gray-800 leading-none translate-y-1/2">
                  {label}
                </span>
              )}
            </div>
          ))
        ) : (
          <div className="flex justify-center items-center h-8">
            <span className="text-xs text-gray-500">Fechado</span>
          </div>
        )}
      </div>

      {/* Coluna dos horários clicáveis */}
      <div className="flex-1">
        {timeSlots.length > 0 ? (
          timeSlots.map(({ label }, index) => {
            const isSelected = selectedIndex === index;
            return (
              <div
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`relative h-10 border group flex items-center justify-center cursor-pointer
                  ${isSelected ? 'border-[#7567E4] border-3 rounded-2xl' : 'border-gray-200'} hover:border-[#7567E4]`}
              >
                <span className={`text-xd font-bold text-[#7567E4] ${isSelected ? 'block' : 'hidden group-hover:block'}`}>
                  {label}
                </span>
              </div>
            );
          })
        ) : (
          <div className="h-8 flex items-center justify-center">
            <span className="text-xs text-gray-500">Fechado</span>
          </div>
        )}
      </div>
    </div>

    </div>
  );
}
