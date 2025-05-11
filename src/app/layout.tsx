'use client';

import { CollaboratorProvider } from '@/context/CollaboratorContext';
import { CustomerProvider } from '@/context/CustomersContext';
import { ServiceProvider } from '@/context/ServiceContext';
import { AuthProvider } from '@/context/AuthContext';
import './globals.css';
import { ComboProvider } from '@/context/ComboContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="h-full">
      <body className="h-full overflow-hidden">
        <AuthProvider>
          <ServiceProvider>
            <CustomerProvider>
              <ComboProvider>
              <CollaboratorProvider>
                {children}
              </CollaboratorProvider>
              </ComboProvider>
            </CustomerProvider>
          </ServiceProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
