import { CSSProperties, PropsWithChildren } from 'react';
import { Theme } from '../../types';

export interface AltroneOptions {
  useNumberFormatFromLocale: boolean;
  reduceMotion: boolean;
}

interface Altrone {
  theme?: Theme;
  locale?: string;
  style?: CSSProperties;
  lang?: string;
  className?: string;
  options?: Partial<AltroneOptions>;
}

export type AltroneProps = PropsWithChildren<Altrone>;
