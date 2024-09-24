import { Theme } from './AltroneApplication.types.ts';
import { createContext, useContext } from 'react';

export type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'auto',
  setTheme: () => null,
});

export const useAltroneTheme = () => useContext(ThemeContext);
