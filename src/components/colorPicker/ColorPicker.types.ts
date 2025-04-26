import { Size } from 'types';
import { RenderFunction } from 'utils';

export type ColorFormat = 'hex' | 'rgb' | 'preset';

export type ColorPreset = {
  name: string;
  title: string;
  value: string;
};

export interface ColorPickerPresetProps extends ColorPreset {
  selected?: boolean;
  onChange: (value: string) => void;
}

export interface ColorPickerProps<ColorValue = string>
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
  renderFunc?: RenderFunction<ColorValue, ColorPickerProps>;
}
