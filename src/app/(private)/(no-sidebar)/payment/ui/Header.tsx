'use client';

import { HiArrowLeft } from 'react-icons/hi';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  return (
    <div className="flex justify-between items-center mb-5">
      <button onClick={() => router.back()} className="text-gray-600 hover:text-gray-800">
        <HiArrowLeft size={24} />
      </button>
      <h1 className="text-xl font-semibold mx-auto">Pagamento</h1>
    </div>
  );
}
