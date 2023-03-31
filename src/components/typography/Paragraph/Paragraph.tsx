import { WithAltroneOffsets, WithoutDefaultOffsets } from '../../../types';
import { memo } from 'react';
import './paragraph.scss';
import clsx from 'clsx';

interface ParagraphProps extends WithoutDefaultOffsets, WithAltroneOffsets {}

const Paragraph = ({ children, className, ...props }: ParagraphProps) => {
  return (
    <p className={clsx('alt-paragraph', className)} {...props}>
      {children}
    </p>
  );
};

export default memo(Paragraph);
