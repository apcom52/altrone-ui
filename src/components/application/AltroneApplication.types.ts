import { JSX } from 'react';
import { ConsumerConfigurationContext } from '../configuration/AltroneConfiguration.context.ts';

export type Theme = 'auto' | 'light' | 'dark';

export interface AltroneApplicationProps
  extends React.HTMLAttributes<HTMLDivElement> {
  theme?: Theme;
  tagName?: keyof JSX.IntrinsicElements;
  config?: Partial<ConsumerConfigurationContext>;
}
