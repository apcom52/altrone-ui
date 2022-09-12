import {memo} from "react";
import {WithoutDefaultOffsets, WithAltroneOffsets} from "../../../types";
import {PADDING, ZERO_MARGIN} from "../../../constants";
import {useMargin, usePadding} from "../../../hooks";

interface BoxProps extends WithoutDefaultOffsets, WithAltroneOffsets {
  tagName?: keyof JSX.IntrinsicElements
}

const Box = ({ margin = ZERO_MARGIN, padding = PADDING, children, tagName = 'div' }: BoxProps) => {
  const marginStyles = useMargin(margin)
  const paddingStyles = usePadding(padding)

  const TagName = tagName

  return <TagName style={{
    ...marginStyles,
    ...paddingStyles
  }}>
    {children}
  </TagName>
}

export default memo(Box)