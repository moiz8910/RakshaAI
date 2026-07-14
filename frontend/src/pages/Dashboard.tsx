import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LogOut, ShieldAlert, Loader2 } from 'lucide-react';
import api from '../services/api';

interface DashboardStats {
  active_cases: number;
  high_risk_flags: number;
  resolved: number;
}

export default function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get('/api/dashboard/stats');
        setStats(response.data);
      } catch (error) {
        console.error('Failed to fetch stats', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-navy text-white p-4 shadow-md flex justify-between items-center sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <ShieldAlert className="text-accent" size={28} />
          <div>
            <h1 className="font-serif text-xl font-bold tracking-wide">RakshaAI</h1>
            <p className="text-[10px] text-gray-300 uppercase tracking-widest">Fraud Intelligence</p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="text-right">
            <p className="text-sm font-medium">{user?.user_name}</p>
            <p className="text-xs text-accent">{user?.role}</p>
          </div>
          <button 
            onClick={handleLogout}
            className="p-2 hover:bg-navy-light rounded-full transition-colors group"
            title="Sign Out"
          >
            <LogOut size={20} className="text-gray-300 group-hover:text-white" />
          </button>
        </div>
      </header>
      
      <main className="flex-1 p-8 max-w-7xl mx-auto w-full">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-navy mb-4">Welcome to your Dashboard</h2>
          <p className="text-gray-600 mb-6">
            You are logged in as a <span className="font-semibold text-accent">{user?.role}</span>. 
            This is a protected route.
          </p>
          
          {loading ? (
            <div className="flex justify-center p-8">
              <Loader2 className="animate-spin text-accent" size={32} />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="bg-blue-50 border border-blue-100 p-5 rounded-lg">
                <h3 className="font-semibold text-navy text-lg">Active Cases</h3>
                <p className="text-3xl font-bold mt-2">{stats?.active_cases || 0}</p>
              </div>
              <div className="bg-red-50 border border-red-100 p-5 rounded-lg">
                <h3 className="font-semibold text-navy text-lg">High Risk Flags</h3>
                <p className="text-3xl font-bold text-red-600 mt-2">{stats?.high_risk_flags || 0}</p>
              </div>
              <div className="bg-green-50 border border-green-100 p-5 rounded-lg">
                <h3 className="font-semibold text-navy text-lg">Resolved</h3>
                <p className="text-3xl font-bold text-green-600 mt-2">{stats?.resolved || 0}</p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
