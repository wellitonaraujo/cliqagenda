'use client';

import { createContext, useContext, ReactNode, useState } from 'react';
import { usePlanStore } from '@/app/store/usePlanStore';
import { toast } from 'react-toastify';
import api from '@/services/api';

interface CardDetails {
  last4: string;
  expMonth: number;
  expYear: number;
}

interface PaymentIntent {
  id: number;
  status: string;
}

interface PaymentData {
  amount: number;
  paymentMethodId: string;
}

interface PaymentContextData {
  isLoading: boolean;
  amount: number;
  setAmount: (amount: number) => void;
  cardDetails: CardDetails | null;
  paymentIntent: PaymentIntent | null;
  createPayment: (data: PaymentData) => Promise<boolean>;
}

const PaymentContext = createContext({} as PaymentContextData);

export const PaymentProvider = ({ children }: { children: ReactNode }) => {  
  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const [cardDetails, setCardDetails] = useState<CardDetails | null>(null);
  const [paymentIntent, setPaymentIntent] = useState<PaymentIntent | null>(null);

  const createPayment = async ({ paymentMethodId }: { paymentMethodId: string }) => {
    setIsLoading(true);

    try {
      const response = await api.post('/stripe/charge', {
        amount,
        paymentMethodId,
      });

      if (response.status === 200 || response.status === 201) {
        const { cardDetails: card, paymentIntent: intent } = response.data;

        setCardDetails(card);
        setPaymentIntent(intent);

        usePlanStore.getState().setCardInfo({
          number: card.last4,
          name: '',
          validity: `${card.expMonth.toString().padStart(2, '0')}/${card.expYear.toString().slice(-2)}`,
          cvv: '',
          document: '',
          email: '',
        });

        toast.success('Pagamento realizado com sucesso!');
        return true;
      } else {
        console.error('Erro no pagamento: status inesperado', response.status, response.data);
        toast.error(response.data?.message || 'Erro inesperado ao processar o pagamento.');
        return false;
      }
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        error?.message ||
        'Erro inesperado no pagamento.';

      console.error('Erro no try/catch:', error);
      toast.error(message);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PaymentContext.Provider
      value={{
        isLoading,
        amount,
        setAmount,
        cardDetails,
        paymentIntent,
        createPayment,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

export const usePayment = () => useContext(PaymentContext);
