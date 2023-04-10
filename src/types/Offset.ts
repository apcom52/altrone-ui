import { Offset } from '../hooks/useOffset/useOffset';

/**
 * @deprecated will be removed in 3.0
 */
export type WithoutDefaultOffsets<T = React.HTMLProps<HTMLDivElement>> = Omit<
  T,
  'margin' | 'padding' | 'tagName' | 'ref'
>;

/**
 * @deprecated will be removed in 3.0
 */
export type WithAltroneOffsets = {
  margin?: number | Offset;
  padding?: number | Offset;
};
