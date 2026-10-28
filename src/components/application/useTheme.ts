import { ResolvedTheme, Theme } from './Application.types.ts';
import { createContext, useContext } from 'react';

export type ThemeContextType = {
  /** The theme actually shown — `'auto'` already resolved against the system preference. */
  theme: ResolvedTheme;
  /** What was chosen via the `theme` prop or `setTheme`, `'auto'` included. */
  themePreference: Theme;
  setTheme: (theme: Theme) => void;
};

const FALLBACK_THEME_CONTEXT: ThemeContextType = {
  theme: 'light',
  themePreference: 'auto',
  setTheme: () => null,
};

/** `null` outside `Application`, so `Override` can tell "no parent" from "light parent". */
export const ThemeContext = createContext<ThemeContextType | null>(null);

export const useAltroneTheme = () =>
  useContext(ThemeContext) ?? FALLBACK_THEME_CONTEXT;
