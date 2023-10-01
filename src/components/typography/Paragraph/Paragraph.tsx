import { WithAltroneOffsets, WithoutDefaultOffsets } from '../../../types';
import './paragraph.scss';
import clsx from 'clsx';

interface ParagraphProps extends WithoutDefaultOffsets, WithAltroneOffsets {}

/**
 * This component is used to display a raw text
 * @param children
 * @param className
 * @param props
 * @constructor
 */
const Paragraph = ({ children, className, ...props }: ParagraphProps) => {
  return (
    <p className={clsx('alt-paragraph', className)} {...props}>
      {children}
    </p>
  );
};

export default Paragraph;
