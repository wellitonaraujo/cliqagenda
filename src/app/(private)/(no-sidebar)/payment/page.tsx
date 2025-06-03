'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { AnimatePresence, motion } from 'framer-motion';

import { usePlanStore } from '@/app/store/usePlanStore';
import { useCardForm } from './hooks/useCardForm';
import { usePayment } from '@/context/PaymentContext';

import PaymentMethodSelector from './ui/PaymentMethodSelector';
import CardForm from './ui/CardForm';
import PixPayment from './ui/PixPayment';
import Header from './ui/Header';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';

export default function Payment() {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'pix'>('card');
  const { cardData, handleChange, errors } = useCardForm();
  const { createPayment, setAmount } = usePayment();
  const { setHasSubscribed, setCardInfo } = usePlanStore();
  const router = useRouter();
  
  const planPrice = usePlanStore((state) => state.getPlanPrice());

  const stripe = useStripe();
  const elements = useElements();

  const setPlan = usePlanStore((state) => state.setPlan);

  useEffect(() => {
    setPlan('business');
  }, [setPlan]);

  useEffect(() => {
    if (planPrice) {
      setAmount(planPrice);
    }
  }, [planPrice, setAmount]);

  async function handlePayment(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const hasErrors = Object.values(errors).some((error) => error);
    if (hasErrors) {
      toast.warning('Por favor, corrija os erros antes de continuar.');
      return;
    }

    if (!stripe || !elements) {
      toast.error('Stripe não está carregado ainda.');
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      toast.error('Erro ao obter dados do cartão.');
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: {
        name: cardData.name,
        email: cardData.email,
      },
    });

    if (error) {
      toast.error(error.message);
      return;
    }
    
    const success = await createPayment({ amount: planPrice, paymentMethodId: paymentMethod.id });

    if (success) {
      setCardInfo(cardData);
      setHasSubscribed(true);
      router.push('/my-plan');
    }
  }

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
