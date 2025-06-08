'use client';

import { FiLink } from 'react-icons/fi';

interface OnlineBookingLinkCardProps {
  nomeEmpresa?: string;
}

export default function OnlineBookingLinkCard({ nomeEmpresa }: OnlineBookingLinkCardProps) {
  const link = nomeEmpresa
    ? `www.cliqagenda.com/${nomeEmpresa}`
    : 'Carregando link...';

  return (
    <div>
      <label className="text-md text-gray-700 font-medium">Agendamento online</label>
      <div className="mt-1 flex items-center justify-between border border-[#DEDEDE] px-3 py-2 rounded-md">
        <span className="text-sm text-[#1195FF] font-medium">{link}</span>
        <FiLink />
      </div>
    </div>
  );
}
