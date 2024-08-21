import React from 'react';
import { ThemeProvider } from './ThemeContext';
import { DropPickerProvider } from './DropPickerContext';

interface ProvidersProps {
  children: React.ReactNode;
}

const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <DropPickerProvider>
        {children}
      </DropPickerProvider>
    </ThemeProvider>
  );
};

export default Providers;
