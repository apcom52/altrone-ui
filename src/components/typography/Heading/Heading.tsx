import { WithAltroneOffsets, WithoutDefaultOffsets } from '../../../types';
import React, { memo } from 'react';
import './heading.scss';
import clsx from 'clsx';

interface HeadingProps extends WithoutDefaultOffsets, WithAltroneOffsets {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

const Heading = ({ children, level = 1, ...props }: HeadingProps) => {
  const HeadingTag = `h${level >= 1 && level <= 6 ? level : 1}`;

  return React.createElement(
    HeadingTag,
    {
      className: clsx('alt-heading', `alt-heading--level-${level}`, props.className),
      ...props
    },
    children
  );
};

export default memo(Heading) as typeof Heading;
