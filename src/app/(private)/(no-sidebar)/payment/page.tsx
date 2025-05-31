'use client';

import PaymentMethodSelector from './ui/PaymentMethodSelector';
import { AnimatePresence, motion } from 'framer-motion';
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

    const hasErrors = Object.values(errors).some((error) => error);
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
      <div className="w-full max-w-xl bg-white p-6 rounded border border-gray-100 shadow-xs relative overflow-hidden">
        <Header />
        <PaymentMethodSelector
          selected={paymentMethod}
          onSelect={setPaymentMethod}
        />

        {/* Animação entre layouts */}
        <div className="relative min-h-[600px]">
          <AnimatePresence mode="wait">
            {paymentMethod === 'card' ? (
              <motion.div
                key="card"
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.3 }}
                className="absolute top-0 left-0 w-full"
              >
                <CardForm
                  cardData={cardData}
                  errors={errors}
                  onChange={handleChange}
                  onSubmit={handlePayment}
                />
              </motion.div>
            ) : (
              <motion.div
                key="pix"
                initial={{ opacity: 0, x: -40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.3 }}
                className="absolute top-0 left-0 w-full"
              >
                <PixPayment />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
