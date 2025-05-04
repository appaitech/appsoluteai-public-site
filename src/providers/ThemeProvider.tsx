import { createContext, useContext } from 'react';

const ThemeContext = createContext({ theme: 'dark' });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Always set dark mode on the root element
  if (typeof window !== 'undefined') {
    window.document.documentElement.classList.add('dark');
    window.document.documentElement.classList.remove('light');
  }

  return (
    <ThemeContext.Provider value={{ theme: 'dark' }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useThemeContext = () => useContext(ThemeContext); 