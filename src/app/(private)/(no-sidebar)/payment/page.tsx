"use client";

import { usePlanStore } from '@/app/store/usePlanStore';
import { useRouter } from 'next/navigation';
import { HiArrowLeft } from 'react-icons/hi';
import { useState } from 'react';
import { useCardForm } from './hooks/useCardForm';

export default function Payment() {

  const { setHasSubscribed, setCardInfo } = usePlanStore()
  const router = useRouter();

  const { cardData, handleChange } = useCardForm();

  function handlePayment(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setCardInfo(cardData);
    setHasSubscribed(true);
    router.push('/my-plan');
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-xl bg-white p-6 rounded border border-gray-100 shadow-xs">
      {/* Header */}
      <div className="flex justify-between items-center mb-5">
        <button onClick={() => router.back()} className="text-gray-600 hover:text-gray-800">
            <HiArrowLeft size={24} />
            </button>
          <h1 className="text-xl font-semibold mx-auto">Pagamento</h1>
      </div>


      <form
        onSubmit={handlePayment}
        className="rounded-xl space-y-4 w-full max-w-xl mx-auto bg-white"
      >
        {/* Bandeiras */}
        <div className="flex items-center space-x-3">
          <img src="/visa.svg" alt="Visa" className="h-6" />
          <img src="/mastercard.svg" alt="Mastercard" className="h-6" />
        </div>

        {/* Número */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Número<span className="text-red-500">*</span>
          </label>
          <input
            name="number"
            type="text"
            placeholder="0000.0000.0000.0000"
            className="w-full border rounded-md p-2 text-sm"
            value={cardData.number}
            onChange={handleChange}
          />
        </div>

        {/* Nome */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Titular<span className="text-red-500">*</span>
          </label>
          <input
            name="name"
            type="text"
            placeholder="Nome do titular"
            className="w-full border rounded-md p-2 text-sm"
            value={cardData.name}
            onChange={handleChange}
          />
        </div>

        {/* Validade e CVV */}
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">
              Validade<span className="text-red-500">*</span>
            </label>
            <input
              name="validity"
              type="text"
              placeholder="MM/AA"
              className="w-full border rounded-md p-2 text-sm"
              value={cardData.validity}
              onChange={handleChange}
            />
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium mb-1">
              CVV<span className="text-red-500">*</span>
            </label>
            <input
              name="cvv"
              type="text"
              placeholder="123"
              className="w-full border rounded-md p-2 text-sm"
              value={cardData.cvv}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Documento */}
        <div>
          <label className="block text-sm font-medium mb-1">
            CPF/CNPJ<span className="text-red-500">*</span>
          </label>
          <input
            name="document"
            type="text"
            className="w-full border rounded-md p-2 text-sm"
            value={cardData.document}
            onChange={handleChange}
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Email<span className="text-red-500">*</span>
          </label>
          <input
            name="email"
            type="email"
            placeholder="email@example.com"
            className="w-full border rounded-md p-2 text-sm"
            value={cardData.email}
            onChange={handleChange}
          />
        </div>

        {/* Botão */}
        <button
          type="submit"
          className="w-full bg-[#1195FF] hover:bg-[#1194ffd1] text-white py-2 rounded-md text-sm font-semibold transition"
        >
          Realizar pagamento
        </button>
      </form>

      <p className="text-xs text-gray-500 text-center mt-6 max-w-xl mx-auto">
        Sua assinatura será renovada automaticamente mês a mês até o cancelamento.
      </p>
      </div>
    </div>
  )
}
