import { DataTableCellProps } from '../DataTableCell.tsx';
import { Icon } from '../../icon';
import s from './styles.module.scss';

export const DataTableBooleanRenderer = <T extends object>({
  value,
}: DataTableCellProps<T>) => {
  if (value === undefined || value === null) {
    return <div>—</div>;
  }

  const icon = Boolean(value) ? <Icon i="check" /> : <Icon i="close" />;

  return <div className={s.BooleanCell}>{icon}</div>;
};
