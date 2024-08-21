import React, { useState, ReactNode, useEffect } from 'react';
import { ThemeContext } from './ThemeContext';
import { checkIsDarkSchemePreferred } from '../../utils/helpers';

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isDark, setIsDark] = useState<boolean>(checkIsDarkSchemePreferred());

  useEffect(() => {
    const mediaQueryList: MediaQueryList = window.matchMedia(
      '(prefers-color-scheme: dark)',
    );

    const handleChange = (event: MediaQueryListEvent) =>
      setIsDark(event.matches);

    setIsDark(mediaQueryList.matches);

    mediaQueryList.addEventListener('change', handleChange);
    return () => {
      mediaQueryList.removeEventListener('change', handleChange);
    };
  }, []);

  useEffect(() => {
    document.body.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, setIsDark }}>
      {children}
    </ThemeContext.Provider>
  );
};
