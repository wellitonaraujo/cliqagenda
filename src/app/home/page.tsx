'use client';

import Button from "@/componentes/Button";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { HiMenu } from "react-icons/hi";
import Image from "next/image";

export default function Home() {
  const [selectedDate, setSelectedDate] = useState("Seg. 5 de mai.");

  // Gera 15min de intervalo, das 9:00 às 18:45 (40 blocos)
  const times = Array.from({ length: 40 }, (_, i) => {
    const hour = 9 + Math.floor(i / 4);
    const minute = (i % 4) * 15;
    const paddedMinute = minute.toString().padStart(2, '0');
    const label = minute % 30 === 0 ? `${hour}:${paddedMinute}` : ''; // mostra só a cada 30min
    return { id: i, label };
  });

  return (
    <div className="min-h-screen bg-black text-white flex">
      {/* Sidebar fechado (simulado) */}
      <div />

      <div className="flex-1 bg-white text-gray-300 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <button className="text-xl text-gray-700">
              <HiMenu />
            </button>
            <h2 className="text-lg font-semibold text-gray-700">Atendimentos</h2>
          </div>

          <div className="w-8 h-8 rounded-full overflow-hidden">
            <Image
              src="/avatar.jpg"
              alt="Avatar"
              width={32}
              height={32}
            />
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

          <Button>+ Agendar</Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
            <div className="flex">
                {/* Coluna de horários, alinhando o texto na borda inferior */}
                <div className="flex flex-col w-14 pr-2">
                    {times.map(({ id, label }) => (
                        <div key={id} className="h-10 flex items-end justify-end pb-[1px]">
                        {label && (
                            <span className="text-sm text-gray-500 leading-none translate-y-1/2">
                            {label}
                            </span>
                        )}
                        </div>
                    ))}
                </div>

                {/* Grade com borda e divisões internas */}
                <div className="flex-1 border border-gray-300 rounded-md overflow-hidden">
                    {times.map(({ id }) => (
                    <div key={id} className="h-10 border-b last:border-b-0 border-gray-300" />
                ))}
            </div>
            </div>
        </div>
      </div>
    </div>
  );
}
