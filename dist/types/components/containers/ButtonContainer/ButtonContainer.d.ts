/// <reference types="react" />
import { Direction } from '../../../types';
import './button-container.scss';
import { Align } from '../../../types/Align';
interface ButtonContainerProps extends React.HTMLProps<HTMLDivElement> {
  direction?: Direction;
  align?: Align;
  mobileFluid?: boolean;
}
declare const _default: import('react').MemoExoticComponent<
  ({ direction, align, className, children, mobileFluid }: ButtonContainerProps) => JSX.Element
>;
export default _default;
