import React from 'react';

interface EmptyStateProps {
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}

export default function EmptyState({ title, subtitle, children }: EmptyStateProps) {
  return (
    <div className="flex flex-col justify-center items-center flex-1 text-center px-4 py-8">
      <p className="text-lg font-semibold text-gray-700">{title}</p>
      {subtitle && <p className="mt-2 text-md text-gray-500">{subtitle}</p>}
      {children}
    </div>
  );
}
