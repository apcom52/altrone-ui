import { TextProps } from './Text.types';
import './text.scss';
import clsx from 'clsx';
import { createElement } from 'react';

export const Text = ({
  children,
  role = 'text',
  color = 'default',
  deleted,
  maxChars = 10,
  bold,
  italic,
  link,
  underline,
  highlighted,
  ellipsis = false,
  className
}: TextProps) => {
  let tagName = 'span';
  if (role === 'keyboard') {
    tagName = 'kbd';
  } else if (role === 'code') {
    tagName = 'code';
  } else if (link) {
    tagName = 'a';
  } else if (highlighted) {
    tagName = 'mark';
  } else if (deleted) {
    tagName = 'del';
  } else if (underline) {
    tagName = 'u';
  } else if (italic) {
    tagName = 'em';
  } else if (bold) {
    tagName = 'strong';
  }

  return createElement(
    tagName,
    {
      className: clsx('alt-text', className, {
        'alt-text--bold': bold,
        'alt-text--italic': italic,
        'alt-text--underline': underline,
        'alt-text--deleted': deleted,
        'alt-text--code': role === 'code',
        'alt-text--highlighted': highlighted,
        'alt-text--ellipsis': ellipsis,
        'alt-text--label': role === 'label',
        'alt-text--keyboard': role === 'keyboard',
        'alt-text--link': link,
        [`alt-text--color-${color}`]: color !== 'default'
      }),
      href: link || undefined,
      style: {
        maxWidth: ellipsis ? `${maxChars}ch` : undefined
      },
      title: ellipsis ? children : undefined
    },
    children
  );
};
