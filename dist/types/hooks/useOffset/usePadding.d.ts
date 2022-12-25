import { Offset } from './useOffset';
export interface Padding {
  padding?: number | string;
  paddingTop?: number;
  paddingLeft?: number;
  paddingRight?: number;
  paddingBottom?: number;
}
export declare const usePadding: (params: number | Offset) => Padding;
