import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { name: 'Case Queue', path: '/dashboard/cases' },
  { name: 'My Cases', path: '/dashboard/my-cases' },
  { name: 'Document Center', path: '/dashboard/documents' },
  { name: 'Communication Hub', path: '/dashboard/communication' },
  { name: 'Reports', path: '/dashboard/reports' },
];

export function Sidebar() {
  return (
    <aside className="w-64 flex-shrink-0 border-r border-gray-100 bg-white hidden md:block">
      <div className="py-8 px-6">
        <p className="text-xs text-gray-400 font-medium tracking-wider uppercase mb-4 px-2">
          Navigation
        </p>
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#132541] text-white'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-[#132541]'
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}
