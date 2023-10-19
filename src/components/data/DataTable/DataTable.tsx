import { useCallback, useEffect, useMemo, useState } from 'react';
import DataTableHeader from './DataTableHeader';
import './data-table.scss';
import DataTableBody from './DataTableBody';
import DataTableHeaderRow from './DataTableHeaderRow';
import DataTableFooter from './DataTableFooter';
import { DataTableAppliedFilter, DataTableContext } from '../../../contexts';
import { ContextMenuType, Indicator, Sort } from '../../../types';

import {
  DataTableSearchFunc,
  DataTableSortFunc,
  defaultCheckboxesFilter,
  defaultCheckboxFilter,
  defaultDateFilter,
  defaultDateRangeFilter,
  defaultSearchFunc,
  defaultSelectFilter,
  defaultSortFunc
} from './functions';
import clsx from 'clsx';
import { DataTableCellProps } from './DataTableCell';
import DataTableFooterStatus from './DataTableFooterStatus';
import { DataTableFilter } from './DataTable.types';

export interface DataTableColumn<T> {
  accessor: keyof T;
  label?: string;
  width?: number | string;
  Component?: React.FC<DataTableCellProps>;
  visible?: boolean;
}

interface DataTableProps<T extends object> {
  data: T[];
  columns: DataTableColumn<T>[];
  limit?: number;
  searchBy?: keyof T;
  sortKeys?: (keyof T)[];
  sortFunc?: (params: DataTableSortFunc<T>) => number;
  searchFunc?: (params: DataTableSearchFunc<T>) => boolean;
  filters?: DataTableFilter<T>[];
  mobileColumns?: (keyof T)[];
  striped?: 'odd' | 'even';
  className?: string;
  actions?: DataTableAction[];
  selectable?: boolean;
  selectableActions?: DataTableSelectableAction<T>[];
  DataTableStatusComponent?: () => JSX.Element;
}

export interface DataTablePopupActionProps {
  closePopup: () => void;
}

export interface DataTableAction {
  icon: JSX.Element;
  label: string;
  onClick?: () => void;
  isIcon?: boolean;
  danger?: boolean;
  content?: (args: DataTablePopupActionProps) => JSX.Element;
  contextMenu?: ContextMenuType;
  indicator?: Indicator;
  disabled?: boolean;
}

export interface DataTableSelectableAction<T extends unknown>
  extends Omit<DataTableAction, 'onClick' | 'content'> {
  onClick?: (selectedRows: T[]) => void;
  content?: (args: DataTablePopupActionProps & { selectedRows?: T[] }) => JSX.Element;
}

/**
 * This component is used to show huge amount of data in table view
 * @param data
 * @param columns
 * @param limit
 * @param searchBy
 * @param searchFunc
 * @param sortFunc
 * @param sortKeys
 * @param filters
 * @param mobileColumns
 * @param className
 * @param actions
 * @param selectableActions
 * @param striped
 * @param selectable
 * @param DataTableStatusComponent
 * @constructor
 */
export const DataTable = <T extends object>({
  data = [],
  columns = [],
  limit = 20,
  searchBy,
  searchFunc = defaultSearchFunc,
  sortFunc = defaultSortFunc,
  sortKeys = [],
  filters = [],
  mobileColumns = columns.length ? [columns[0].accessor] : [],
  className,
  actions = [],
  selectableActions = [],
  striped,
  selectable = false,
  DataTableStatusComponent = DataTableFooterStatus
}: DataTableProps<T>) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<keyof T | null>(null);
  const [sortType, setSortType] = useState<Sort>(Sort.asc);
  const [appliedFilters, setAppliedFilters] = useState<DataTableAppliedFilter<T>[]>([]);
  const [selectableMode, setSelectableMode] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const filteredColumns = useMemo(() => {
    return columns.filter((column) =>
      typeof column.visible === 'boolean' ? column.visible : true
    );
  }, [columns]);

  const filteredData = useMemo(() => {
    let result = [...data];
    if (searchBy && searchFunc && search.trim()) {
      result = result.filter((item) => searchFunc({ item, field: searchBy, query: search.trim() }));
    }

    if (sortBy) {
      result.sort((itemA, itemB) => sortFunc({ itemA, itemB, field: sortBy, direction: sortType }));
    }

    if (appliedFilters) {
      for (const filter of appliedFilters) {
        const filterConfig = filters.find((_filter) => _filter.accessor === filter.accessor);

        if (!filterConfig) {
          continue;
        }

        switch (filterConfig.type) {
          case 'select':
            result = result.filter((item) =>
              defaultSelectFilter({
                item,
                field: filterConfig.accessor,
                value: filter.value
              })
            );
            break;
          case 'checkboxList':
            result = result.filter((item) =>
              defaultCheckboxesFilter({
                item,
                field: filterConfig.accessor,
                value: filter.value
              })
            );
            break;
          case 'checkbox':
            result = result.filter((item) =>
              defaultCheckboxFilter({
                item,
                field: filterConfig.accessor,
                value: filter.value
              })
            );
            break;
          case 'date':
            result = result.filter((item) =>
              filterConfig.useRange
                ? defaultDateRangeFilter({
                    item,
                    field: filterConfig.accessor,
                    value: filter.value,
                    picker: filterConfig.picker
                  })
                : defaultDateFilter({
                    item,
                    field: filterConfig.accessor,
                    value: filter.value,
                    picker: filterConfig.picker
                  })
            );
            break;
        }
      }
    }

    return result;
  }, [data, search, searchFunc, searchBy, sortBy, sortType, appliedFilters, filters]);

  const selectRow = useCallback((rowIndex: number) => {
    setSelectedRows((selected) => {
      if (selected.indexOf(rowIndex) > -1) {
        return selected.filter((s) => s !== rowIndex);
      } else {
        return [...selected, rowIndex];
      }
    });
  }, []);

  useEffect(() => {
    if (!selectable) {
      setSelectableMode(false);
    }
  }, [selectable]);

  useEffect(() => {
    if (!selectableMode) {
      setSelectedRows([]);
    }
  }, [selectableMode]);

  const isHeaderVisible = Boolean(
    sortKeys.length || filters.length || searchBy || selectable || actions?.length
  );

  return (
    <DataTableContext.Provider
      value={{
        data: filteredData,
        initialData: data,
        columns: filteredColumns,
        page,
        setPage,
        limit: limit > 0 ? limit : 1,
        searchBy,
        search,
        setSearch,
        sortKeys,
        sortBy,
        setSortBy,
        sortType,
        setSortType,
        filters,
        appliedFilters,
        setAppliedFilters,
        mobileColumns,
        selectableMode,
        setSelectableMode,
        selectedRows,
        selectRow
      }}>
      <table
        className={clsx('alt-data-table', className, {
          'alt-data-table--striped-odd': striped === 'odd',
          'alt-data-table--striped-even': striped === 'even'
        })}
        data-testid="alt-test-datatable">
        <thead>
          {isHeaderVisible && (
            <DataTableHeader<T>
              actions={selectableMode ? selectableActions : actions}
              selectable={selectable}
            />
          )}
          <DataTableHeaderRow />
        </thead>
        <DataTableBody />
        <DataTableFooter DataTableFooterStatusComponent={DataTableStatusComponent} />
      </table>
    </DataTableContext.Provider>
  );
};

export default DataTable;
