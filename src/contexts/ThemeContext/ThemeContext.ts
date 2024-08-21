import { createContext } from 'react';

interface ThemeContextType {
  isDark: boolean;
  setIsDark: (isDark: boolean) => void;
}

const defaultThemeContext: ThemeContextType = {
  isDark: false,
  setIsDark: () => {},
};

export const ThemeContext =
  createContext<ThemeContextType>(defaultThemeContext);
