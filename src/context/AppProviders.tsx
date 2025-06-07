'use client';

import { CollaboratorProvider } from '@/context/CollaboratorContext';
import { CustomerProvider } from '@/context/CustomersContext';
import { ServiceProvider } from '@/context/ServiceContext';
import { AuthProvider } from '@/context/AuthContext';
import { ComboProvider } from '@/context/ComboContext';
import { AppointmentProvider } from './AppointmentsProvider';
import { BusinessProvider } from './BusinessContext';
import { PaymentProvider } from '@/context/PaymentContext';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
);

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <Elements stripe={stripePromise}>
    <AuthProvider>
      <PaymentProvider>
        <AppointmentProvider>
          <BusinessProvider>
            <ServiceProvider>
              <CustomerProvider>
                <ComboProvider>
                  <CollaboratorProvider>{children}</CollaboratorProvider>
                </ComboProvider>
              </CustomerProvider>
            </ServiceProvider>
          </BusinessProvider>
        </AppointmentProvider>
      </PaymentProvider>
    </AuthProvider>
    </Elements>
  );
};
