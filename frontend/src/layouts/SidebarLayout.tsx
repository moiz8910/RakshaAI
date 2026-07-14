import React, { ReactNode } from 'react';
import { TopNavbar } from '../components/TopNavbar';
import { Sidebar } from '../components/Sidebar';

interface SidebarLayoutProps {
  children: ReactNode;
  title?: string;
}

export function SidebarLayout({ children, title = 'Case Queue' }: SidebarLayoutProps) {
  return (
    <div className="min-h-screen bg-[#FAF9F6] flex flex-col font-sans">
      <TopNavbar title={title} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-6 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
