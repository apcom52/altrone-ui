import {Offset, useOffset} from "./useOffset";

const OFFSET_WIDTH = 4

interface PaddingStyles {
  padding?: number | string
  paddingTop?: number
  paddingLeft?: number
  paddingRight?: number
  paddingBottom?: number
}

export const usePadding = (params: number | Offset) => {
  const offsets = useOffset(params)

  if (offsets.offset !== undefined) {
    return {
      padding: offsets.offset * OFFSET_WIDTH
    }
  }

  const result: PaddingStyles = {}

  const { top, bottom, left, right } = offsets

  if (Object.keys(offsets).length === 4) {
    const paddingValue = []

    if (top === bottom && left === right) {
      paddingValue.push(top, left)
    } else if (left === right) {
      paddingValue.push(top, left, bottom)
    } else {
      paddingValue.push(top, left, bottom, right)
    }

    result.padding = paddingValue.map(value => value * OFFSET_WIDTH).join('px ') + 'px'
  } else {
    if (top !== undefined) {
      result.paddingTop = top * OFFSET_WIDTH
    }

    if (left !== undefined) {
      result.paddingLeft = left * OFFSET_WIDTH
    }

    if (right !== undefined) {
      result.paddingRight = right * OFFSET_WIDTH
    }

    if (bottom !== undefined) {
      result.paddingBottom = bottom * OFFSET_WIDTH
    }
  }

  return result
}