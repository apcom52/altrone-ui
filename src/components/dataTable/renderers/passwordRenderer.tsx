import { CellRenderer } from '../DataTable.types';
import { Text } from '../../text';
import s from './styles.module.scss';
import { Skeleton } from 'components/skeleton';

export const PasswordRenderer = <T extends object>({
  value,
  table,
}: CellRenderer<T>) => {
  const mode = table.options.meta?.mode;

  if (mode === 'loading') {
    return (
      <div className={s.Password}>
        <Skeleton width="100%" height="20px" radius="10px" />
      </div>
    );
  }

  return (
    <Text size={4} weight="medium" className={s.Password}>
      {new Array(String(value).length).fill('*').join('')}
    </Text>
  );
};
