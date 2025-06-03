import type { Stripe, StripeElements } from '@stripe/stripe-js';
import { usePlanStore } from '@/app/store/usePlanStore';
import { usePayment } from '@/context/PaymentContext';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

interface CardData {
  name: string;
  email: string;
  document: string;
}

interface Errors {
  [key: string]: string;
}

export function useHandlePayment({
  stripe,
  elements,
  cardData,
  errors,
  planPrice,
}: {
  stripe: Stripe | null;
  elements: StripeElements | null;
  cardData: CardData;
  errors: Errors;
  planPrice: number;
}) {
  const router = useRouter();
  const { createPayment } = usePayment();
  const { setCardInfo, setHasSubscribed } = usePlanStore();

  async function handlePayment(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (Object.values(errors).some((error) => error)) {
      toast.warning('Por favor, corrija os erros antes de continuar.');
      return;
    }

    if (!stripe || !elements) {
      toast.error('Stripe não está carregado ainda.');
      return;
    }

    const cardElement = elements.getElement('card');
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

    const last4 = paymentMethod.card?.last4 ?? '';
    const validity = paymentMethod.card
      ? `${paymentMethod.card.exp_month.toString().padStart(2, '0')}/${paymentMethod.card.exp_year.toString().slice(-2)}`
      : '';

    const success = await createPayment({ amount: planPrice, paymentMethodId: paymentMethod.id });

    if (success) {
      setCardInfo({
        number: last4,
        validity,
        name: cardData.name,
        cvv: '',
        document: cardData.document,
        email: cardData.email,
      });

      setHasSubscribed(true);
      router.push('/my-plan');
    }
  }

  return { handlePayment };
}
