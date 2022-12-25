import { RefObject } from 'react';
export type DOMRectValues = Pick<
  DOMRectReadOnly,
  'bottom' | 'height' | 'left' | 'right' | 'top' | 'width'
>;
export declare const useResizeObserver: (elementRef: RefObject<HTMLElement>) => DOMRectValues;
