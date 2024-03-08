import { ChangeEvent, CSSProperties, PropsWithChildren, ReactElement, ReactNode } from 'react';
import { BasicInputProps } from '../BasicInput';

export type Placement = 'left' | 'right';

export type TextInputRef = {
  value: string;
  inputElement: HTMLInputElement | null;
};

type IslandProps = {
  placement: Placement;
  className?: string;
};

export interface TextIslandProps extends IslandProps {
  label: string;
}

export interface IconIslandProps extends IslandProps {
  icon: ReactNode;
}

export interface ActionIslandProps extends IslandProps {
  label: string;
  icon?: ReactNode;
  showLabel?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  danger?: boolean;
}

export interface CustomIslandProps extends IslandProps, PropsWithChildren {}

export type IslandRef = {
  container: HTMLElement | null;
  placement: Placement;
};

export interface InputComponentProps {
  value: string;
  onChange: (value: string, event: ChangeEvent) => void;
  id?: string;
  type?: string;
  maxLength?: number;
  className?: string;
  leftOffset?: number;
  rightOffset?: number;
  onFocus?: () => void;
  onBlur?: () => void;
  style?: Partial<CSSProperties>;
  Component?: JSX.Element;
}

export interface TextInputProps extends InputComponentProps, BasicInputProps {
  children?: ReactElement | null | Array<ReactElement | null>;
  suggestions?: string[];
}
