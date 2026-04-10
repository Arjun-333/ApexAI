"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'apex' | 'chernobyl' | 'nuorbit';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  stealthMode: boolean;
  toggleStealthMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setThemeState] = useState<Theme>('apex');
  const [stealthMode, setStealthMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('apex-theme') as Theme;
    const savedStealth = localStorage.getItem('apex-stealth') === 'true';
    
    if (savedTheme) {
      setThemeState(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }
    setStealthMode(savedStealth);
    document.documentElement.setAttribute('data-stealth', String(savedStealth));
  }, []);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('apex-theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const toggleStealthMode = () => {
    const next = !stealthMode;
    setStealthMode(next);
    localStorage.setItem('apex-stealth', String(next));
    document.documentElement.setAttribute('data-stealth', String(next));
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, stealthMode, toggleStealthMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
