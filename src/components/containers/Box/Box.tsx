import {forwardRef, memo} from "react";
import {WithoutDefaultOffsets, WithAltroneOffsets} from "../../../types";
import {ZERO_MARGIN, ZERO_PADDING} from "../../../constants";
import {useMargin, usePadding} from "../../../hooks";

interface BoxProps extends WithoutDefaultOffsets, WithAltroneOffsets {
  tagName?: keyof JSX.IntrinsicElements
}

const Box = forwardRef(({ margin = ZERO_MARGIN, padding = ZERO_PADDING, children, tagName = 'div', style, ...props }: BoxProps, ref) => {
  const marginStyles = useMargin(margin)
  const paddingStyles = usePadding(padding)

  const TagName = tagName

  // @ts-ignore
  return <TagName style={{
    ...marginStyles,
    ...paddingStyles,
    ...style
  }}
    ref={ref}
    {...props}
  >
    {children}
  </TagName>
})

export default memo(Box)