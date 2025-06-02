'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { SidebarProvider } from '@/context/SidebarContext';
import { HeaderProvider } from '@/context/HeaderContext';
import Sidebar from '@/componentes/Sidebar';
import Spinner from '@/componentes/Spinner';

export default function PrivateLayout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();


  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <Spinner message="Carregando..." />
      </div>
    );
  }

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
