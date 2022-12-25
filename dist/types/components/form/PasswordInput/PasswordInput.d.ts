/// <reference types="react" />
import { TextInputProps } from '../index';
interface PasswordInputProps extends TextInputProps {
  showControls?: boolean;
}
declare const _default: import('react').MemoExoticComponent<
  ({ showControls, rightIsland, ...props }: PasswordInputProps) => JSX.Element
>;
export default _default;
