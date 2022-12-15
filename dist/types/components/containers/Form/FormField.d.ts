import { ReactElement } from "react";
import './form-field.scss';
import { FormContextProps } from "../../../contexts";
interface FormFieldProps extends Omit<React.HTMLProps<HTMLDivElement>, 'children'>, FormContextProps {
    children: ReactElement;
    label?: string;
    required?: boolean;
}
declare const _default: import("react").MemoExoticComponent<({ className, label, children, required, disabled }: FormFieldProps) => JSX.Element>;
export default _default;
