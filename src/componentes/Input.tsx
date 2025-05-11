'use client';

import { usePasswordToggle } from '@/hooks/usePasswordToggle';
import Image from 'next/image';
import { useState } from 'react';

type InputProps = {
  label?: string;
  type?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hasError?: boolean;
  value?: string;
};

export default function Input({ label, type = 'text', placeholder, onChange, hasError, value }: InputProps) {
  const isPassword = type === 'password';
  const { visible, toggle } = usePasswordToggle();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div>
      <label className="block mb-1 text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        <input
          type={isPassword ? (visible ? 'text' : 'password') : type}
          placeholder={placeholder}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...(value !== undefined && { value })}
          className={`w-full border rounded-md px-3 py-3 ${
            isPassword ? 'pr-10' : ''
          } focus:outline-none focus:ring-2 ${
            hasError && !isFocused
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-400 focus:ring-primary'
          }`}
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
