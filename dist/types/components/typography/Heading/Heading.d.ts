/// <reference types="react" />
import { WithAltroneOffsets, WithoutDefaultOffsets } from '../../../types';
import './heading.scss';
interface HeadingProps extends WithoutDefaultOffsets, WithAltroneOffsets {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}
declare const _default: import('react').MemoExoticComponent<
  ({ children, level, ...props }: HeadingProps) => JSX.Element
>;
export default _default;
