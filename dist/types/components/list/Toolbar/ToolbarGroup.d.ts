import { ReactNode } from 'react';
import { Align } from '../../../types/Align';
interface ToolbarGroupProps {
  align?: Align;
  fluid?: boolean;
  collapsible?: boolean;
  children?: ReactNode | ReactNode[];
}
declare const _default: import('react').MemoExoticComponent<
  ({ children, fluid, align, collapsible }: ToolbarGroupProps) => JSX.Element
>;
export default _default;
