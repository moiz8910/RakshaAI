import React from 'react';

interface PrimaryButtonProps {
  label: string;
  onClick: () => void;
}

export function PrimaryButton({ label, onClick }: PrimaryButtonProps) {
  return (
    <button
      onClick={onClick}
      className="bg-[#132541] hover:bg-[#1c365e] text-white font-medium py-3.5 px-8 rounded-lg transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg w-full max-w-[280px]"
    >
      {label}
    </button>
  );
}
