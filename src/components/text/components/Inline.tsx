import { createElement, memo } from 'react';
import { TextInlineProps } from '../Text.types.ts';
import clsx from 'clsx';
import s from './inline.module.scss';
import { Size } from '../../../types';

export const Inline = memo(
  ({
    children,
    className,
    size = Size.medium,
    bold,
    italic,
    underline,
    deleted,
    highlighted,
    ...props
  }: TextInlineProps) => {
    const cls = clsx(
      {
        [s.Bold]: bold,
        [s.Italic]: italic,
        [s.Underline]: underline,
        [s.Deleted]: deleted,
        [s.Highlighted]: highlighted,
      },
      className,
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

    return createElement(
      tagName,
      {
        className: cls,
        ...props,
      },
      children,
    );
  },
);
