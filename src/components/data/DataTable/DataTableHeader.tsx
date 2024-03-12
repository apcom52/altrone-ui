import { memo, useMemo } from 'react';
import './data-table-header.scss';
import { Icon } from '../../typography';
import { useLocalization, useToggledState, useWindowSize } from '../../../hooks';
import { Search, Button, ButtonVariant } from '../../form';
import { useDataTableContext } from './DataTable.context';
import { DataTableProps } from './DataTable.types';
import { getSafeArray } from '../../../utils/safeArray';
import { DataTable } from './DataTable';
import { DataTableSorting } from './DataTableSorting';
import { DataTableFiltering } from './DataTableFiltering';

interface DataTableHeaderProps<T extends object> {
  children: DataTableProps<T>['children'];
  selectable: boolean;
}

const DataTableHeader = <T extends object>({ children, selectable }: DataTableHeaderProps<T>) => {
  const {
    initialData,
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
    setSelectableMode,
    selectedRows
  } = useDataTableContext();

  const searchVisible = useToggledState(false);

  const t = useLocalization();

  const { ltePhoneL, gtPhoneL } = useWindowSize();

  const currentSortingColumn = useMemo(() => {
    if (!sortBy) return null;

    return columns.find((column) => column.accessor === sortBy) || null;
  }, [columns, sortBy]);

  const selectedItems = useMemo(() => {
    return selectedRows.map((index) => initialData[index] as T);
  }, [selectedRows, initialData]);

  // const dataTableActions = useMemo(() => {
  //   const result = [...(selectableMode ? selectableActions : actions)];
  //
  //   if (selectable) {
  //     result.unshift({
  //       label: t('data.dataTable.select'),
  //       icon: <Icon i={selectableMode ? 'check_box_outline_blank' : 'check_box'} />,
  //       onClick: () => setSelectableMode(!selectableMode),
  //       isIcon: true,
  //       disabled: false
  //     });
  //   }
  //
  //   if (!selectableMode && sortKeys.length) {
  //     result.push({
  //       label: t('data.dataTable.sort'),
  //       icon: <Icon i="swap_vert" />,
  //       content: DataTableSorting
  //     });
  //   }
  //
  //   if (!selectableMode && filters.length) {
  //     result.push({
  //       label: t('data.dataTable.filters'),
  //       icon: <Icon i="tune" style="outlined" />,
  //       content: DataTableFiltering,
  //       indicator:
  //         appliedFilters.length > 0
  //           ? {
  //               position: 'baseline',
  //               value: appliedFilters.length
  //             }
  //           : undefined
  //     });
  //   }
  //
  //   return result;
  // }, [
  //   actions,
  //   sortKeys,
  //   sortBy,
  //   currentSortingColumn,
  //   filters,
  //   appliedFilters,
  //   selectable,
  //   selectableMode
  // ]);

  const childrenActions =
    typeof children === 'function'
      ? children({
          selectableMode,
          selectedItems: selectedItems
        })
      : children;

  const safeChildrenArray = getSafeArray(childrenActions);

  const isHeaderVisible = Boolean(
    sortKeys.length || filters.length || searchBy || selectable || safeChildrenArray.length
  );

  if (!isHeaderVisible) {
    return null;
  }

  const actionsContainer = (
    <div className="alt-data-table-header__actions">
      {selectable && (
        <DataTable.Action
          label={t('data.dataTable.select')}
          icon={<Icon i={selectableMode ? 'check_box_outline_blank' : 'check_box'} />}
          onClick={() => setSelectableMode(!selectableMode)}
          showLabel={false}
        />
      )}
      {childrenActions}
      {!selectableMode && sortKeys.length ? <DataTableSorting /> : null}
      {!selectableMode && filters.length ? <DataTableFiltering /> : null}
    </div>
  );

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
            {gtPhoneL || (ltePhoneL && !searchVisible.value) ? actionsContainer : null}
            {searchBy && !searchVisible.value ? (
              ltePhoneL ? (
                <Button variant={ButtonVariant.transparent} isIcon onClick={searchVisible.enable}>
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
            {searchBy && searchVisible.value ? (
              <>
                <Button
                  variant={ButtonVariant.text}
                  onClick={searchVisible.disable}
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
