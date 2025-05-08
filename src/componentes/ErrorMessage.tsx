'use client';

type ErrorMessageProps = {
  message?: string;
};

export default function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className="relative">
      <p className={`text-xs text-red-500 transition-opacity duration-200 absolute top-2 left-0 ${message ? 'opacity-100' : 'opacity-0'}`}>
        {message || 'placeholder'}
      </p>
    </div>
  );
}
