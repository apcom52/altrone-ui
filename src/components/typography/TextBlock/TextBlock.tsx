import { TextBlockProps } from './TextBlock.types';
import { createElement } from 'react';
import { Size } from '../../../types';
import clsx from 'clsx';
import './text-block.scss';

const HeadingSizes = {
  [Size.large]: 'h1',
  [Size.medium]: 'h2',
  [Size.small]: 'h3'
};

export const TextBlock = ({
  size = Size.medium,
  role = 'text',
  ellipsis = false,
  rows = 1,
  children,
  className,
  id
}: TextBlockProps) => {
  return createElement(
    role === 'text' ? 'p' : HeadingSizes[size],
    {
      className: clsx('alt-text-block', className, {
        'alt-text-block--role-heading': role === 'heading',
        'alt-text-block--ellipsis': ellipsis,
        [`alt-text-block--size-${size}`]: size !== Size.medium
      }),
      style: {
        '-webkit-line-clamp': ellipsis ? String(rows) : undefined
      },
      id
    },
    children
  );
};
