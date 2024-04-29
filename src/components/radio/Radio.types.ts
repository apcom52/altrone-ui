import {
  ChangeEvent,
  ChangeEventHandler,
  PropsWithChildren,
  ReactElement,
} from 'react';
import { Direction } from 'types';

export type RadioContext = {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  name: string;
  disabled: boolean;
};

export interface RadioProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    'onChange' | 'type' | 'name' | 'value'
  > {
  value: string;
  onChange: (value: string, e: ChangeEvent) => void;
  children: ReactElement<RadioItemProps> | ReactElement<RadioItemProps>[];
  name?: string;
  direction?: Direction;
  disabled?: boolean;
}

export interface RadioItemProps
  extends PropsWithChildren,
    Omit<React.LabelHTMLAttributes<HTMLLabelElement>, 'onChange'> {
  value: string;
  disabled?: boolean;
}
