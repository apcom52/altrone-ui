/// <reference types="react" />
import './form.scss';
import { FormContextProps } from '../../../contexts';
interface FormProps
  extends Omit<React.HTMLProps<HTMLFormElement>, 'required' | 'disabled'>,
    FormContextProps {}
declare const _default: import('react').MemoExoticComponent<
  ({ className, children, required, disabled, ...props }: FormProps) => JSX.Element
>;
export default _default;
