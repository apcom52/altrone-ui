import { CSSProperties, PropsWithChildren } from 'react';
import { Theme } from '../../types';

export interface AltroneOptions {
  global: {
    reduceMotion?: boolean;
  };
  numberInput: {
    useFormatFromLocale?: boolean;
  };
  carousel: {
    reduceMotion?: boolean;
  };
  modal: {
    reduceMotion?: boolean;
  };
  floatingBox: {
    windowOffset: number;
    offset: number;
  };
  photoViewer: {
    openDescriptionByDefault: boolean;
  };
  spoiler: {
    reduceMotion: boolean;
  };
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
