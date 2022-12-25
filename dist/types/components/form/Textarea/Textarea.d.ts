/// <reference types="react" />
import { TextInputProps } from '../TextInput';
import '../TextInput/text-input.scss';
import './textarea.scss';
import { BasicInputProps } from '../BasicInput';
interface TextareaProps
  extends Pick<TextInputProps, 'value' | 'onChange' | 'className' | 'classNames' | 'required'>,
    BasicInputProps {}
declare const _default: import('react').MemoExoticComponent<
  ({
    value,
    onChange,
    className,
    classNames,
    required,
    disabled,
    errorText,
    hintText,
    size,
    ...props
  }: TextareaProps) => JSX.Element
>;
export default _default;
