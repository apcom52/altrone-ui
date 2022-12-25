import { WithAltroneOffsets, WithoutDefaultOffsets } from '../../../types';
import { memo } from 'react';
import { Box } from '../../containers/Box';
import './blockquote.scss';
import clsx from 'clsx';

interface BlockquoteProps extends WithoutDefaultOffsets, WithAltroneOffsets {
  cite?: string;
  author?: string;
  classNames?: {
    content?: string;
    author?: string;
  };
  innerProps?: {
    content?: React.HTMLProps<HTMLQuoteElement>;
    author: React.HTMLProps<HTMLDivElement>;
  };
}

const Blockquote = ({
  children,
  className,
  author,
  classNames = {},
  innerProps,
  cite,
  ...props
}: BlockquoteProps) => {
  return (
    <figure className={clsx('alt-blockquote', className)} {...props}>
      <Box
        tagName="blockquote"
        cite={cite}
        className={clsx('alt-blockquote__content', classNames.content)}
        {...innerProps?.content}
      >
        {children}
      </Box>
      {author && (
        <figcaption>
          <cite
            className={clsx('alt-blockquote__author', classNames.author)}
            {...innerProps?.author}
          >
            {author}
          </cite>
        </figcaption>
      )}
    </figure>
  );
};

export default memo(Blockquote);
