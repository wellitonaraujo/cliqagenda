import Input from '@/componentes/Input';
import React from 'react';


interface PersonalInfoSectionProps {
  nome: string;
  email: string;
  telefone: string;
  setNome: (value: string) => void;
  setEmail: (value: string) => void;
  setTelefone: (value: string) => void;
}

export default function PersonalInfoSection({
  nome,
  email,
  telefone,
  setNome,
  setEmail,
  setTelefone,
}: PersonalInfoSectionProps) {
  return (
    <section className="mb-6">
      <h2 className="text-sd font-semibold mb-2 text-[#252525]">Informações pessoais</h2>

      <div className="mb-6">
        <Input placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)} />
      </div>

      <div className="mb-6">
        <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <p className="text-sm text-gray-500 mt-1">Será usado para entrar no sistema</p>
      </div>

      <div className="mb-6">
        <Input placeholder="Telefone" value={telefone} onChange={(e) => setTelefone(e.target.value)} />
      </div>
    </section>
  );
}
