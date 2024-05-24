import { Align } from 'types';

export interface ToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  align?: Align;
  compact?: boolean;
}

export interface ToolbarContextType {
  compact: boolean;
}

export interface ToolbarActionProps
  extends React.HTMLAttributes<HTMLButtonElement> {
  icon?: JSX.Element;
  label: string;
  showLabel?: boolean;
}

export interface ToolbarGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {}
