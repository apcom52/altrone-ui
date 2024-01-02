import './paragraph.scss';
import clsx from 'clsx';

/**
 * This component is used to display a raw text
 * @param children
 * @param className
 * @param props
 * @constructor
 */
const Paragraph = ({ children, className, ...props }: React.HTMLProps<HTMLParagraphElement>) => {
  return (
    <p className={clsx('alt-paragraph', className)} {...props}>
      {children}
    </p>
  );
};

export default Paragraph;
