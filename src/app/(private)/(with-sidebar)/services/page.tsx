'use client';

import Button from '@/componentes/Button';
import Header from '@/componentes/Header';
import Spinner from '@/componentes/Spinner';
import { useService } from '@/context/ServiceContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Services() {
  const router = useRouter();
  const { services, loadServices } = useService();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      await loadServices();
      setLoading(false);
    };
    fetchServices();
  }, []);

  if (loading) {
    return <Spinner message="Carregando serviços..." />;
  }

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
        <div className="p-4 flex flex-col gap-4 overflow-auto flex-1 items-center">
          {services.map((service) => (
            <div
              key={service.id}
              className="w-full max-w-xl rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow duration-200 bg-white cursor-pointer"
              onClick={() => router.push(`/services/${service.id}`)}
            >
              <div className="grid grid-cols-3 text-md font-medium text-gray-500 mb-1">
                <span>Serviço</span>
                <span>Duração</span>
                <span>Preço</span>
              </div>
              <div className="grid grid-cols-3 text-base font-semibold text-gray-800">
                <span>{service.nome}</span>
                <span>{service.duracaoMin} min</span>
                <span>R$ {service.preco.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div
        className="mt-auto p-6 mb-20 w-full max-w-xl mx-auto"
        onClick={() => router.push('/new-service')}
      >
        <Button full> Novo serviço </Button>
      </div>
    </div>
  );
}
