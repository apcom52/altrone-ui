import { forwardRef, memo } from 'react';
import { WithAltroneOffsets, WithoutDefaultOffsets } from '../../../types';
import { ZERO_MARGIN, ZERO_PADDING } from '../../../constants';
import { useMargin, usePadding } from '../../../hooks';

interface BoxProps extends WithoutDefaultOffsets, WithAltroneOffsets {
  tagName?: keyof JSX.IntrinsicElements;
}

/**
 * @deprecated will be removed in 3.0
 */
export const Box = forwardRef(
  (
    {
      margin = ZERO_MARGIN,
      padding = ZERO_PADDING,
      children,
      tagName = 'div',
      style,
      ...props
    }: BoxProps,
    ref
  ) => {
    const marginStyles = useMargin(margin);
    const paddingStyles = usePadding(padding);

    const TagName = tagName;

    // @ts-ignore
    return (
      <TagName
        style={{
          ...marginStyles,
          ...paddingStyles,
          ...style
        }}
        ref={ref}
        {...props}>
        {children}
      </TagName>
    );
  }
);
