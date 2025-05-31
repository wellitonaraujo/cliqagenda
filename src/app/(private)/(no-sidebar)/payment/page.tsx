'use client';

import PaymentMethodSelector from './ui/PaymentMethodSelector';
import { usePlanStore } from '@/app/store/usePlanStore';
import { useCardForm } from './hooks/useCardForm';
import { useRouter } from 'next/navigation';
import PixPayment from './ui/PixPayment';
import { toast } from 'react-toastify';
import CardForm from './ui/CardForm';
import { useState } from 'react';
import Header from './ui/Header';

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
        <Header />
        <PaymentMethodSelector
          selected={paymentMethod}
          onSelect={setPaymentMethod}
        />
        {paymentMethod === 'card' ? (
          <CardForm
            cardData={cardData}
            errors={errors}
            onChange={handleChange}
            onSubmit={handlePayment}
          />
        ) : (
          <PixPayment />
        )}
      </div>
    </div>
  );
}
