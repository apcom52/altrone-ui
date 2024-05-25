import { JSX } from 'react';
import { ConsumerConfigurationContext } from '../configuration/AltroneConfiguration.context.ts';

export enum Theme {
  auto = 'auto',
  light = 'light',
  dark = 'dark',
}

export interface AltroneApplicationProps
  extends React.HTMLAttributes<HTMLDivElement> {
  theme?: Theme;
  tagName?: keyof JSX.IntrinsicElements;
  config?: Partial<ConsumerConfigurationContext>;
}
