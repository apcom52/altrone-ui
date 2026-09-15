import { CSSProperties, ReactElement, ReactNode } from 'react';
import { Direction, Size } from 'types';

export type SliderVariant = 'default' | 'fill';

export interface SliderProps
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
  /**
   * `default` — a thin track with a round thumb, the shape a native
   * `<input type="range">` has everywhere else. `fill` — the iOS Control
   * Center slab: the whole control is the track and its fill level is the handle.
   */
  variant?: SliderVariant;
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
  /** Class for the filled (active) portion of the track. */
  activeClassName?: string;
  /** Inline styles for the filled (active) portion of the track. */
  activeStyle?: CSSProperties;
}
