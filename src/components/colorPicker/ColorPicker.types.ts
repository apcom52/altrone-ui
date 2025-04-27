import { Size } from 'types';
import { CustomRenderFunction } from 'utils';

export type ColorPreset = {
  name: string;
  title: string;
  value: string;
};

export interface ColorPickerPresetProps extends ColorPreset {
  selected?: boolean;
  onChange: (value: string) => void;
}

export interface ColorPickerContext {
  opened: boolean;
  value?: string;
  setValue: (value?: string) => void;
}

export interface ColorPickerProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'size' | 'value'
  > {
  value?: string;
  onChange: (value?: string) => void;

  colorPresets?: ColorPreset[];

  allowPalette?: boolean;

  size?: Size;
  transparent?: boolean;
  readonly?: boolean;
  clearable?: boolean;
  renderFunc?: CustomRenderFunction<ColorPickerContext>;
}
