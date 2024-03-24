import { TextListItemProps } from '../Text.types.ts';
import s from './list.module.scss';
import clsx from 'clsx';

export const ListItem = ({
  children,
  className,
  ...props
}: TextListItemProps) => {
  const cls = clsx(s.ListItem, className);

  return (
    <li className={cls} {...props}>
      {children}
    </li>
  );
};
