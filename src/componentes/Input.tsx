'use client';

import { usePasswordToggle } from '@/hooks/usePasswordToggle';
import Image from 'next/image';

type InputProps = {
  label: string;
  type?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Input({ label, type = 'text', placeholder, onChange }: InputProps) {
  const isPassword = type === 'password';
  const { visible, toggle } = usePasswordToggle();

  return (
    <div>
      <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        <input
          required
          type={isPassword ? (visible ? 'text' : 'password') : type}
          placeholder={placeholder}
          onChange={onChange}
          className={`w-full border border-gray-300 rounded-md px-3 py-3 ${
            isPassword ? 'pr-10' : ''
          } focus:outline-none focus:ring-2 focus:ring-primary`}
        />

        {isPassword && (
          <span
            onClick={toggle}
            className="absolute right-4 top-3 cursor-pointer text-gray-500"
          >
            <Image
              src={visible ? '/eye-on.svg' : '/eye-off.svg'} 
              alt="Alternar visibilidade"
              width={26}
              height={26}
            />
          </span>
        )}
        
      </div>
    </div>
  );
}
