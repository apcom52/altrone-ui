import { CellRenderer } from '../DataTable.types';
import s from './styles.module.scss';
import { Text } from '../../text';
import { Skeleton } from 'components/skeleton';

export const SelectRenderer = <T extends object>({
  value,
  table,
}: CellRenderer<T>) => {
  const mode = table.options.meta?.mode;

  if (mode === 'loading') {
    return (
      <div className={s.Select}>
        <Skeleton width="100%" height="20px" radius="10px" />
      </div>
    );
  }

  const arrayValue = Array.isArray(value) ? value : [value];

  return (
    <Text size={4} weight="medium" className={s.Select}>
      {arrayValue.map((item) => item).join(', ')}
    </Text>
  );
};
