import { createElement, memo } from 'react';
import { TextInlineProps } from '../Text.types.ts';
import clsx from 'clsx';
import s from './inline.module.scss';
import { useConfiguration } from '../../configuration/AltroneConfiguration.context.ts';

export const Inline = memo(
  ({
    children,
    className,
    bold,
    italic,
    underline,
    deleted,
    highlighted,
    style,
    ...props
  }: TextInlineProps) => {
    const { textInline = {} } = useConfiguration();

    const cls = clsx(
      {
        [s.Bold]: bold,
        [s.Italic]: italic,
        [s.Underline]: underline,
        [s.Deleted]: deleted,
        [s.Highlighted]: highlighted,
      },
      className,
      textInline.className,
    );

    let tagName = 'span';
    if (highlighted) {
      tagName = 'mark';
    } else if (deleted) {
      tagName = 'del';
    } else if (bold) {
      tagName = 'strong';
    } else if (italic) {
      tagName = 'em';
    } else if (underline) {
      tagName = 'u';
    }

    const styles = {
      ...textInline.style,
      ...style,
    };

    return createElement(
      tagName,
      {
        className: cls,
        style: styles,
        ...props,
      },
      children,
    );
  },
);
