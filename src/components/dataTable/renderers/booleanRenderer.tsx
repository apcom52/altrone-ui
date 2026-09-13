import { CellRenderer } from '../DataTable.types';
import { Check, Minus } from 'lucide-react';
import s from './styles.module.scss';
import { Skeleton } from 'components/skeleton';

export const BooleanRenderer = <T extends object>({
  value,
  table,
}: CellRenderer<T>) => {
  const mode = table.options.meta?.mode;

  if (mode === 'loading') {
    return (
      <div className={s.Boolean}>
        <Skeleton width="32px" height="32px" radius="16px" />
      </div>
    );
  }
  return <div className={s.Boolean}>{value ? <Check /> : <Minus />}</div>;
};
