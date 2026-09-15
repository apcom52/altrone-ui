import { CheckboxProps } from '../checkbox/Checkbox.types.ts';

/** Like `Checkbox`, minus the tri-state — a switch is on or off. */
export interface SwitchProps extends Omit<CheckboxProps, 'indeterminate'> {}
