'use client';

import { useElements, useStripe } from '@stripe/react-stripe-js';
import PaymentMethodSelector from './ui/PaymentMethodSelector';
import { useHandlePayment } from './hooks/useHandlePayment';
import { usePlanStore } from '@/app/store/usePlanStore';
import { AnimatePresence, motion } from 'framer-motion';
import { useCardForm } from './hooks/useCardForm';
import PixPayment from './ui/PixPayment';
import CardForm from './ui/CardForm';
import { useEffect, useState } from 'react';
import Header from './ui/Header';
import { usePayment } from '@/context/PaymentContext';

export default function Payment() {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'pix'>('card');
  const { cardData, handleChange, errors } = useCardForm();

  const planPrice = usePlanStore((state) => state.getPlanPrice());
  const { setAmount } = usePayment();

  const stripe = useStripe();
  const elements = useElements();

  const { handlePayment } = useHandlePayment({
    stripe,
    elements,
    cardData,
    errors,
    planPrice,
  });

  useEffect(() => {
    if (planPrice > 0) {
      setAmount(planPrice);
    }
  }, [planPrice, setAmount]);

  return (
    <div className="flex justify-center items-start min-h-screen bg-white py-10">
      <div className="w-full max-w-2xl px-6 py-8 bg-white rounded-xl shadow-md border border-gray-200">
        <Header />
        <PaymentMethodSelector selected={paymentMethod} onSelect={setPaymentMethod} />

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
                  amount={planPrice}
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
