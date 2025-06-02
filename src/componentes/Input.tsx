'use client';

import { usePasswordToggle } from '@/hooks/usePasswordToggle';
import Image from 'next/image';
import { useState } from 'react';

type InputProps = {
  name?: string;
  label?: string;
  type?: string;
  placeholder?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  hasError?: boolean;
  value?: string | number;
};

export default function Input({ 
  name,
  label, 
  type = 'text', 
  placeholder, 
  onChange, 
  onBlur,
  onFocus,
  hasError, 
  value 
}: InputProps) {
  const isPassword = type === 'password';
  const { visible, toggle } = usePasswordToggle();
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };

  return (
    <div>
      {label && <label className="block mb-1 text-sm font-medium text-[#252525]">{label}</label>}
      <div className="relative">
        <input
          name={name}
          type={isPassword ? (visible ? 'text' : 'password') : type}
          placeholder={placeholder}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...(value !== undefined && { value })}
          className={`w-full border rounded-md px-3 py-3 text-[#252525] ${
            isPassword ? 'pr-10' : ''
          } focus:outline-none focus:ring-1 ${
            hasError && !isFocused
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:border-[#1195FF] focus:ring-[#1195FF]'
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
