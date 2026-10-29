import type {
  InputHTMLAttributes,
  Ref,
  SyntheticEvent,
  MouseEvent,
  ReactElement,
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

  /** Trigger chevron shown when the popover is closed. Defaults to the shared `icons.open`. */
  openIcon?: ReactElement;
  /** Trigger chevron shown when the popover is open. Defaults to the shared `icons.close`. */
  closeIcon?: ReactElement;
  /** Icon for the "saved colors" tab. Defaults to a grid glyph. */
  presetsTabIcon?: ReactElement;
  /** Icon for the "palette" tab. Defaults to a palette glyph. */
  paletteTabIcon?: ReactElement;

  // When true, merges trigger props onto the single child element instead of rendering TextInput
  asChild?: boolean;
  children?: ReactNode;
}
