/**
 * @deprecated will be removed in 3.0
 */
export enum OffsetAxis {
  vertical = 'vertical',
  horizontal = 'horizontal',
  top = 'top',
  bottom = 'bottom',
  left = 'left',
  right = 'right'
}

/**
 * @deprecated will be removed in 3.0
 */
export type Offset = { [K in OffsetAxis]?: number };

/**
 * @deprecated will be removed in 3.0
 */
export interface OffsetObject {
  offset?: number;
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}

/**
 * @deprecated will be removed in 3.0
 */
export const useOffset = (params: number | Offset): OffsetObject => {
  if (typeof params === 'number') {
    return {
      offset: params,
      top: params,
      bottom: params,
      left: params,
      right: params
    };
  }

  const keysLength = Object.keys(params).length;
  const hasAxis = params.vertical !== undefined && params.horizontal !== undefined;
  const hasAllSides =
    params.top !== undefined &&
    params.left !== undefined &&
    params.right !== undefined &&
    params.bottom !== undefined;
  const isOnlyAxis = keysLength === 2 && hasAxis;
  const isOnlyAllSides = keysLength === 4 && hasAllSides;
  const isOnlyAxisAndSides = keysLength === 6 && hasAxis && hasAllSides;

  if (isOnlyAxis || isOnlyAllSides || isOnlyAxisAndSides) {
    let isEqual = true;
    let value;
    let key: keyof Offset;
    for (key in params) {
      if (!isEqual) {
        continue;
      }

      if (value === undefined) {
        value = params[key];
        continue;
      }

      if (params[key] !== value) {
        isEqual = false;
      }
    }

    if (isEqual) {
      return {
        offset: value,
        top: value,
        bottom: value,
        left: value,
        right: value
      };
    }
  }

  const result: OffsetObject = {};
  for (const key in params) {
    switch (key) {
      case OffsetAxis.vertical:
        result.top = params[key];
        result.bottom = params[key];
        break;
      case OffsetAxis.horizontal:
        result.left = params[key];
        result.right = params[key];
        break;
      case OffsetAxis.top:
      case OffsetAxis.left:
      case OffsetAxis.right:
      case OffsetAxis.bottom:
        result[key] = params[key];
        break;
    }
  }

  return result;
};
