'use client';

import Button from "@/componentes/Button";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useSidebar } from "@/context/SidebarContext";
import Header from "@/componentes/Header";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState("Seg. 5 de mai.");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const times = Array.from({ length: 40 }, (_, i) => {
    const hour = 9 + Math.floor(i / 4);
    const minute = (i % 4) * 15;
    const paddedMinute = minute.toString().padStart(2, '0');
    const label = minute % 30 === 0 ? `${hour}:${paddedMinute}` : '';
    return { id: i, label };
  });

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
        <Header />
        </div>
      
      </div>

      {/* Date navigation + botão */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2 text-primary font-medium">
          <button className="text-gray-700">
            <FiChevronLeft size={20} />
          </button>
          <span className="text-gray-700">{selectedDate}</span>
          <button className="text-gray-700">
            <FiChevronRight size={20} />
          </button>
        </div>
        <Button>Agendar</Button>
      </div>

      {/* Conteúdo principal */}
      <div className="flex-1 overflow-y-auto p-2 flex">
        {/* Coluna de horários */}
        <div className="flex flex-col w-10 pr-2">
          {times.map(({ id, label }, index) => (
            <div
              key={id}
              className={`${index === 0 ? 'h-3' : 'h-8'} flex items-end justify-end pb-[1px]`}
            >
              {label && (
                <span className="text-xs text-gray-500 leading-none translate-y-1/2">
                  {label}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Grade */}
        <div className="flex-1">
          {times.map((_, index) => {
            const hour = 9 + Math.floor(index / 4);
            const minute = (index % 4) * 15;
            const formatted = `${hour}:${minute.toString().padStart(2, '0')}`;
            const isSelected = selectedIndex === index;

            return (
              <div
                key={index}
                onClick={() => setSelectedIndex(index)}
                className={`relative ${index === 0 ? 'h-3' : 'h-8'} border group flex items-center justify-center cursor-pointer
                  ${isSelected ? 'border-[#7567E4]' : 'border-gray-200'} hover:border-[#7567E4]`}
              >
                <span className={`text-xs text-[#7567E4] ${isSelected ? 'block' : 'hidden group-hover:block'}`}>
                  {formatted}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
