/// <reference types="react" />
import { WithoutDefaultOffsets, WithAltroneOffsets } from '../../../types';
interface BoxProps extends WithoutDefaultOffsets, WithAltroneOffsets {
  tagName?: keyof JSX.IntrinsicElements;
}
declare const _default: import('react').MemoExoticComponent<
  import('react').ForwardRefExoticComponent<BoxProps & import('react').RefAttributes<unknown>>
>;
export default _default;
