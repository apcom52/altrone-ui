import { BasicComponentProps } from 'types';

type MaterialIconStyle = 'outlined' | 'rounded' | 'sharp';

export interface IconProps extends BasicComponentProps {
  i: string;
  size?: number | string;
  iconStyle?: MaterialIconStyle;
}
