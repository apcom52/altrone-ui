import { CheckboxProps } from '../checkbox/Checkbox.types.ts';

export interface SwitcherProps extends Omit<CheckboxProps, 'indeterminate'> {}
