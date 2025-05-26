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
}

export const CollaboratorsHeader: React.FC<CollaboratorsHeaderProps> = ({
  collaborators,
  appointmentsOfTheDay,
  minCols = 0,
}) => {
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
            {/* Foto + Nome */}
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

            {/* Contador */}
            <div className="w-6 h-6 min-w-6 min-h-6 rounded-full text-[#034D82] text-[12px] flex items-center justify-center">
              {count}
            </div>
          </div>
        );
      })}

      {/* Colunas vazias para preencher */}
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
