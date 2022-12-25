import { PropsWithChildren } from 'react';
import { Size } from '../../../types';
import './basic-input.scss';
export interface BasicInputProps<T = string> {
  errorText?: string;
  hintText?: string;
  size?: Size;
  className?: string;
  disabled?: boolean;
}
declare const _default: import('react').NamedExoticComponent<
  PropsWithChildren<BasicInputProps<string>>
>;
export default _default;
