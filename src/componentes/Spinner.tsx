import React from 'react';

interface SpinnerProps {
  message?: string;
  color?: string;
  className?: string;
}

const Spinner: React.FC<SpinnerProps> = ({
  message = 'Carregando...',
  color = '#00AEEF',
  className = '',
}) => {
  return (
    <div
      className={`flex flex-col items-center justify-center h-screen space-y-6 bg-white ${className}`}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <svg
        className="animate-spin h-16 w-16"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        aria-label={message}
        style={{ color }}
      >
        <circle
          className="opacity-20"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-80"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
      </svg>
      <p
        className="text-xl font-semibold tracking-wide"
        style={{ color }}
      >
        {message}
      </p>
    </div>
  );
};

export default Spinner;
