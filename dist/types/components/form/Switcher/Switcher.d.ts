/// <reference types="react" />
import { Align } from '../../../types/Align';
import './switcher.scss';
import { BasicInputProps } from '../BasicInput';
interface SwitcherProps
  extends Omit<React.HTMLProps<HTMLInputElement>, 'onChange' | 'size'>,
    Omit<BasicInputProps, 'size'> {
  onChange: (checked: boolean) => void;
  danger?: boolean;
  align?: Align;
}
declare const _default: import('react').MemoExoticComponent<
  ({
    children,
    danger,
    align,
    onChange,
    id,
    className,
    disabled,
    errorText,
    hintText,
    ...props
  }: SwitcherProps) => JSX.Element
>;
export default _default;
