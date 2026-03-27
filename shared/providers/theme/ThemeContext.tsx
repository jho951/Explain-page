'use client';

import { ReactNode, useEffect, useState } from 'react';

import { resolveSystemTheme } from '@/utils/theme';
type Theme = 'light' | 'dark';

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const syncTheme = () => {
      setTheme(resolveSystemTheme());
      setMounted(true);
    };

    syncTheme();
    mediaQuery.addEventListener('change', syncTheme);

    return () => mediaQuery.removeEventListener('change', syncTheme);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    document.documentElement.classList.toggle('dark', theme === 'dark');
    document.documentElement.classList.add('theme-loaded');
  }, [theme, mounted]);

  return mounted ? children : null;
};

export { ThemeProvider };
