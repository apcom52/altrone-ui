/// <reference types="react" />
import { Direction, Option, Size } from '../../../types';
import './chips.scss';
interface ChipsProps {
  options: Option[];
  values: any[];
  onChange: (values: any[]) => void;
  SelectedIcon?: JSX.Element;
  direction?: Direction;
  size?: Size;
}
declare const _default: import('react').MemoExoticComponent<
  ({ options, values, onChange, SelectedIcon, direction, size }: ChipsProps) => JSX.Element
>;
export default _default;
