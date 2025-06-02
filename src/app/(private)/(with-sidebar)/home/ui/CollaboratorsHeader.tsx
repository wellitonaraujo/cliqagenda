"use client";

import Image from 'next/image';
import React from 'react';

interface Collaborator {
  id: string | number;
  nome: string;
}

interface Appointment {
  colaborador: Collaborator;
}

interface CollaboratorsHeaderProps {
  collaborators: Collaborator[];
  appointmentsOfTheDay: Appointment[];
  minCols?: number;
  isLoadingCounts?: boolean;
}

export const CollaboratorsHeader: React.FC<CollaboratorsHeaderProps> = ({
  collaborators,
  appointmentsOfTheDay,
  minCols = 0,
  isLoadingCounts = false,
}) => {
  const isLoading = !collaborators || collaborators.length === 0;

  if (isLoading) {
    return (
      <div className="flex sticky top-0 z-10 bg-white min-w-full">
        {Array(4).fill(0).map((_, i) => (
          <div
            key={`skeleton-${i}`}
            className="min-w-[220px] h-[40px] flex items-center justify-between px-3 bg-[#fcfcfc] text-xs font-medium text-gray-400 animate-pulse"
          >
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-7 h-7 rounded-full bg-gray-300" />
              <div className="w-[110px] h-4 rounded bg-gray-300" />
            </div>

            <div className="w-6 h-6 min-w-6 min-h-6 rounded-full bg-gray-300" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex sticky top-0 z-10 bg-white min-w-full">
      {collaborators.map((collab, index) => {
        const count = appointmentsOfTheDay.filter(
          (a) => a.colaborador.id === collab.id
        ).length;

        return (
          <div
            key={`header-${collab.id ?? index}`}
            className="min-w-[220px] h-[40px] flex items-center justify-between px-3 bg-[#fcfcfc] text-xs font-medium text-gray-500"
          >
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="w-7 h-7 rounded-full overflow-hidden border border-gray-400">
                <Image
                  src="/image.png"
                  alt="foto de perfil"
                  width={40}
                  height={40}
                  className="w-full h-full"
                />
              </div>
              <span className="truncate max-w-[110px] text-gray-500">
                {collab.nome}
              </span>
            </div>

            {isLoadingCounts ? (
              <div className="w-6 h-6 min-w-6 min-h-6 rounded-full bg-gray-300 animate-pulse" />
            ) : (
              <div className="w-6 h-6 min-w-6 min-h-6 rounded-full text-[#1195FF] text-sm font-extrabold flex items-center justify-center">
                {count}
              </div>
            )}
          </div>
        );
      })}

      {Array(Math.max(0, minCols - collaborators.length))
        .fill(0)
        .map((_, i) => (
          <div
            key={`empty-header-${i}`}
            className="min-w-[220px] h-[40px] border-gray-200 border-b-1 bg-gray-200"
            style={{
              backgroundImage:
                'repeating-linear-gradient(-45deg, #ffff 0px, #ffff 10px, #fafafa 10px, #fafafa 20px)',
            }}
          />
        ))}
    </div>
  );
};
