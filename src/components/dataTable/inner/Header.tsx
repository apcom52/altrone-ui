import { memo, useMemo } from 'react';
import { Icon } from 'components/icon';
import { Button } from 'components/button';
import { useDataTableContext } from '../DataTable.context';
import { DataTableProps } from '../DataTable.types';
import { getSafeArray } from 'utils';
import s from './header.module.scss';
import { Filtering } from './Filtering.tsx';

interface DataTableHeaderProps<T extends object> {
  children: DataTableProps<T>['children'];
  selectable: boolean;
}

const DataTableHeader = <T extends object>({
  children,
  selectable,
}: DataTableHeaderProps<T>) => {
  const {
    initialData,
    filters,
    searchBy,
    columns,
    selectableMode,
    selectedRows,
    setSelectableMode,
  } = useDataTableContext();

  const selectedItems = useMemo(() => {
    return selectedRows.map((index) => initialData[index] as T);
  }, [selectedRows, initialData]);

  const childrenActions =
    typeof children === 'function'
      ? children({
          selectableMode,
          selectedItems: selectedItems,
        })
      : children;

  const safeChildrenArray = getSafeArray(childrenActions);

  const isHeaderVisible = Boolean(
    filters.length || searchBy || selectable || safeChildrenArray.length,
  );

  const columnsWithFilters = useMemo(() => {
    return columns.filter((item) => item.filterable);
  }, [columns]);

  const selectableButton = selectable ? (
    <Button
      leftIcon={
        <Icon i={selectableMode ? 'check_box_outline_blank' : 'check_box'} />
      }
      onClick={() => setSelectableMode(!selectableMode)}
      title={selectableMode ? 'Disable selectable mode' : 'Select rows'}
    />
  ) : null;

  if (!isHeaderVisible) {
    return null;
  }

  const actionsContainer = (
    <div className={s.Actions}>
      {selectableButton}
      {childrenActions}
      {columnsWithFilters.length > 0 ? <Filtering /> : null}
    </div>
  );

  return <div className={s.Header}>{actionsContainer}</div>;
};

export default memo(DataTableHeader) as typeof DataTableHeader;
