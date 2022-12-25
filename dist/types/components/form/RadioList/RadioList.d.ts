/// <reference types="react" />
import { Direction, Option } from '../../../types';
import './radio-list.scss';
export type Value = number | string | boolean;
interface RadioListProps {
  name: string;
  value: Value;
  options: Option[];
  onChange: (value: Option['value']) => void;
  direction?: Direction;
  disabled?: boolean;
}
declare const _default: import('react').MemoExoticComponent<
  ({ value, options, disabled, direction, onChange, name }: RadioListProps) => JSX.Element
>;
export default _default;
