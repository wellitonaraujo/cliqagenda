import { type ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  type?: 'button' | 'submit';
  full?: boolean;
  disabled?: boolean;
}

export default function Button({ children, type = 'button', full, disabled }: ButtonProps) {
  return (
    <button
      type={type}
      style={{ backgroundColor: "#1195FF" }}
      className={`text-white font-medium text-sm px-4 py-2 rounded-md hover:opacity-90 transition ${
        full ? 'w-full' : ''
      }`}
    >
      {children}
    </button>
  );
}