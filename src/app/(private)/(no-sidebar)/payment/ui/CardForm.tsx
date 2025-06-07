'use client';

import { CardElement } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import { useFormatCurrency } from '@/hooks/useFormatCurrency';
import { InputField } from '@/componentes/InputField';
import { usePlanStore } from '@/app/store/usePlanStore';

type Props = {
  cardData: {
    name: string;
    document: string;
    email: string;
  };
  errors: Record<string, string>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  amount: number;
};

export default function CardForm({ cardData, errors, onChange, onSubmit, amount }: Props) {
  const [hasMounted, setHasMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formatCurrency = useFormatCurrency();
    const {
    setPlan,
  } = usePlanStore();

  useEffect(() => {
    setHasMounted(true);
  }, []);


  useEffect(() => {
    setPlan('business');
  }, [setPlan]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSubmit(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!hasMounted) return null;

  return (
    <form onSubmit={handleSubmit} className="rounded-xl space-y-4 w-full max-w-xl mx-auto bg-white p-6">
      <div className="text-center text-lg font-semibold mb-4">
        Valor a pagar: <span className="text-blue-600">{formatCurrency(amount)}</span>
      </div>

      <div className="flex items-center space-x-3">
        <img src="/visa.svg" alt="Visa" className="h-6" />
        <img src="/mastercard.svg" alt="Mastercard" className="h-6" />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Número do cartão<span className="text-red-500">*</span>
        </label>
        <div className="border rounded-md p-2 text-sm min-h-[40px]">
          <CardElement options={{ hidePostalCode: true }} />
        </div>
      </div>

      <InputField
        label="Titular"
        name="name"
        value={cardData.name}
        onChange={onChange}
        placeholder="Nome do titular"
        error={errors.name}
      />

      <InputField
        label="CPF/CNPJ"
        name="document"
        value={cardData.document}
        onChange={onChange}
        error={errors.document}
      />

      <InputField
        label="Email"
        name="email"
        value={cardData.email}
        onChange={onChange}
        placeholder="email@example.com"
        error={errors.email}
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className={`w-full flex justify-center items-center gap-2 ${
          isSubmitting ? 'bg-blue-400' : 'bg-[#1195FF] hover:bg-[#1194ffd1]'
        } text-white py-2 rounded-md text-sm font-semibold transition`}
      >
        {isSubmitting ? (
          <>
            <Spinner />
            Processando...
          </>
        ) : (
          'Realizar pagamento'
        )}
      </button>

      <p className="text-xs text-gray-500 text-center mt-6 max-w-xl mx-auto">
        Sua assinatura será renovada automaticamente mês a mês até o cancelamento.
      </p>
    </form>
  );
}

function Spinner() {
  return (
    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
  );
}
