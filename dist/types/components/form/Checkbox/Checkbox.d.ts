/// <reference types="react" />
import './checkbox.scss';
import { BasicInputProps } from "../BasicInput";
interface CheckboxProps extends Omit<React.HTMLProps<HTMLInputElement>, 'onChange' | 'size'>, BasicInputProps {
    danger?: boolean;
    CheckIconComponent?: JSX.Element;
    onChange: (checked: boolean) => void;
}
declare const _default: import("react").MemoExoticComponent<({ disabled, id, checked, danger, children, CheckIconComponent, className, onChange, hintText, errorText, ...props }: CheckboxProps) => JSX.Element>;
export default _default;
