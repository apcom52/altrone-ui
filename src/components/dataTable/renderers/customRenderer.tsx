import { CellRenderer } from '../DataTable.types';
import { Text } from '../../text';
import s from './styles.module.scss';

export const CustomRenderer = <T extends object>({
  value,
  item,
  columnConfig,
}: CellRenderer<T>) => {
  const renderReadMode =
    columnConfig.type === 'custom'
      ? columnConfig.options?.renderReadMode
      : undefined;

  return (
    <div className={s.Custom}>
      <Text size={4} weight="medium" block>
        {renderReadMode?.({ value, item, columnConfig })}
      </Text>
    </div>
  );
};
