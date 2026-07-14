import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function TopNavbar({ title = 'Welcome' }: { title?: string }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <header className="bg-[#132541] h-16 w-full flex items-center justify-between px-6 sticky top-0 z-50">
      {/* Left section: Logo and Welcome */}
      <div className="flex items-center gap-4">
        <h1 className="font-serif text-2xl text-white font-bold tracking-wide">
          RakshaAI
        </h1>
        <span className="text-gray-500 font-light text-xl">|</span>
        <span className="text-gray-300 text-sm font-medium">{title}</span>
      </div>

      {/* Right section: User Profile */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-[#0EA5E9]/80 text-white flex items-center justify-center text-sm font-semibold tracking-wider">
          {user?.user_name ? getInitials(user.user_name) : 'PS'}
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-sm font-medium text-white flex items-center gap-1">
            {user?.user_name || 'Priya Sharma'}
            <span className="text-gray-400 font-normal ml-1 mr-1">·</span>
            <span className="text-gray-400 font-normal text-xs">{user?.role || 'Claims Assessor'}</span>
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="ml-4 p-1.5 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
          title="Logout"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
}
