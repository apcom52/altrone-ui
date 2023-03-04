import { memo, useMemo, useState } from 'react';
import './data-table-header.scss';
import { Button, ButtonVariant } from '../../button';
import { InputIslandType, TextInput } from '../../form';
import DataTableSorting from './DataTableSorting';
import { Icon } from '../../icons';
import DataTableFiltering from './DataTableFiltering';
import { useDataTableContext } from '../../../contexts';
import { useLocalization, useWindowSize } from '../../../hooks';
import { DataTableAction as DataTableActionType } from './DataTable';
import DataTableAction from './DataTableAction';

interface DataTableHeaderProps {
  actions: DataTableActionType[];
  selectable: boolean;
}

const DataTableHeader = ({ actions = [], selectable = false }: DataTableHeaderProps) => {
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
      result.push({
        label: t('data.dataTable.select'),
        icon: <Icon i={selectableMode ? 'check_box_outline_blank' : 'check_box'} />,
        onClick: () => setSelectableMode(!selectableMode),
        isIcon: true
      });
    }

    if (sortKeys.length) {
      result.push({
        label: t('data.dataTable.sort'),
        icon: <Icon i="swap_vert" />,
        content: (args) => <DataTableSorting {...args} />
      });
    }

    if (filters.length) {
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
      <tr className="alt-data-table-header-wrapper">
        <th
          colSpan={
            ltePhoneL
              ? mobileColumns.length + 1
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
                  <TextInput
                    placeholder={t('common.search')}
                    value={search}
                    onChange={setSearch}
                    rightIsland={
                      search
                        ? {
                            type: InputIslandType.actions,
                            content: [
                              {
                                title: t('common.clear'),
                                icon: <Icon i="backspace" />,
                                onClick: () => setSearch('')
                              }
                            ]
                          }
                        : undefined
                    }
                  />
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
                  <TextInput placeholder={t('common.search')} value={search} onChange={setSearch} />
                </div>
                <Button
                  variant={ButtonVariant.text}
                  onClick={() => setSearch('')}
                  isIcon={ltePhoneL}>
                  <Icon i="backspace" />
                </Button>
              </>
            ) : null}
          </div>
        </th>
      </tr>
    </>
  );
};

export default memo(DataTableHeader);
