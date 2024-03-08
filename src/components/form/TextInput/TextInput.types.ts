import { ChangeEvent, ReactNode } from 'react';
import { BasicInputProps } from '../BasicInput';
import { TextIsland } from './components/TextIsland';

export type Placement = 'left' | 'right';

export type TextInputRef = {
  value: string;
  focused: boolean;
  inputElement: HTMLInputElement;
};

type IslandProps = {
  placement: Placement;
  className?: string;
};

export interface TextIslandProps extends IslandProps {
  label: string;
}

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
  onFocus?: () => void;
  onBlur?: () => void;
}

export interface TextInputProps extends InputComponentProps, BasicInputProps {
  children?: JSX.Element | JSX.Element[];
  suggestions?: string[];
}

export type TextInputSubComponents = {
  TextIsland: typeof TextIsland;
};
