import { memo, PropsWithChildren } from 'react';
import './blockquote.scss';
import clsx from 'clsx';

interface BlockquoteProps extends PropsWithChildren {
  cite?: string;
  className?: string;
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
      <blockquote cite={cite} className={clsx('alt-blockquote__content', classNames.content)}>
        {children}
      </blockquote>
      {author && (
        <figcaption>
          <cite
            className={clsx('alt-blockquote__author', classNames.author)}
            {...innerProps?.author}>
            {author}
          </cite>
        </figcaption>
      )}
    </figure>
  );
};

export default memo(Blockquote) as typeof Blockquote;
