import { CSSProperties } from 'react';
export declare enum Theme {
  light = 'light',
  dark = 'dark'
}
export interface ThemeConfig {
  theme: Theme;
  locale: string;
  style?: CSSProperties;
  lang?: string;
}
