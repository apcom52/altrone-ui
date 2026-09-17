import React, {
  ChangeEvent,
  ChangeEventHandler,
  PropsWithChildren,
  ReactElement,
} from 'react';
import { Orientation, Size } from 'types';

export type RadioContext = {
  /** `undefined` — no item in the group is selected. */
  value: string | number | undefined;
  onChange: ChangeEventHandler<HTMLInputElement>;
  name: string;
  disabled: boolean;
  size: Size;
};

export interface RadioProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'onChange' | 'type' | 'name' | 'value'
  > {
  ref?: React.Ref<HTMLDivElement>;
  /** Omit to render the group with no item selected. */
  value?: string | number;
  onChange: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
  children:
    | ReactElement<RadioItemProps>
    | (ReactElement<RadioItemProps> | null | false)[]
    | null
    | false;
  name?: string;
  orientation?: Orientation;
  disabled?: boolean;
  size?: Size;
}

export interface RadioItemProps
  extends PropsWithChildren,
    Omit<React.LabelHTMLAttributes<HTMLLabelElement>, 'onChange'> {
  ref?: React.Ref<HTMLLabelElement>;
  value: string | number;
  disabled?: boolean;
  /** Overrides the group's `size` for this item only. */
  size?: Size;
}
