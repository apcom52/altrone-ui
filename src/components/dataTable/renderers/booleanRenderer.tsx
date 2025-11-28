import { CellRenderer } from '../DataTable.types';
import { Check, Minus } from 'lucide-react';
import s from './styles.module.scss';

export const BooleanRenderer = <T extends object>({
  value,
}: CellRenderer<T>) => {
  return <div className={s.Boolean}>{value ? <Check /> : <Minus />}</div>;
};
