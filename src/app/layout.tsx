'use client';

import { AuthProvider } from '@/context/AuthContext';
import { CollaboratorProvider } from '@/context/CollaboratorContext';
import './globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="h-full">
      <body className="h-full overflow-hidden">
        <AuthProvider>
          <CollaboratorProvider>
            {children}
          </CollaboratorProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
