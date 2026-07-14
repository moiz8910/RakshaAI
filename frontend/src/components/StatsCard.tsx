import React from 'react';

interface StatsCardProps {
  number: number;
  label: string;
  numberColorClass: string;
}

export function StatsCard({ number, label, numberColorClass }: StatsCardProps) {
  return (
    <div className="bg-[#FAF9F6] rounded-xl p-8 flex flex-col items-center justify-center shadow-[0_4px_20px_-10px_rgba(0,0,0,0.1)] border border-[#F0EFEA] w-full transition-transform hover:scale-[1.02]">
      <span className={`text-[42px] font-bold mb-2 ${numberColorClass}`}>
        {number}
      </span>
      <span className="text-gray-500 font-medium text-sm tracking-wide">
        {label}
      </span>
    </div>
  );
}
