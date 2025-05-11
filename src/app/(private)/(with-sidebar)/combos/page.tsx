'use client';

import Button from "@/componentes/Button";
import Header from "@/componentes/Header";
import { useRouter } from "next/navigation";
import { useCombos } from "@/context/ComboContext";

export default function Combos() {
  const router = useRouter();
  const { combos } = useCombos();

  const hasCombos = combos.length > 0;

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="flex items-center gap-2">
        <Header />
      </div>

      {!hasCombos ? (
        <div className="flex flex-col justify-center items-center flex-1 text-center">
          <p className="text-lg font-semibold text-gray-700">Nenhum combo cadastrado</p>
          <p className="mt-2 text-md text-gray-500">Cadastre um novo combo</p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6">
          {combos.map((combo) => (
            <div
              key={combo.id}
              className="border border-gray-200 rounded-lg p-4 max-w-xl mx-auto"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold text-gray-800">{combo.name}</h3>
                <div className="text-sm text-gray-600 text-right">
                  <p>R$ {combo.price}</p>
                  <p>{combo.duration} min</p>
                </div>
              </div>

              <div className="mt-4 text-gray-700">
                <p className="font-semibold mb-2">Serviços:</p>
                <ul className="list-disc ml-5 text-sm">
                  {combo.services.map((service) => (
                    <li key={service.id}>{service.name}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-auto p-6 mb-20 w-full max-w-xl mx-auto" onClick={() => router.push('/new-combo')}>
        <Button full>Novo Combo</Button>
      </div>
    </div>
  );
}
