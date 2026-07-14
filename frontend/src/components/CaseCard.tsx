import React from 'react';

export interface CaseData {
  id: string;
  claimantName: string;
  policyNumber: string;
  summary: string;
  amount: string;
  slaDay: number;
  slaTotal: number;
  riskScore: number;
  priorityColor: string; // Hex color for the left strip
  slaBgColor: string; // Hex color for SLA badge bg
  slaTextColor: string; // Hex color for SLA badge text
  riskColor: string; // Hex color for Risk Score text
}

interface CaseCardProps {
  data: CaseData;
  onClick?: () => void;
}

export function CaseCard({ data, onClick }: CaseCardProps) {
  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl shadow-[0_2px_12px_-4px_rgba(0,0,0,0.08)] border border-gray-100 p-5 flex items-center justify-between mb-4 cursor-pointer hover:shadow-md transition-shadow relative overflow-hidden group"
    >
      {/* Priority Strip */}
      <div 
        className="absolute left-0 top-0 bottom-0 w-[5px]"
        style={{ backgroundColor: data.priorityColor }}
      />

      {/* Left Content */}
      <div className="pl-4 flex flex-col justify-center">
        <div className="flex items-baseline gap-3 mb-1">
          <h3 className="text-[17px] font-medium text-gray-900">{data.claimantName}</h3>
          <span className="text-[13px] text-gray-400 font-medium tracking-wide">{data.policyNumber}</span>
        </div>
        <p className="text-[14px] text-gray-500 font-medium">{data.summary}</p>
      </div>

      {/* Right Content */}
      <div className="flex items-center gap-6">
        <span className="text-[15px] font-medium text-gray-600">
          Rs {data.amount}
        </span>
        
        <div 
          className="px-3 py-1 rounded-md text-[13px] font-semibold tracking-wide"
          style={{ backgroundColor: data.slaBgColor, color: data.slaTextColor }}
        >
          Day {data.slaDay}/{data.slaTotal}
        </div>

        <div 
          className="text-[28px] font-bold w-12 text-right"
          style={{ color: data.riskColor }}
        >
          {data.riskScore}
        </div>
      </div>
    </div>
  );
}
