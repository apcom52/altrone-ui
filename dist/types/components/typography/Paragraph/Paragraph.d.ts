/// <reference types="react" />
import { WithAltroneOffsets, WithoutDefaultOffsets } from '../../../types';
import './paragraph.scss';
interface ParagraphProps extends WithoutDefaultOffsets, WithAltroneOffsets {}
declare const _default: import('react').MemoExoticComponent<
  ({ children, className, ...props }: ParagraphProps) => JSX.Element
>;
export default _default;
