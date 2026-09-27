import { CellRenderer } from '../DataTable.types';
import s from './styles.module.scss';
import { Skeleton } from 'components/skeleton';

export const BooleanRenderer = <T extends object>({
  value,
  table,
}: CellRenderer<T>) => {
  const meta = table.options.meta;

  if (meta?.mode === 'loading') {
    return (
      <div className={s.Boolean}>
        <Skeleton width="32px" height="32px" radius="16px" />
      </div>
    );
  }
  return (
    <div className={s.Boolean}>
      {value ? meta?.icons.booleanTrue : meta?.icons.booleanFalse}
    </div>
  );
};
