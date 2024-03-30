import { TextListItemProps } from '../Text.types.ts';
import s from './list.module.scss';
import clsx from 'clsx';
import { useConfiguration } from '../../configuration/AltroneConfiguration.context.ts';

export const ListItem = ({
  children,
  className,
  style,
  ...props
}: TextListItemProps) => {
  const { textListItem = {} } = useConfiguration();

  const cls = clsx(s.ListItem, className, textListItem.className);

  const styles = {
    ...textListItem.style,
    ...style,
  };

  return (
    <li className={cls} style={styles} {...props}>
      {children}
    </li>
  );
};
