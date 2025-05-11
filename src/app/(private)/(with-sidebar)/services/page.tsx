"use client";

import Button from "@/componentes/Button";
import Header from "@/componentes/Header";
import { useServices } from "@/context/ServiceContext";
import { useRouter } from "next/navigation";

export default function Services() {
  const router = useRouter();
  const { services } = useServices();

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="flex items-center gap-2">
        <Header />
      </div>

      {services.length === 0 ? (
        <div className="flex flex-col justify-center items-center flex-1 text-center">
          <p className="text-lg font-semibold text-gray-700">Sem serviços cadastrados</p>
          <p className="mt-2 text-md text-gray-500">Cadastre um novo serviço</p>
        </div>
      ) : (
        <div className="p-4 flex flex-col gap-4 overflow-auto flex-1">
          {services.map((service) => (
            <div
              key={service.id}
              className="border border-gray-200 rounded-lg p-4 shadow-sm"
            >
              <p className="font-semibold text-lg text-gray-800">{service.name}</p>
              <div className="flex justify-between text-sm text-gray-600 mt-1">
                <span>Duração: {service.duration}</span>
                <span>Valor: R$ {service.price}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-auto p-6 mb-20" onClick={() => {
        router.push('/new-service');
      }}>
        <Button full> Novo serviço </Button>
      </div>
    </div>
  );
}
