'use client';

import { HiChevronRight, HiMenu, HiLogout } from 'react-icons/hi';
import { useSidebar } from '@/context/SidebarContext';
import { useAuth } from '@/context/AuthContext';
import { HiChevronLeft } from 'react-icons/hi';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import clsx from 'clsx';

export default function Sidebar() {
  const pathname = usePathname();
  const { logout, empresa } = useAuth();

  const menuItems = [
    { label: empresa?.nome ?? 'Meu Negócio', icon: 'home.svg', path: '/my-business' },
    { label: 'Atendimentos', icon: 'date-fill.svg', path: '/home' },
    { label: 'Serviços', icon: 'service.svg', path: '/services' },
    { label: 'Combos', icon: 'package-open.svg', path: '/combos' },
    { label: 'Clientes', icon: 'users-solid.svg', path: '/customers' },
    { label: 'Colaboradores', icon: 'users-config.svg', path: '/collaborators' },
    { label: 'Fluxo de caixa', icon: 'payment.svg', path: '/cash-flow' },
    { label: 'Meu Plano', icon: 'wallet-money.svg', path: '/my-plan' },
  ];

  const { isCollapsed, toggleSidebar } = useSidebar();

  return (
    <>
      {!isCollapsed && (
        <div className="fixed inset-0 z-50 md:hidden" onClick={toggleSidebar} />
      )}
      <div
        className={clsx(
          'fixed top-0 left-0 h-full z-50 bg-white shadow-md transition-all duration-300 transform',
          'flex flex-col justify-between',
          {
            'translate-x-0': !isCollapsed,
            '-translate-x-full': isCollapsed,
            'md:translate-x-0': true,
            'w-64': !isCollapsed,
            'md:w-64': !isCollapsed,
            'md:w-20': isCollapsed,
            'md:relative': true,
            'md:flex': true,
            'md:min-h-screen': true,
          }
        )}
      >
        <div>
          <div className="px-7 py-5 flex items-center justify-between">
            {isCollapsed ? (
              <button
                onClick={toggleSidebar}
                className="text-2xl font-bold text-[#5c5c5c]"
              >
                <HiMenu color='#034D82' />
              </button>
            ) : (
              <div className="flex items-center justify-between w-full">
                <h1 className="text-2xl font-bold">
                  <span className="text-[#034D82]">Cliq</span>
                  <span className="text-[#1195FF]">Agenda</span>
                </h1>

                <button
                  onClick={toggleSidebar}
                  className="text-[#034D82] text-xl md:block hidden"
                >
                  <HiChevronLeft color='#034D82' />
                </button>

                <button
                  onClick={toggleSidebar}
                  className="absolute right-4 text-[#034D82] text-xl md:hidden block"
                >
                  {isCollapsed ? <HiChevronRight color='#034D82' /> : <HiChevronLeft color='#034D82' />}
                </button>
              </div>
            )}
          </div>

          <nav className="flex flex-col gap-1">
            {menuItems.map(({ label, icon, path }) => {
              const isActive = pathname === path;
              isActive
                ? icon.replace('.svg', '-ative.svg')
                : icon;
              return (
                <Link
                  key={path}
                  href={path}
                  className={clsx(
                    'flex items-center px-6 py-3 text-sm font-medium transition-all gap-3',
                    {
                      'bg-[#E9F5FE] border-r-4 border-[#1195FF] text-[#1195FF]': isActive,
                      'text-gray-800 hover:bg-gray-50': !isActive,
                      'justify-center': isCollapsed,
                      'justify-start': !isCollapsed,
                    }
                  )}
                  onClick={() => {
                    if (window.innerWidth < 768) toggleSidebar();
                  }}
                >
               <img
                  src={`/${isActive ? icon.replace('.svg', '-ative.svg') : icon}`}
                  alt={label}
                  width={24}
                  height={24}
                />


                      {!isCollapsed && (
                   <span
                      className={clsx(
                        'text-sm font-medium whitespace-nowrap',
                        isActive ? 'text-[#1195FF]' : 'text-[#034D82]'
                      )}
                    >
                      {label}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="p-4">
          <button
            onClick={logout}
            className={clsx(
              'flex items-center gap-2 text-sm font-medium text-[#034D82] hover:text-red-500',
              {
                'justify-center w-full': isCollapsed,
              }
            )}
          >
            <HiLogout size={24} />
            {!isCollapsed && <span>Sair</span>}
          </button>
        </div>
      </div>
    </>
  );
}
