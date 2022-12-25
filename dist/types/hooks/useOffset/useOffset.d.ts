export declare enum OffsetAxis {
  vertical = 'vertical',
  horizontal = 'horizontal',
  top = 'top',
  bottom = 'bottom',
  left = 'left',
  right = 'right'
}
export type Offset = {
  [K in OffsetAxis]?: number;
};
export interface OffsetObject {
  offset?: number;
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}
export declare const useOffset: (params: number | Offset) => OffsetObject;
