import { ListItemProps } from '../List.types';
import { Text } from 'components/text';
import s from './item.module.scss';
import { motion } from 'motion/react';
import clsx from 'clsx';

export const Item = ({
  itemKey,
  title,
  selected,
  description,
  icon,
  meta,
  disabled,
  onSelect,
  className,
  style,
}: ListItemProps) => {
  const cls = clsx(s.Item, className, {
    [s.Selected]: selected,
    [s.Disabled]: disabled,
  });

  const styles = {
    ...style,
  };

  const handleClick = () => {
    if (disabled) return;
    onSelect?.(itemKey);
  };

  return (
    <div className={cls} style={styles} onClick={handleClick}>
      <div className={s.Icon}>{icon}</div>
      <div className={s.Content}>
        <div className={s.TitleBlock}>
          <Text className={s.Title} weight="bold" size={4}>
            {title}
          </Text>
          {meta && (
            <Text className={s.Meta} size={3}>
              {meta}
            </Text>
          )}
        </div>
        {description && <div className={s.Description}>{description}</div>}
      </div>
    </div>
  );
};
