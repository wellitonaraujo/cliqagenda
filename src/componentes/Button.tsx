import { type ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  type?: 'button' | 'submit';
  full?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

export default function Button({
  children,
  type = 'button',
  full,
  disabled,
  onClick,
  variant = 'primary',
}: ButtonProps) {
  const baseClasses =
    'font-medium text-sm px-4 py-4 rounded-md transition w-fit md:py-3';
  const fullClass = full ? 'w-full' : '';
  
  const variantClasses =
    variant === 'primary'
      ? 'bg-[#034D82] text-white hover:opacity-90 disabled:opacity-50'
      : 'bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses} ${fullClass}`}
    >
      {children}
    </button>
  );
}
