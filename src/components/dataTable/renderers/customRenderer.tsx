import { CellRenderer } from '../DataTable.types';
import { Text } from '../../text';
import s from './styles.module.scss';
import { Skeleton } from 'components/skeleton';

export const CustomRenderer = <T extends object>({
  value,
  item,
  columnConfig,
  table,
}: CellRenderer<T>) => {
  const mode = table.options.meta?.mode;

  if (mode === 'loading') {
    return (
      <div className={s.Custom}>
        {columnConfig.type === 'custom' &&
        columnConfig.options?.renderLoadingMode ? (
          columnConfig.options?.renderLoadingMode?.({
            value,
            item,
            columnConfig,
            table,
          })
        ) : (
          <Skeleton width="100%" height="20px" radius="10px" />
        )}
      </div>
    );
  }
  const renderReadMode =
    columnConfig.type === 'custom'
      ? columnConfig.options?.renderReadMode
      : undefined;

  return (
    <div className={s.Custom}>
      <Text size={4} weight="medium" block>
        {renderReadMode?.({ value, item, columnConfig, table })}
      </Text>
    </div>
  );
};
