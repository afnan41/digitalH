'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useTheme } from '@/lib/ThemeContext';
type Props = {
  children: ReactNode;
};

const MainLayout = ({ children }: Props) => {
    const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className={darkMode ? 'dark bg-[#111] text-white' : 'bg-[#f9f9f9] text-black'}>
      {/* NAVBAR */}
      <nav className={`w-full border-b ${darkMode ? 'bg-[#222]' : 'bg-blue-600'} text-white px-5 py-4`}>
        <div className="flex justify-between items-center flex-wrap gap-4 navbar-links">
          <Link href="/">
            <h1 className="text-lg font-bold cursor-pointer">User Management System</h1>
          </Link>

          <div className="flex flex-wrap items-center gap-3 justify-center sm:justify-start">
            <Link href="/" passHref>
              <Button variant="ghost" className="text-white hover:bg-white/20">Home</Button>
            </Link>
            <Link href="/add-user" passHref>
              <Button variant="ghost" className="text-white hover:bg-white/20">Add User</Button>
            </Link>
            <Link href="/users" passHref>
              <Button variant="ghost" className="text-white hover:bg-white/20">View All</Button>
            </Link>

            <div className="flex items-center gap-2 order-10">
              <span className="hidden sm:inline text-sm font-medium">Dark Mode</span>
              <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
              </div>
          </div>
        </div>
      </nav>

      <main className="px-5 py-10 max-w-6xl mx-auto">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
