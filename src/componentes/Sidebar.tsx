'use client';

import { useSidebar } from '@/context/SidebarContext';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';

const menuItems = [
  { label: 'Meu Negócio', icon: 'office.svg', path: '/meu-negocio' },
  { label: 'Atendimentos', icon: 'date-fill.svg', path: '/home' },
  { label: 'Serviços', icon: 'list-filled.svg', path: '/servicos' },
  { label: 'Combos', icon: 'package-open.svg', path: '/combos' },
  { label: 'Clientes', icon: 'users-solid.svg', path: '/customers' },
  { label: 'Colaboradores', icon: 'users-config.svg', path: '/colaboradores' },
  { label: 'Fluxo de caixa', icon: 'payment.svg', path: '/fluxo' },
  { label: 'Meu Plano', icon: 'wallet-money.svg', path: '/plano' },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { isCollapsed, toggleSidebar } = useSidebar();

  return (
    <>
      {!isCollapsed && (
        <div
          className="fixed inset-0 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}
      <div
        className={clsx(
          'fixed top-0 left-0 h-full z-50 bg-white shadow-md transition-all duration-300 transform',
          'flex flex-col justify-between',
          {
            'translate-x-0': !isCollapsed,
            '-translate-x-full': isCollapsed,
            'md:translate-x-0': true,
            'md:w-64': !isCollapsed,
            'md:w-20': isCollapsed,
            'md:relative': true,
            'md:flex': true,
            'md:min-h-screen': true,
          }
        )}
      >
        <div>
          {/* Close button (only mobile) */}
          <button
            onClick={toggleSidebar}
            className="p-3 text-xl text-gray-700 md:hidden"
          >
            X
          </button>

          {/* Logo/title */}
          <h1
            className={clsx(
              'text-2xl font-bold text-[#7567E4] px-6 py-5 transition-opacity duration-300',
              {
                'opacity-0 w-0 overflow-hidden': isCollapsed,
                'opacity-100 w-auto': !isCollapsed,
              }
            )}
          >
            agendei99
          </h1>

          {/* Menu */}
          <nav className="flex flex-col gap-1">
            {menuItems.map(({ label, icon, path }) => {
              const isActive = pathname === path;

              return (
                <Link
                  key={path}
                  href={path}
                  className={clsx(
                    'flex items-center px-6 py-3 text-sm font-medium transition-all gap-3',
                    {
                      'bg-[#F4F1FD] border-r-4 border-[#7567E4] text-[#7567E4]': isActive,
                      'text-gray-800 hover:bg-gray-50': !isActive,
                      'justify-center': isCollapsed,
                      'justify-start': !isCollapsed,
                    }
                  )}
                  onClick={() => {
                    if (window.innerWidth < 768) toggleSidebar();
                  }}
                >
                  <Image src={icon} alt={label} width={20} height={20} />
                  {!isCollapsed && <span className="whitespace-nowrap">{label}</span>}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}
