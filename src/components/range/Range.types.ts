import { ReactElement, ReactNode } from 'react';
import { Direction, Size } from 'types';

export interface RangeProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'size'
  > {
  value: number;
  onChange: (value: number) => void;
  onValueCommit?: (value: number) => void;
  direction?: Direction;
  min?: number;
  max?: number;
  step?: number;
  icon?: ReactElement;
  size?: Size;
  readOnly?: boolean;
  showCurrentValue?: 'active' | 'always' | false;
  renderLabel?: (value: number) => ReactNode;
}
