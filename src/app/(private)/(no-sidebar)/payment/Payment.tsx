'use client';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Payment from './Payment';

const stripePromise = loadStripe('pk_test_51RVcOEB9iO9BmXUum1s8XnwFiyKcbjYSwqD1cpr3P9vZlBEXbKX1Y2rIvDdKHVRWywHwSOWmZviGPHKGnaTDqNXl00XKA9nwsB');

export default function PaymentPage() {
  return (
    <Elements stripe={stripePromise}>
      <Payment />
    </Elements>
  );
}
