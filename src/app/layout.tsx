// src/app/layout.tsx
'use client';

import './globals.css';
import { SidebarProvider } from '@/context/SidebarContext';
import { HeaderProvider } from '@/context/HeaderContext';
import Sidebar from '@/componentes/Sidebar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" >
      <body>
        <SidebarProvider>
          <HeaderProvider>
            <div className="flex">
              <Sidebar />
              <main className="flex-1">{children}</main>
            </div>
          </HeaderProvider>
        </SidebarProvider>
      </body>
    </html>
  );
}
