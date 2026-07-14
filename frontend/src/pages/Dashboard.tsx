import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import api from '../services/api';
import { DashboardLayout } from '../layouts/DashboardLayout';
import { StatsCard } from '../components/StatsCard';
import { PrimaryButton } from '../components/PrimaryButton';

interface DashboardSummary {
  user: {
    name: string;
    employee_id: string;
    role: string;
    branch: string;
  };
  summary: {
    critical_cases: number;
    open_cases: number;
    due_today: number;
  };
}

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [data, setData] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await api.get('/api/dashboard/summary');
        setData(response.data);
      } catch (error) {
        console.error('Failed to fetch summary', error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, []);

  const handleGoToQueue = () => {
    navigate('/dashboard/cases');
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex flex-col items-center justify-center w-full h-64 gap-4">
          <Loader2 className="animate-spin text-[#0EA5E9]" size={48} />
          <p className="text-gray-500 font-medium">Loading your dashboard...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (error || !data) {
    return (
      <DashboardLayout>
        <div className="bg-white p-8 rounded-xl shadow-sm border border-red-100 flex flex-col items-center max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-2">Error Loading Dashboard</h2>
          <p className="text-gray-500 mb-6">We couldn't fetch your latest cases right now.</p>
          <PrimaryButton label="Retry" onClick={() => window.location.reload()} />
        </div>
      </DashboardLayout>
    );
  }

  const { name, role, branch } = data.user;
  const { critical_cases, open_cases, due_today } = data.summary;
  
  // Use first name for welcome message
  const firstName = name.split(' ')[0];

  return (
    <DashboardLayout>
      <div className="w-full max-w-4xl flex flex-col items-center justify-center">
        
        {/* Header Section */}
        <div className="text-center mb-14">
          <h1 className="font-serif text-[40px] text-[#132541] mb-3 font-normal">
            Welcome back, {firstName}
          </h1>
          <p className="text-gray-400 font-medium text-[15px]">
            Role: {role} <span className="mx-1">·</span> Branch: {branch}
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mb-16 px-4 sm:px-0">
          <StatsCard 
            number={critical_cases} 
            label="Critical cases" 
            numberColorClass="text-[#B91C1C]" 
          />
          <StatsCard 
            number={open_cases} 
            label="Open cases" 
            numberColorClass="text-[#132541]" 
          />
          <StatsCard 
            number={due_today} 
            label="Due today" 
            numberColorClass="text-[#059669]" 
          />
        </div>

        {/* Primary Action */}
        <PrimaryButton label="Go to Case Queue →" onClick={handleGoToQueue} />

      </div>
    </DashboardLayout>
  );
}
