// src/app/layout.tsx
'use client';

import './globals.css';
import { SidebarProvider } from '@/context/SidebarContext';
import { HeaderProvider } from '@/context/HeaderContext';
import Sidebar from '@/componentes/Sidebar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="h-full">
      <body className="h-full overflow-hidden">
        <SidebarProvider>
          <HeaderProvider>
            <div className="flex h-full">
              <Sidebar />
              <main className="flex-1 overflow-y-auto">
                {children}
              </main>
            </div>
          </HeaderProvider>
        </SidebarProvider>
      </body>
    </html>
  );
}
