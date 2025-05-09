'use client';

import { useHeader } from '@/context/HeaderContext';
import { useSidebar } from '@/context/SidebarContext';
import { HiMenu } from 'react-icons/hi';

export default function Header() {
  const { headerTitle } = useHeader();
  const { toggleSidebar } = useSidebar();

  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex items-center gap-2">
        {/* Exibe o botão de toggle apenas em telas pequenas */}
        <button
          className="text-xl text-gray-700 md:hidden"
          onClick={toggleSidebar}
        >
          <HiMenu />
        </button>

        {/* Exibe o título do header */}
        <h2 className="text-lg font-semibold text-gray-700">{headerTitle}</h2>
      </div>
    </div>
  );
}
