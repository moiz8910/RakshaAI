import React, { useEffect, useState } from 'react';
import { SidebarLayout } from '../layouts/SidebarLayout';
import { CaseFilters } from '../components/CaseFilters';
import { CaseCard, CaseData } from '../components/CaseCard';
import { Loader2 } from 'lucide-react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

export default function CaseQueue() {
  const [cases, setCases] = useState<CaseData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const response = await api.get('/api/cases');
        setCases(response.data.cases);
      } catch (err) {
        console.error('Failed to fetch cases', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchCases();
  }, []);

  const handleCardClick = (id: string) => {
    // Navigate to individual case later
    console.log(`Navigating to case ${id}`);
  };

  return (
    <SidebarLayout>
      <div className="w-full max-w-5xl mx-auto">
        <CaseFilters />
        
        {loading ? (
          <div className="flex flex-col items-center justify-center w-full h-64 gap-4">
            <Loader2 className="animate-spin text-[#0EA5E9]" size={48} />
            <p className="text-gray-500 font-medium">Loading cases...</p>
          </div>
        ) : error ? (
          <div className="bg-white p-8 rounded-xl shadow-sm border border-red-100 flex flex-col items-center w-full text-center">
            <h2 className="text-xl font-bold text-red-600 mb-2">Error Loading Cases</h2>
            <p className="text-gray-500">We couldn't fetch the case queue right now. Please try again.</p>
          </div>
        ) : (
          <div className="flex flex-col">
            {cases.map((caseItem) => (
              <CaseCard 
                key={caseItem.id} 
                data={caseItem} 
                onClick={() => handleCardClick(caseItem.id)}
              />
            ))}
          </div>
        )}
      </div>
    </SidebarLayout>
  );
}
