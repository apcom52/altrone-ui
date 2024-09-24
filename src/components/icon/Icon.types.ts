type MaterialIconStyle = 'outlined' | 'rounded' | 'sharp';

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  i: string;
  size?: number | string;
  iconStyle?: MaterialIconStyle;
}
