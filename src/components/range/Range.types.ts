import { ReactElement, ReactNode } from 'react';
import { Direction, Size } from 'types';

export interface RangeProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  ref?: React.Ref<HTMLDivElement>;
  value: number;
  onChange: (
    value: number,
    event:
      | React.PointerEvent<HTMLDivElement>
      | PointerEvent
      | React.KeyboardEvent<HTMLDivElement>
  ) => void;
  onValueCommit?: (
    value: number,
    event: PointerEvent | React.KeyboardEvent<HTMLDivElement>
  ) => void;
  direction?: Direction;
  min?: number;
  max?: number;
  step?: number;
  icon?: ReactElement;
  size?: Size;
  disabled?: boolean;
  name?: string;
  readOnly?: boolean;
  showCurrentValue?: 'active' | 'always' | false;
  renderLabel?: (value: number) => ReactNode;
  activeTrackClassName?: string;
}
