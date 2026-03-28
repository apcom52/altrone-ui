import { JSX, ReactElement } from 'react';
import { ConsumerConfigurationContext } from '../configuration/AltroneConfiguration.context.ts';
import { NavigationListProps } from 'components/navigationList/NavigationList.types.ts';
import { ToolbarProps } from 'components/toolbar/Toolbar.types.ts';
import { ScreenProps } from 'components/screen/Screen.types.ts';

export type Theme = 'auto' | 'light' | 'dark';
export type Accent =
  | 'red'
  | 'pink'
  | 'purple'
  | 'indigo'
  | 'blue'
  | 'teal'
  | 'amber'
  | 'brown';
export type Language = 'en' | 'ru';

export interface AltroneApplicationProps extends React.HTMLAttributes<HTMLDivElement> {
  language?: Language;
  theme?: Theme;
  accent?: Accent;
  tagName?: keyof JSX.IntrinsicElements;
  config?: Partial<ConsumerConfigurationContext>;
  customLabels?: Record<string, any>;
  sidebar?: ScreenProps['sidebar'];
  header?: ScreenProps['header'];
}
