import { CellRenderer } from '../DataTable.types';
import { Text } from '../../text';
import s from './styles.module.scss';

export const PasswordRenderer = <T extends object>({
  value,
}: CellRenderer<T>) => {
  return (
    <Text size={4} weight="medium" className={s.Password}>
      {new Array(String(value).length).fill('*').join('')}
    </Text>
  );
};
