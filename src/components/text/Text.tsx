import { createElement, memo } from 'react';
import { TextProps } from './Text.types.ts';
import { useConfiguration } from '../configuration';
import clsx from 'clsx';
import s from './text.module.scss';
import { TextSizeContext, useTextSize } from './Text.context.ts';

export const Text = memo<TextProps>(
  ({
    children,
    size = undefined,
    block = false,
    weight = 'regular',
    list,
    item = false,
    italic = false,
    underline = false,
    deleted = false,
    highlighted = false,
    href,
    className,
    style,
    code,
    kbd,
    ...restProps
  }) => {
    const { text: textConfig = {} } = useConfiguration();

    const textSize = (size ? size : useTextSize()) || 3;

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

    const cls = clsx(
      s.Text,
      {
        [s.Text_block]: block,
        [s.WeightMedium]: weight === 'medium',
        [s.WeightBold]: weight === 'bold',
        [s.WeightLight]: weight === 'light',
        [s.Size1]: textSize === 1,
        [s.Size2]: textSize === 2,
        [s.Size3]: textSize === 3,
        [s.Size4]: textSize === 4,
        [s.Size5]: textSize === 5,
        [s.Size6]: textSize === 6,
        [s.Size7]: textSize === 7,
        [s.Size8]: textSize === 8,
        [s.Size9]: textSize === 9,
        [s.Item]: item,
        [s.List]: list === 'numeric' || list === 'marked',
        [s.Italic]: italic,
        [s.Underline]: underline,
        [s.Deleted]: deleted,
        [s.Highlighted]: highlighted,
        [s.Link]: href,
        [s.Code]: code,
        [s.Kbd]: kbd,
      },
      className,
      textConfig.className
    );

    const styles = {
      ...textConfig.style,
      ...style,
    };

    return createElement(tagName, {
      className: cls,
      style: styles,
      children: (
        <TextSizeContext.Provider value={textSize}>
          {children}
        </TextSizeContext.Provider>
      ),
      href,
      ...restProps,
    });
  }
);
