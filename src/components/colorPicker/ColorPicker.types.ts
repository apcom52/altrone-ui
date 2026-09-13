import type {
  CSSProperties,
  InputHTMLAttributes,
  ReactElement,
  Ref,
  SyntheticEvent,
  MouseEvent,
  ReactNode,
} from 'react';
import { Size } from 'types';

export type ColorPreset = {
  name: string;
  title: string;
  value: string;
};

export interface ColorPickerPresetProps extends ColorPreset {
  selected?: boolean;
  onChange: (value: string, event: MouseEvent<HTMLButtonElement>) => void;
}

export interface ColorPickerProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'size' | 'value' | 'children'
  > {
  ref?: Ref<HTMLInputElement>;
  value?: string;
  // event is optional because some color sources (e.g. react-colorful) don't expose DOM events
  onChange: (value: string | undefined, event?: SyntheticEvent) => void;

  colorPresets?: ColorPreset[];

  allowPalette?: boolean;

  size?: Size;
  transparent?: boolean;
  readOnly?: boolean;
  clearable?: boolean;

  // When true, merges trigger props onto the single child element instead of rendering TextInput
  asChild?: boolean;
  children?: ReactNode;

  // Replaces the default TextInput trigger with a custom element
  renderFunc?: (props: ColorPickerRenderProps) => ReactElement;
}

export interface ColorPickerRenderProps {
  value?: string;
  opened: boolean;
  disabled: boolean;
  placeholder: string;
  className?: string;
  style?: CSSProperties;
}
