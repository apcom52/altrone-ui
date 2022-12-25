/// <reference types="react" />
import { Option } from '../../../types';
export interface RadioProps extends Option {
  name: string;
  checked: boolean;
  onChange: (value: Option['value']) => void;
}
declare const _default: import('react').MemoExoticComponent<
  ({ name, checked, label, disabled, value, onChange }: RadioProps) => JSX.Element
>;
export default _default;
