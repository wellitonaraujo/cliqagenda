'use client';

import { HiArrowLeft } from 'react-icons/hi';
import { useRouter } from 'next/navigation';

interface Props {
  title: string;
  onBack?: () => void;
}

export default function HeaderWithBackButton({ title, onBack }: Props) {
  const router = useRouter();

  return (
    <div className="flex justify-between items-center mb-8">
      <button
        onClick={onBack || (() => router.back())}
        className="text-gray-600 hover:text-gray-800"
      >
        <HiArrowLeft size={24} />
      </button>
      <h1 className="text-base font-semibold mx-auto">{title}</h1>
      <div style={{ width: 24 }} />
    </div>
  );
}
