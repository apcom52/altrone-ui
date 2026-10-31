import { CellRenderer } from '../DataTable.types';
import { ColorPicker } from 'components/colorPicker';
import s from './styles.module.scss';
import { Skeleton } from 'components/skeleton';

export const ColorRenderer = <T extends object>({
  value,
  table,
}: CellRenderer<T>) => {
  const mode = table.options.meta?.mode;

  if (mode === 'loading') {
    return (
      <div className={s.Color}>
        <Skeleton width="100%" height="32px" radius="16px" />
      </div>
    );
  }

  return (
    <ColorPicker
      value={String(value)}
      onChange={() => null}
      readOnly
      className={s.Color}
    />
  );
};
