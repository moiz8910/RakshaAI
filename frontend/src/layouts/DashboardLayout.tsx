import React, { ReactNode } from 'react';
import { TopNavbar } from '../components/TopNavbar';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <TopNavbar />
      <main className="flex-1 flex flex-col items-center justify-center p-6 sm:p-12">
        {children}
      </main>
    </div>
  );
}
