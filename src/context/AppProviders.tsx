'use client';

import { CollaboratorProvider } from '@/context/CollaboratorContext';
import { CustomerProvider } from '@/context/CustomersContext';
import { ServiceProvider } from '@/context/ServiceContext';
import { AuthProvider } from '@/context/AuthContext';
import { ComboProvider } from '@/context/ComboContext';
import { AppointmentProvider } from './AppointmentsProvider';
import { BusinessProvider } from './BusinessContext';

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
};
