'use client';

import Button from "@/componentes/Button";
import Header from "@/componentes/Header";

export default function Customers() {
  const hasCustomers = false;

   return (
    <div className="flex flex-col h-screen bg-white">
           <div className="flex items-center gap-2">
             <Header />
           </div>
     
           {!hasCustomers ? (
             // Quando não há clientes cadastrados
             <div className="flex flex-col justify-center items-center flex-1 text-center">
               <p className="text-lg font-semibold text-gray-700">Sem clientes cadastrados</p>
               <p className="mt-2 text-md text-gray-500">Cadastre um novo cliente</p>
             </div>
           ) : (
             // Aqui você pode renderizar os clientes, caso haja algum
             <div>
               {/* Renderizar clientes aqui */}
             </div>
           )}
     
           <div className="mt-auto p-20">
             <Button full>Novo cliente</Button>
           </div>
    </div>
   );
}
