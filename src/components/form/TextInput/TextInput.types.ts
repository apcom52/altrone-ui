import { ChangeEvent, CSSProperties, PropsWithChildren, ReactElement, ReactNode } from 'react';
import { BasicInputProps } from '../BasicInput';
import { Elevation, Size, Surface } from '../../../types';

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
  disabled?: boolean;
  placeholder?: string;
  onFocus?: () => void;
  onBlur?: () => void;
  onKeyDown?: React.KeyboardEventHandler;
  style?: Partial<CSSProperties>;
  elevation?: Elevation;
}

export interface TextInputProps extends InputComponentProps, BasicInputProps {
  children?: ReactElement | null | Array<ReactElement | null>;
  loading?: boolean;
  size?: Size;
  suggestions?: string[];
  Component?: JSX.Element;
  required?: boolean;
  surface?: Surface;
}
