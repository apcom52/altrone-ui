import { CellRenderer } from '../DataTable.types';
import s from './styles.module.scss';
import { Text } from '../../text';
import { Skeleton } from 'components/skeleton';

export const TextRenderer = <T extends object>({
  value,
  table,
}: CellRenderer<T>) => {
  const mode = table.options.meta?.mode;

  if (mode === 'loading') {
    return (
      <div className={s.Text}>
        <Skeleton width="100%" height="64px" radius="16px" />
      </div>
    );
  }

  return (
    <div className={s.Text}>
      <Text size={4} weight="medium">
        {String(value ?? '')}
      </Text>
    </div>
  );
};
