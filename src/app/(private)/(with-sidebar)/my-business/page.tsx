'use client';

import OnlineBookingLinkCard from './ui/OnlineBookingLinkCard';
import BusinessProfileCard from './ui/BusinessProfileCard';
import BusinessAddressCard from './ui/BusinessAddressCard';
import { useOpeningHours } from './hooks/useOpeningHours';
import { useAuth } from '@/context/AuthContext';
import OpeningHours from './ui/OpeningHours';
import Header from '@/componentes/Header';
import Button from '@/componentes/Button';

export default function MeuNegocioPage() {
  const { empresa } = useAuth();
  const { editableHorarios, toggleDay, handleTimeChange, saveSchedules } = useOpeningHours();

  return (
    <div className="bg-white min-h-screen">
      <Header />
      <div className="bg-white rounded-xl p-4 space-y-6 max-w-3xl mx-auto">
        <BusinessProfileCard nomeEmpresa={empresa?.nome} />
        <OnlineBookingLinkCard nomeEmpresa={empresa?.nome} />
        <BusinessAddressCard endereco="Avenida Vai Quem Tem Vontade, 123, Velho Horizonte, Teresina - PI" />
        <OpeningHours
          horarios={editableHorarios}
          onToggleDay={toggleDay}
          onTimeChange={handleTimeChange}
        />
       <Button onClick={() => {
          saveSchedules();
        }}>
          Atualizar horários
        </Button>

      </div>
    </div>
  );
}
