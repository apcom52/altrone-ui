import { createContext, useContext } from 'react';
import { AltroneOptions, AltroneProps } from '../hocs/Altrone/Altrone.types';
import { Theme } from '../types';
import { DEFAULT_ALTRONE_OPTIONS } from '../hocs/Altrone/Altrone.const';

export const ThemeContext = createContext<
  Required<Pick<AltroneProps, 'theme' | 'lang' | 'locale'>> & { options: AltroneOptions }
>({
  theme: Theme.system,
  lang: 'en-US',
  locale: 'en-US',
  options: DEFAULT_ALTRONE_OPTIONS
});

/**
 * @deprecated will be removed in 3.0. You should use useAltrone
 */
export const useThemeContext = () => useContext(ThemeContext);

export const useAltrone = () => useContext(ThemeContext);
