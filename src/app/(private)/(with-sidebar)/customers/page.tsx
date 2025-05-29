'use client';

import { FiMapPin, FiPhone, FiUser } from 'react-icons/fi';
import { useCustomers } from '@/context/CustomersContext';
import EmptyState from '@/componentes/EmptyState';
import Spinner from '@/componentes/Spinner';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Button from '@/componentes/Button';
import Header from '@/componentes/Header';

export default function Customers() {
  const router = useRouter();
  const { customers, fetchCustomers } = useCustomers();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetchCustomers();
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <Spinner message="Carregando clientes..." />;
  }

  const hasCustomers = customers.length > 0;

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="flex items-center gap-2">
        <Header />
      </div>

      {!hasCustomers ? (
       <EmptyState
        title="Sem clientes cadastrados"
        subtitle="Cadastre um novo cliente"
      />
      ) : (
        <div className="px-6 py-4 overflow-auto flex-1">
          {customers.map((customer) => (
            <div
              key={customer.id}
              className="border border-gray-200 hover:shadow-md transition-shadow duration-200 rounded-lg p-4 max-w-xl mx-auto cursor-pointer mb-5"
              onClick={() => router.push(`/customers/${customer.id}`)}
            >
              <div className="flex items-center gap-2 text-base text-gray-700 font-semibold">
                <FiUser />
                <span>{customer.nome}</span>
              </div>

              <div className="flex items-center gap-2 text-base text-gray-600 mt-3">
                <FiPhone />
                <span>{customer.telefone}</span>
              </div>

              <div className="flex items-start gap-2 text-base text-gray-600 mt-3">
                <FiMapPin className="mt-1" />
                <p>
                  {customer.rua}, {customer.numero} - {customer.bairro}, {customer.cidade}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div
        className="mt-auto p-6 mb-20 w-full max-w-xl mx-auto"
        onClick={() => router.push('/new-customers')}
      >
        <Button full>Novo cliente</Button>
      </div>
    </div>
  );
}
