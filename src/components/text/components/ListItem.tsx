import { TextListItemProps } from '../Text.types.ts';
import s from './list.module.scss';
import clsx from 'clsx';
import { useConfiguration } from 'components/configuration';

export const ListItem = ({
  children,
  className,
  style,
  ...props
}: TextListItemProps) => {
  const { text: { listItem: listItemConfig = {} } = {} } = useConfiguration();

  const cls = clsx(s.ListItem, className, listItemConfig.className);

  const styles = {
    ...listItemConfig.style,
    ...style,
  };

  return (
    <li className={cls} style={styles} {...props}>
      {children}
    </li>
  );
};
