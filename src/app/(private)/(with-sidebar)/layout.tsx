'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { SidebarProvider } from '@/context/SidebarContext';
import { HeaderProvider } from '@/context/HeaderContext';
import Sidebar from '@/componentes/Sidebar';

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isLoading, isAuthenticated]);

  if (isLoading) return <div className="p-4">Carregando...</div>;
  if (!isAuthenticated) return null;

  return (
    <SidebarProvider>
      <HeaderProvider>
        <div className="flex h-full">
          <Sidebar />
          <div className="flex flex-col flex-1 overflow-y-auto">
            <main>{children}</main>
          </div>
        </div>
      </HeaderProvider>
    </SidebarProvider>
  );
}
