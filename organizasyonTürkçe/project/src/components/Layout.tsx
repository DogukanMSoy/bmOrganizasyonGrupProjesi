import React from 'react';
import { 
  Home, 
  ArrowLeftRight, 
  ScanLine, 
  MoveHorizontal, 
  BarChartHorizontal,
  Moon,
  Sun
} from 'lucide-react';
import { Page } from '../App';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  onChangePage: (page: Page) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentPage, onChangePage }) => {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
  };

  const navItems = [
    { id: 'home', label: 'Başlangıç', icon: <Home size={20} /> },
    { id: 'fcfs', label: 'FCFS', icon: <ArrowLeftRight size={20} /> },
    { id: 'scan', label: 'SCAN', icon: <ScanLine size={20} /> },
    { id: 'sstf', label: 'SSTF', icon: <MoveHorizontal size={20} /> },
    { id: 'comparison', label: 'Karşılaştır', icon: <BarChartHorizontal size={20} /> },
  ];

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark' : ''}`}>
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">DiskYönetimAlgoritmaları</span>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={toggleDarkMode}
                className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between">
            <div className="flex space-x-2 md:space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onChangePage(item.id as Page)}
                  className={`inline-flex items-center px-3 py-2 border-b-2 text-sm font-medium relative ${
                    currentPage === item.id
                      ? 'border-indigo-500 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-300 dark:hover:text-gray-100 dark:hover:border-gray-600'
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  <span className="hidden md:inline">{item.label}</span>
                  {currentPage === item.id && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-500 dark:bg-indigo-400"
                      initial={false}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main className="flex-grow bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </div>
      </main>

      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-gray-500 dark:text-gray-400 text-sm">
            DiskYönetimAlgoritmaları © {new Date().getFullYear()} - Disk Yönetim Algoritmalarını anlamak için görsel uygulama.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;