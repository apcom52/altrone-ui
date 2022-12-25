/// <reference types="react" />
import './form-group.scss';
import { Align } from '../../../types/Align';
import { FormContextProps } from '../../../contexts';
export declare enum FormGroupVariant {
  default = 'default',
  linear = 'linear',
  row = 'row'
}
interface FormGroupProps extends React.HTMLProps<HTMLDivElement>, FormContextProps {
  variant?: FormGroupVariant;
  align?: Align;
  weights?: number[];
}
declare const _default: import('react').MemoExoticComponent<
  ({
    variant,
    align,
    children,
    className,
    required,
    disabled,
    weights
  }: FormGroupProps) => JSX.Element
>;
export default _default;
