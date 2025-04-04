'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type ThemeContextType = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedMode = localStorage.getItem('darkMode');
    if (storedMode) setDarkMode(storedMode === 'true');
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      localStorage.setItem('darkMode', String(!prev));
      return !prev;
    });
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <body className={darkMode ? 'dark bg-[#111] text-white' : 'bg-[#f9f9f9] text-black'}>
        {children}
      </body>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
