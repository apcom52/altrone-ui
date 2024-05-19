import { memo, useMemo } from 'react';
import { Icon, Search, Button } from 'components';
import { useDataTableContext } from '../DataTable.context';
import { DataTableProps } from '../DataTable.types';
import { getSafeArray, useToggledState } from 'utils';
import s from './header.module.scss';

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
    search,
    setSearch,
    columns,
    appliedFilters,
    filters,
    searchBy,
    selectableMode,
    setSelectableMode,
    selectedRows,
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

  const selectableButton = selectable ? (
    <Button
      leftIcon={
        <Icon i={selectableMode ? 'check_box_outline_blank' : 'check_box'} />
      }
      transparent
    />
  ) : null;

  if (!isHeaderVisible) {
    return null;
  }

  const actionsContainer = (
    <div className={s.Actions}>
      {selectableButton}
      {childrenActions}
      <Button leftIcon={<Icon i="filter_alt" />} label="Filters" />
    </div>
  );

  return (
    <div className={s.Header}>
      {actionsContainer}
      <div className={s.Separator} />
      <div className={s.Search}>
        <Search getSuggestions={() => []} />
      </div>
    </div>
  );
};

export default memo(DataTableHeader) as typeof DataTableHeader;
