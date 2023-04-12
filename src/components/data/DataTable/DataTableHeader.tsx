import { memo, useMemo, useState } from 'react';
import './data-table-header.scss';
import { Button, ButtonVariant } from '../../button';
import { InputIslandType, TextInput } from '../../form';
import DataTableSorting from './DataTableSorting';
import { Icon } from '../../icons';
import DataTableFiltering from './DataTableFiltering';
import { useDataTableContext } from '../../../contexts';
import { useLocalization, useWindowSize } from '../../../hooks';
import { DataTableAction as DataTableActionType, DataTableSelectableAction } from './DataTable';
import DataTableAction from './DataTableAction';
import { Search } from '../../form/Search';

interface DataTableHeaderProps<T> {
  actions: (DataTableSelectableAction<T> | DataTableActionType)[];
  selectable: boolean;
}

const DataTableHeader = <T extends object>({
  actions = [],
  selectable = false
}: DataTableHeaderProps<T>) => {
  const {
    search,
    setSearch,
    sortKeys,
    sortBy,
    columns,
    appliedFilters,
    filters,
    searchBy,
    mobileColumns,
    selectableMode,
    setSelectableMode
  } = useDataTableContext();
  const [isSearchVisible, setIsSearchVisible] = useState(false);

  const t = useLocalization();

  const { ltePhoneL, gtPhoneL } = useWindowSize();

  const currentSortingColumn = useMemo(() => {
    if (!sortBy) return null;

    return columns.find((column) => column.accessor === sortBy) || null;
  }, [columns, sortBy]);

  const dataTableActions = useMemo(() => {
    const result: DataTableActionType[] = [...actions];

    if (selectable) {
      result.unshift({
        label: t('data.dataTable.select'),
        icon: <Icon i={selectableMode ? 'check_box_outline_blank' : 'check_box'} />,
        onClick: () => setSelectableMode(!selectableMode),
        isIcon: true,
        disabled: false
      });
    }

    if (!selectableMode && sortKeys.length) {
      result.push({
        label: t('data.dataTable.sort'),
        icon: <Icon i="swap_vert" />,
        content: (args) => <DataTableSorting {...args} />
      });
    }

    if (!selectableMode && filters.length) {
      result.push({
        label: t('data.dataTable.filters'),
        icon: <Icon i="tune" style="outlined" />,
        content: (args) => <DataTableFiltering {...args} />,
        indicator:
          appliedFilters.length > 0
            ? {
                position: 'baseline',
                value: appliedFilters.length
              }
            : undefined
      });
    }

    return result;
  }, [
    actions,
    sortKeys,
    sortBy,
    currentSortingColumn,
    filters,
    appliedFilters,
    selectable,
    selectableMode
  ]);

  return (
    <>
      <tr className="alt-data-table-header-wrapper" data-testid="alt-test-datatable-header">
        <th
          colSpan={
            ltePhoneL
              ? mobileColumns.length + (selectableMode ? 2 : 1)
              : selectableMode
              ? columns.length + 1
              : columns.length
          }>
          <div className="alt-data-table-header">
            {(gtPhoneL || (ltePhoneL && !isSearchVisible)) && (
              <div className="alt-data-table-header__actions">
                {dataTableActions.map((action, actionIndex) => (
                  <DataTableAction key={actionIndex} {...action} />
                ))}
              </div>
            )}
            {searchBy && !isSearchVisible ? (
              ltePhoneL ? (
                <Button
                  variant={ButtonVariant.transparent}
                  isIcon
                  onClick={() => setIsSearchVisible(true)}>
                  <Icon i="search" />
                </Button>
              ) : (
                <div
                  className="alt-data-table-header__search"
                  data-testid="alt-test-datatable-search">
                  <Search value={search} onChange={setSearch} />
                </div>
              )
            ) : null}
            {searchBy && isSearchVisible ? (
              <>
                <Button
                  variant={ButtonVariant.text}
                  onClick={() => setIsSearchVisible(false)}
                  isIcon={ltePhoneL}>
                  <Icon i="arrow_forward_ios" />
                </Button>

                <div
                  className="alt-data-table-header__search"
                  data-testid="alt-test-datatable-search">
                  <Search value={search} onChange={setSearch} />
                </div>
              </>
            ) : null}
          </div>
        </th>
      </tr>
    </>
  );
};

export default memo(DataTableHeader) as typeof DataTableHeader;
