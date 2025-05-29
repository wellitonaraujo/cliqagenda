'use client';

import { FiEdit2 } from 'react-icons/fi';
import Image from 'next/image';

interface BusinessProfileCardProps {
  nomeEmpresa: string | null | undefined;
}

export default function BusinessProfileCard({ nomeEmpresa }: BusinessProfileCardProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        <div className="w-25 h-25 rounded-full overflow-hidden border-3 border-[#00AEEF]">
          <Image
            src="/profile.png"
            alt="foto de perfil"
            width={80}
            height={80}
            className="w-full h-full object-cover"
          />
        </div>
        <FiEdit2 className="absolute bottom-1 right-1 bg-white rounded-full p-1 text-xl border" />
      </div>

      <div className="flex items-center gap-2 m-5">
        <span>{nomeEmpresa ?? 'Carregando empresa...'}</span>
        <FiEdit2 className="text-sm text-gray-500 cursor-pointer" />
      </div>
    </div>
  );
}
