'use client';

import { CollaboratorProvider } from '@/context/CollaboratorContext';
import { CustomerProvider } from '@/context/CustomersContext';
import { ServiceProvider } from '@/context/ServiceContext';
import { AuthProvider } from '@/context/AuthContext';
import { ComboProvider } from '@/context/ComboContext';
import { HorariosProvider } from '@/context/HoursProvider';
import { AppointmentsProvider } from '@/context/AppointmentsProvider';

export const AppProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <AppointmentsProvider>
        <HorariosProvider>
          <ServiceProvider>
            <CustomerProvider>
              <ComboProvider>
                <CollaboratorProvider>{children}</CollaboratorProvider>
              </ComboProvider>
            </CustomerProvider>
          </ServiceProvider>
        </HorariosProvider>
      </AppointmentsProvider>
    </AuthProvider>
  );
};
