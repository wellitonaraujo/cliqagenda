// src/context/HeaderContext.tsx
'use client';

import { usePathname } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';

const HeaderContext = createContext<{ headerTitle: string }>({ headerTitle: '' });

const menuItems = [
  { label: 'Meu Negócio', path: '/meu-negocio' },
  { label: 'Atendimentos', path: '/home' },
  { label: 'Serviços', path: '/servicos' },
  { label: 'Combos', path: '/combos' },
  { label: 'Clientes', path: '/clientes' },
  { label: 'Colaboradores', path: '/colaboradores' },
  { label: 'Fluxo de caixa', path: '/fluxo' },
  { label: 'Meu Plano', path: '/plano' },
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
