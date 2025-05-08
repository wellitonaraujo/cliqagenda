'use client'

import { usePasswordToggle } from '@/hooks/usePasswordToggle';
import Image from 'next/image';

type Props = {
  label: string
  placeholder?: string
}

export default function PasswordInput({ label, placeholder }: Props) {
  const { visible, toggle } = usePasswordToggle()

  return (
    <div>
      <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        <input
          required
          type={visible ? 'text' : 'password'}
          placeholder={placeholder}
          className="w-full border border-gray-300 rounded-md px-3 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-primary"
        />
        <span
          onClick={toggle}
          className="absolute right-4 top-5 cursor-pointer text-gray-500"
        >
          <Image src="/eyeon.svg" alt="Ilustração" width={18} height={18} />
        </span>
      </div>
    </div>
  )
}
