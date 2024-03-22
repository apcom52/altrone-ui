import { PropsWithChildren, JSX } from 'react';
import { BasicComponentProps } from '../../types/BaseDisplayComponent.ts';
import { ConsumerConfigurationContext } from '../configuration/AltroneConfiguration.context.ts';

export enum Theme {
  auto = 'auto',
  light = 'light',
  dark = 'dark',
}

export interface AltroneApplicationProps
  extends PropsWithChildren,
    BasicComponentProps {
  theme?: Theme;
  tagName?: keyof JSX.IntrinsicElements;
  config?: Partial<ConsumerConfigurationContext>;
}
