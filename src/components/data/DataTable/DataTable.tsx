import { useCallback, useEffect, useMemo, useState } from 'react';
import DataTableHeader from './DataTableHeader';
import './data-table.scss';
import DataTableBody from './DataTableBody';
import DataTableHeaderRow from './DataTableHeaderRow';
import DataTableFooter from './DataTableFooter';
import { DataTableAppliedFilter, DataTableContext, DataTableFilter } from '../../../contexts';
import { ContextMenuType, Indicator, Sort } from '../../../types';

import {
  DataTableSearchFunc,
  DataTableSortFunc,
  defaultCheckboxesFilter,
  defaultSearchFunc,
  defaultSelectFilter,
  defaultSortFunc
} from './functions';
import clsx from 'clsx';
import { DataTableCellProps } from './DataTableCell';

export interface DataTableColumn<T> {
  accessor: keyof T;
  label?: string;
  width?: number | string;
  Component?: React.FC<DataTableCellProps>;
}

interface DataTableProps<T extends object> {
  data: T[];
  columns: DataTableColumn<T>[];
  limit?: number;
  searchBy?: string;
  sortKeys?: string[];
  sortFunc?: (params: DataTableSortFunc<T>) => number;
  searchFunc?: (params: DataTableSearchFunc<T>) => T[];
  filters?: DataTableFilter[];
  mobileColumns?: string[];
  className?: string;
  actions?: DataTableAction[];
  striped?: 'odd' | 'even';
  selectable?: boolean;
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
}

export const DataTable = <T extends object>({
  data = [],
  columns = [],
  limit = 20,
  searchBy = '',
  searchFunc = defaultSearchFunc,
  sortFunc = defaultSortFunc,
  sortKeys = [],
  filters = [],
  mobileColumns = [columns[0].accessor],
  className,
  actions = [],
  striped,
  selectable = false
}: DataTableProps<T>) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortType, setSortType] = useState<Sort>(Sort.asc);
  const [appliedFilters, setAppliedFilters] = useState<DataTableAppliedFilter[]>([]);
  const [selectableMode, setSelectableMode] = useState(false);
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

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

  const isHeaderVisible = sortKeys.length || filters.length || searchBy;

  return (
    <DataTableContext.Provider
      value={{
        data: filteredData,
        initialData: data,
        columns,
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
          {isHeaderVisible && <DataTableHeader actions={actions} selectable={selectable} />}
          <DataTableHeaderRow />
        </thead>
        <DataTableBody />
        <DataTableFooter />
      </table>
    </DataTableContext.Provider>
  );
};

export default DataTable;
