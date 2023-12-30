import { memo, useMemo } from 'react';
import './data-table-header.scss';
import DataTableSorting from './DataTableSorting';
import { Icon } from '../../typography';
import DataTableFiltering from './DataTableFiltering';
import { useLocalization, useToggledState, useWindowSize } from '../../../hooks';
import { Search, Button, ButtonVariant } from '../../form';
import {
  DataTableSelectableAction,
  DataTableAction as DataTableActionType
} from './DataTableAction.types';
import { useDataTableContext } from './DataTable.context';
import DataTableAction from './DataTableAction';

interface DataTableHeaderProps<T extends object> {
  actions: DataTableActionType[];
  selectableActions: DataTableSelectableAction<T>[];
  selectable: boolean;
}

const DataTableHeader = <T extends object>({
  actions = [],
  selectableActions = [],
  selectable
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

  const searchVisible = useToggledState(false);

  const t = useLocalization();

  const { ltePhoneL, gtPhoneL } = useWindowSize();

  const currentSortingColumn = useMemo(() => {
    if (!sortBy) return null;

    return columns.find((column) => column.accessor === sortBy) || null;
  }, [columns, sortBy]);

  const dataTableActions = useMemo(() => {
    const result = [...(selectableMode ? selectableActions : actions)];

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
        content: DataTableSorting
      });
    }

    if (!selectableMode && filters.length) {
      result.push({
        label: t('data.dataTable.filters'),
        icon: <Icon i="tune" style="outlined" />,
        content: DataTableFiltering,
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
            {(gtPhoneL || (ltePhoneL && !searchVisible.value)) && (
              <div className="alt-data-table-header__actions">
                {dataTableActions.map((action, actionIndex) => (
                  <DataTableAction key={actionIndex} {...action} />
                ))}
              </div>
            )}
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
