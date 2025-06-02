import Input from '@/componentes/Input';
import React from 'react';


interface AddressSectionProps {
  rua: string;
  numero: string;
  bairro: string;
  cidade: string;
  setRua: (value: string) => void;
  setNumero: (value: string) => void;
  setBairro: (value: string) => void;
  setCidade: (value: string) => void;
}

export default function AddressSection({
  rua,
  numero,
  bairro,
  cidade,
  setRua,
  setNumero,
  setBairro,
  setCidade,
}: AddressSectionProps) {
  return (
    <section className="mt-10 mb-6">
      <h2 className="text-sd font-semibold mb-2 text-[#252525]">Endereço</h2>
      <div className="mb-6">
        <Input placeholder="Rua" value={rua} onChange={(e) => setRua(e.target.value)} />
      </div>
      <div className="grid grid-cols-2 gap-2 mb-4">
        <Input placeholder="Número" value={numero} onChange={(e) => setNumero(e.target.value)} />
        <Input placeholder="Bairro" value={bairro} onChange={(e) => setBairro(e.target.value)} />
      </div>
      <div className="grid grid-cols-2 gap-2 mb-4">
        <Input placeholder="Cidade" value={cidade} onChange={(e) => setCidade(e.target.value)} />
      </div>
    </section>
  );
}
