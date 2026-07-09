import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'default' | 'emerald' | 'rose' | 'blue';
type DisplayMode = 'dark' | 'light' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  displayMode: DisplayMode;
  setDisplayMode: (mode: DisplayMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    return (savedTheme as Theme) || 'default';
  });

  const [displayMode, setDisplayMode] = useState<DisplayMode>(() => {
    const savedMode = localStorage.getItem('portfolio-display-mode');
    return (savedMode as DisplayMode) || 'system';
  });

  useEffect(() => {
    localStorage.setItem('portfolio-theme', theme);
    if (theme === 'default') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', theme);
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('portfolio-display-mode', displayMode);
    
    const applyMode = (mode: 'dark' | 'light') => {
      if (mode === 'light') {
        document.documentElement.setAttribute('data-mode', 'light');
      } else {
        document.documentElement.removeAttribute('data-mode');
      }
    };

    if (displayMode === 'system') {
      const isSystemLight = window.matchMedia('(prefers-color-scheme: light)').matches;
      applyMode(isSystemLight ? 'light' : 'dark');
      
      const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');
      const handler = (e: MediaQueryListEvent) => applyMode(e.matches ? 'light' : 'dark');
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    } else {
      applyMode(displayMode);
    }
  }, [displayMode]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, displayMode, setDisplayMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
