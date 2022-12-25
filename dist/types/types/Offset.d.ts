/// <reference types="react" />
import { Offset } from '../hooks/useOffset/useOffset';
export type WithoutDefaultOffsets<T = React.HTMLProps<HTMLDivElement>> = Omit<
  T,
  'margin' | 'padding' | 'tagName' | 'ref'
>;
export type WithAltroneOffsets = {
  margin?: number | Offset;
  padding?: number | Offset;
};
