import { Offset, useOffset } from './useOffset';

const OFFSET_WIDTH = 4;

export interface Margin {
  margin?: number | string;
  marginTop?: number;
  marginLeft?: number;
  marginRight?: number;
  marginBottom?: number;
}

export const useMargin = (params: number | Offset) => {
  const offsets = useOffset(params);

  if (offsets.offset !== undefined) {
    return {
      margin: offsets.offset * OFFSET_WIDTH
    };
  }

  const result: Margin = {};

  const { top, bottom, left, right } = offsets;

  if (Object.keys(offsets).length === 4) {
    const marginValue = [];

    if (top === bottom && left === right) {
      marginValue.push(top, left);
    } else if (left === right) {
      marginValue.push(top, left, bottom);
    } else {
      marginValue.push(top, left, bottom, right);
    }

    result.margin = marginValue.map((value) => value * OFFSET_WIDTH).join('px ') + 'px';
  } else {
    if (top !== undefined) {
      result.marginTop = top * OFFSET_WIDTH;
    }

    if (left !== undefined) {
      result.marginLeft = left * OFFSET_WIDTH;
    }

    if (right !== undefined) {
      result.marginRight = right * OFFSET_WIDTH;
    }

    if (bottom !== undefined) {
      result.marginBottom = bottom * OFFSET_WIDTH;
    }
  }

  return result;
};
