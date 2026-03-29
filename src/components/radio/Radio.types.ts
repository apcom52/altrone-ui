import React, {
  ChangeEvent,
  ChangeEventHandler,
  PropsWithChildren,
  ReactElement,
} from 'react';
import { Direction } from 'types';

export type RadioContext = {
  value: string | number;
  onChange: ChangeEventHandler<HTMLInputElement>;
  name: string;
  disabled: boolean;
};

export interface RadioProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'onChange' | 'type' | 'name' | 'value'
  > {
  ref?: React.Ref<HTMLDivElement>;
  value: string | number;
  onChange: (value: string, e: ChangeEvent) => void;
  children:
    | ReactElement<RadioItemProps>
    | (ReactElement<RadioItemProps> | null | false)[]
    | null
    | false;
  name?: string;
  direction?: Direction;
  disabled?: boolean;
}

export interface RadioItemProps
  extends PropsWithChildren,
    Omit<React.LabelHTMLAttributes<HTMLLabelElement>, 'onChange'> {
  ref?: React.Ref<HTMLLabelElement>;
  value: string | number;
  disabled?: boolean;
}
