import React, {
  ChangeEvent,
  ChangeEventHandler,
  PropsWithChildren,
  ReactElement,
} from 'react';
import { Direction, Size } from 'types';

export type RadioContext = {
  value: string | number;
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
  value: string | number;
  onChange: (value: string, event: ChangeEvent<HTMLInputElement>) => void;
  children:
    | ReactElement<RadioItemProps>
    | (ReactElement<RadioItemProps> | null | false)[]
    | null
    | false;
  name?: string;
  direction?: Direction;
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
