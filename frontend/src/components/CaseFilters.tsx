import React from 'react';

export function CaseFilters() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full mb-6 gap-4">
      <div className="flex flex-wrap items-center gap-3">
        {/* Risk Filter */}
        <div className="bg-[#FAF9F6] border border-[#E5E3DB] px-4 py-2 rounded-lg text-sm font-medium text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors">
          Risk: All
        </div>
        
        {/* Branch Filter */}
        <div className="bg-[#FAF9F6] border border-[#E5E3DB] px-4 py-2 rounded-lg text-sm font-medium text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors">
          Branch: All
        </div>

        {/* SLA Status */}
        <div className="bg-[#FAF9F6] border border-[#E5E3DB] px-4 py-2 rounded-lg text-sm font-medium text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors">
          SLA status: All
        </div>

        {/* Assigned Toggle */}
        <button className="bg-[#132541] text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-[#1c365e] transition-colors shadow-sm">
          Assigned to me
        </button>
      </div>

      <div className="text-sm text-gray-500 font-medium">
        23 cases · sorted by risk score
      </div>
    </div>
  );
}
