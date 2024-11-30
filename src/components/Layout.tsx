import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ClipboardList } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
              <div className="flex-shrink-0 flex items-center">
                <ClipboardList className="w-8 h-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">Task Manager</span>
              </div>
              <div className="ml-10 flex items-center space-x-4">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                      isActive
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`
                  }
                >
                  <LayoutDashboard className="w-4 h-4 mr-2" />
                  Dashboard
                </NavLink>
                <NavLink
                  to="/tasks"
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                      isActive
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`
                  }
                >
                  <ClipboardList className="w-4 h-4 mr-2" />
                  Tasks
                </NavLink>
              </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}

export default Layout;