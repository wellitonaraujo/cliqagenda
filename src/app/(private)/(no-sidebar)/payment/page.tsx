'use client';

import { useState } from 'react';
import { usePlanStore } from '@/app/store/usePlanStore';
import { useCardForm } from './hooks/useCardForm';
import { HiArrowLeft } from 'react-icons/hi';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function Payment() {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'pix'>('card');
  const { cardData, handleChange, errors } = useCardForm();
  const { setHasSubscribed, setCardInfo } = usePlanStore();
  const router = useRouter();

  function handlePayment(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const hasErrors = Object.values(errors).some(error => error);

    if (hasErrors) {
      toast.warning('Por favor, corrija os erros antes de continuar.');
      return;
    }

    setCardInfo(cardData);
    toast.success('Pagamento realizado com sucesso!');
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

        {/* Seletor de método */}
        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setPaymentMethod('card')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              paymentMethod === 'card' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            Cartão
          </button>
          <button
            onClick={() => setPaymentMethod('pix')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition ${
              paymentMethod === 'pix' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            Pix
          </button>
        </div>

        {/* Formulário de cartão */}
        {paymentMethod === 'card' && (
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
                <p className={`text-xs mt-1 min-h-[1rem] ${errors.validity ? 'text-red-500' : 'text-transparent'}`}>
                  {errors.validity ?? 'Validade inválida'}
                </p>
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
              <p className={`text-xs mt-1 min-h-[1rem] ${errors.document ? 'text-red-500' : 'text-transparent'}`}>
                {errors.document ?? 'CPF ou CNPJ inválido'}
              </p>
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
        )}

        {/* Tela de Pix */}
        {paymentMethod === 'pix' && (
          <div className="text-center py-12">
            <p className="mb-4 text-gray-700">Escaneie o QR Code abaixo para finalizar o pagamento:</p>
            <img
              src="/pix-qr-code.png"
              alt="QR Code Pix"
              className="mx-auto h-48 w-48 border border-gray-200 p-2 rounded-md"
            />
            <p className="mt-4 text-sm text-gray-500">Após o pagamento, você será redirecionado automaticamente.</p>
          </div>
        )}
      </div>
    </div>
  );
}
