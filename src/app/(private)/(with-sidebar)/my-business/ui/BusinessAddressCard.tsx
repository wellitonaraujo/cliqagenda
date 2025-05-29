'use client';

import Image from 'next/image';

interface BusinessAddressCardProps {
  endereco: string;
  imagemMapaUrl?: string;
}

export default function BusinessAddressCard({
  endereco,
  imagemMapaUrl = '/location.svg',
}: BusinessAddressCardProps) {
  return (
    <div>
      <label className="text-md text-gray-700 font-medium">Endereço</label>
      <div className="mt-1 border border-[#DEDEDE] rounded-md overflow-hidden">
        <div className="px-3 py-2 text-sm">
          {endereco}
        </div>
        <Image
          src={imagemMapaUrl}
          width={38}
          height={38}
          alt="mapa"
          className="w-full h-36 object-cover"
        />
      </div>
    </div>
  );
}
