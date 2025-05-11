'use client';

import { useCustomers } from "@/context/CustomersContext";
import { useRouter } from "next/navigation";
import Button from "@/componentes/Button";
import Header from "@/componentes/Header";

export default function Customers() {
  const router = useRouter();
  const { customers } = useCustomers();

  const hasCustomers = customers.length > 0;

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="flex items-center gap-2">
        <Header />
      </div>

      {!hasCustomers ? (
        <div className="flex flex-col justify-center items-center flex-1 text-center">
          <p className="text-lg font-semibold text-gray-700">Sem clientes cadastrados</p>
          <p className="mt-2 text-md text-gray-500">Cadastre um novo cliente</p>
        </div>
      ) : (
        <div className="px-6 py-4">
          {customers.map((customer) => (
            <div key={customer.id} className="border border-gray-200 rounded-lg p-4 max-w-xl mx-auto">
              <h3 className="text-xl font-semibold text-gray-800">{customer.name}</h3>
              <p className="text-md text-gray-600">{customer.email}</p>
              <p className="text-sm text-gray-500">{customer.phone}</p>
              <div className="mt-2 text-sm text-gray-400">
                <p>{customer.address.street}, {customer.address.number}</p>
                <p>{customer.address.district}</p>
                <p>{customer.address.city} - {customer.address.state}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-auto p-6 mb-20 w-full max-w-xl mx-auto" onClick={() => {
        router.push('/new-customers');
      }}>
        <Button full>
          Novo cliente
        </Button>
      </div>
    </div>
  );
}
