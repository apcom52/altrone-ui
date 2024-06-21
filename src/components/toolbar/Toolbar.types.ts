import { Align, RenderFuncProp } from 'types';

export interface ToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  compact?: boolean;
}

export interface ToolbarContextType {
  compact: boolean;
}

export interface ToolbarActionProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: JSX.Element;
  label: string;
  showLabel?: boolean;
  renderFunc?: RenderFuncProp<
    HTMLButtonElement,
    ToolbarActionProps & { compact?: boolean }
  >;
}

export interface ToolbarGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {
  align?: Align;
}
