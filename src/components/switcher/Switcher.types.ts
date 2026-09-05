import { CheckboxProps } from '../checkbox/Checkbox.types.ts';

/** Like `Checkbox`, minus the tri-state — a switch is on or off. */
export interface SwitcherProps extends Omit<CheckboxProps, 'indeterminate'> {}
