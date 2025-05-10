'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const HeaderContext = createContext<{ headerTitle: string }>({ headerTitle: '' });

const menuItems = [
  { label: 'Meu Negócio', path: '/my-business' },
  { label: 'Atendimentos', path: '/home' },
  { label: 'Serviços', path: '/services' },
  { label: 'Combos', path: '/combos' },
  { label: 'Clientes', path: '/customers' },
  { label: 'Colaboradores', path: '/collaborators' },
  { label: 'Fluxo de caixa', path: '/cash-flow' },
  { label: 'Meu Plano', path: '/my-plan' },
];

export function HeaderProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [headerTitle, setHeaderTitle] = useState('');

  useEffect(() => {
    const found = menuItems.find(item => pathname.startsWith(item.path));
    setHeaderTitle(found?.label ?? '');
  }, [pathname]);

  return (
    <HeaderContext.Provider value={{ headerTitle }}>
      {children}
    </HeaderContext.Provider>
  );
}

export const useHeader = () => useContext(HeaderContext);
