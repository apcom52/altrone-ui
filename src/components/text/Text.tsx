import React, { memo } from 'react';
import type { TextProps } from './Text.types.ts';
import clsx from 'clsx';
import s from './text.module.scss';

// Internal permissive type — unions all variants for implementation convenience.
// The public API is constrained by the TextProps union in the cast below.
interface TextImplProps extends React.AnchorHTMLAttributes<HTMLElement> {
  size?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  block?: boolean;
  weight?: 'light' | 'regular' | 'medium' | 'bold';
  list?: 'numeric' | 'marked';
  item?: boolean;
  italic?: boolean;
  underline?: boolean;
  deleted?: boolean;
  highlighted?: boolean;
  href?: string;
  external?: boolean;
  code?: boolean;
  kbd?: boolean;
  truncate?: boolean;
  lineClamp?: number;
  align?: 'start' | 'center' | 'end' | 'justify';
  color?: 'success' | 'danger' | 'muted' | 'warning';
  nowrap?: boolean;
  asChild?: boolean;
  ref?: React.Ref<HTMLElement>;
}

const TextImpl = ({
  children,
  size,
  block = false,
  weight = 'regular',
  list,
  item = false,
  italic = false,
  underline = false,
  deleted = false,
  highlighted = false,
  href,
  external,
  className,
  style,
  code,
  kbd,
  truncate,
  lineClamp,
  align,
  color,
  nowrap,
  asChild,
  ref,
  ...restProps
}: TextImplProps) => {
  const cls = clsx(
    s.Text,
    {
      [s.Block]: block,
      [s.WeightMedium]: weight === 'medium',
      [s.WeightBold]: weight === 'bold',
      [s.WeightLight]: weight === 'light',
      [s.Size1]: size === 1,
      [s.Size2]: size === 2,
      [s.Size3]: size === 3,
      [s.Size4]: size === 4,
      [s.Size5]: size === 5,
      [s.Size6]: size === 6,
      [s.Size7]: size === 7,
      [s.Size8]: size === 8,
      [s.Size9]: size === 9,
      [s.Item]: item,
      [s.List]: list === 'numeric' || list === 'marked',
      [s.Italic]: italic,
      [s.Underline]: underline,
      [s.Deleted]: deleted,
      [s.Highlighted]: highlighted,
      [s.Link]: href,
      [s.Code]: code,
      [s.Kbd]: kbd,
      [s.Truncate]: truncate,
      [s.LineClamp]: lineClamp !== undefined,
      [s.Nowrap]: nowrap,
      [s.AlignStart]: align === 'start',
      [s.AlignCenter]: align === 'center',
      [s.AlignEnd]: align === 'end',
      [s.AlignJustify]: align === 'justify',
      [s.ColorMuted]: color === 'muted',
      [s.ColorDanger]: color === 'danger',
      [s.ColorSuccess]: color === 'success',
      [s.ColorWarning]: color === 'warning',
    },
    className,
  );

  const styles: React.CSSProperties & Record<string, unknown> = {
    ...style,
    ...(lineClamp !== undefined ? { '--_text-line-clamp': lineClamp } : {}),
  };

  if (asChild) {
    if (!React.isValidElement(children)) {
      if (import.meta.env.DEV) {
        console.warn(
          '[Text] asChild={true} requires a single React element as children.',
        );
      }
      return null;
    }
    const child = children as React.ReactElement<Record<string, unknown>>;
    return React.cloneElement(child, {
      ...restProps,
      className: clsx(cls, child.props['className'] as string | undefined),
      style: {
        ...styles,
        ...(child.props['style'] as React.CSSProperties | undefined),
      },
      ref,
    });
  }

  let tagName = 'span';
  if (block) {
    tagName = 'p';
  } else if (list === 'numeric') {
    tagName = 'ol';
  } else if (list === 'marked') {
    tagName = 'ul';
  } else if (item) {
    tagName = 'li';
  } else if (href) {
    tagName = 'a';
  }

  const Tag = tagName as React.ElementType;

  const { target, rel, ...otherRestProps } = restProps;

  return (
    <Tag
      className={cls}
      style={styles}
      ref={ref}
      {...otherRestProps}
      {...(tagName === 'a'
        ? {
            href,
            target: external ? '_blank' : target,
            rel: external ? 'noopener noreferrer' : rel,
          }
        : {})}
    >
      {children}
    </Tag>
  );
};

export const Text = memo(TextImpl) as React.MemoExoticComponent<
  (props: TextProps) => React.ReactElement | null
>;
