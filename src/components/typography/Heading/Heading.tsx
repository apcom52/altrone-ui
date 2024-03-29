import { WithAltroneOffsets, WithoutDefaultOffsets } from '../../../types';
import React, { memo } from 'react';
import './heading.scss';
import clsx from 'clsx';

interface HeadingProps extends WithoutDefaultOffsets, WithAltroneOffsets {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  id?: string;
}

const Heading = ({ children, level = 1, ...props }: HeadingProps) => {
  const HeadingTag = `h${level >= 1 && level <= 6 ? level : 1}`;

  return React.createElement(
    HeadingTag,
    {
      ...props,
      className: clsx('alt-heading', `alt-heading--level-${level}`, props.className)
    },
    children
  );
};

export default Heading;
