import { CellRenderer } from '../DataTable.types';
import { ColorPicker } from 'components/colorPicker';
import s from './styles.module.scss';

export const ColorRenderer = <T extends object>({ value }: CellRenderer<T>) => {
  return (
    <ColorPicker
      value={String(value)}
      onChange={() => null}
      readOnly
      className={s.Color}
    />
  );
};
