import { useCallback, useMemo, useState } from 'react';
import { Column, ColumnFilter } from '@tanstack/react-table';
import { Plus } from 'lucide-react';
import { Button } from 'components/button';
import { Dropdown } from 'components/dropdown';
import { Flex } from 'components/flex';
import { Form } from 'components/form';
import { Popover } from 'components/popover';
import { Empty } from 'components/empty/Empty.tsx';
import { useLocalization } from 'components/application';
import { AnyObject } from '../../../utils';
import { useDataTableContext } from '../DataTable.context.tsx';
import { DataTableFeatures } from '../DataTable.features.ts';
import { DataTableFilterValue } from '../DataTable.types.ts';
import { RulesByDataType } from '../DataTable.constants.ts';
import { FilterRow } from './FilterRow.tsx';

const columnHeaderLabel = (column: Column<DataTableFeatures, AnyObject>) =>
  typeof column.columnDef.header === 'string'
    ? column.columnDef.header
    : String(column.id);

export const Filtering = () => {
  const t = useLocalization();

  const { table, loading } = useDataTableContext();

  const filterableColumns = table
    .getAllLeafColumns()
    .filter((column) => column.getCanFilter());

  const filters = table.state.columnFilters;

  const [draftFilters, setDraftFilters] = useState<ColumnFilter[]>(filters);

  const freeToFilterColumns = useMemo(
    () =>
      filterableColumns.filter(
        (column) => !draftFilters.some((filter) => filter.id === column.id),
      ),
    [filterableColumns, draftFilters],
  );

  const addFilter = useCallback((column: Column<DataTableFeatures, AnyObject>) => {
    const meta = column.columnDef.meta;
    const dataType = meta?.dataType;
    if (!dataType || !RulesByDataType[dataType]) return;

    const rules = RulesByDataType[dataType];
    if (!rules || rules.length === 0) return;

    const value: DataTableFilterValue = { rule: String(rules[0].value) };
    if (dataType === 'date') {
      value.level =
        (meta?.options as { level?: 'day' | 'month' | 'year' } | undefined)
          ?.level ?? 'day';
    }

    setDraftFilters((old) => [...old, { id: column.id, value }]);
  }, []);

  const changeFilter = useCallback(
    (id: string, field: keyof DataTableFilterValue, value: unknown) => {
      setDraftFilters((old) =>
        old.map((filter) =>
          filter.id === id
            ? {
                ...filter,
                value: {
                  ...(filter.value as DataTableFilterValue),
                  [field]: value,
                },
              }
            : filter,
        ),
      );
    },
    [],
  );

  const deleteFilter = useCallback((id: string) => {
    setDraftFilters((old) => old.filter((filter) => filter.id !== id));
  }, []);

  return (
    <Popover
      title={t('dataTable.filtering')}
      showCloseButton
      placement="bottom"
      style={{ minWidth: '280px' }}
      overlap
      content={({ closePopup }) => (
        <Form>
          {draftFilters.length === 0 ? (
            <Empty size="s">{t('dataTable.noFilters')}</Empty>
          ) : null}
          {draftFilters.map((filter) => (
            <FilterRow
              key={filter.id}
              filter={filter as { id: string; value: DataTableFilterValue }}
              changeFilter={(field, value) =>
                changeFilter(filter.id, field, value)
              }
              deleteFilter={() => deleteFilter(filter.id)}
            />
          ))}
          <Flex gap="m" direction="horizontal" justify="center">
            <Dropdown
              closeParentPopover={false}
              content={
                <Dropdown.Menu>
                  {freeToFilterColumns.map((column) => (
                    <Dropdown.Action
                      key={column.id}
                      label={columnHeaderLabel(column)}
                      onClick={() => addFilter(column)}
                    />
                  ))}
                </Dropdown.Menu>
              }
            >
              <Button
                icon={<Plus />}
                label={t('dataTable.addFilter')}
                disabled={freeToFilterColumns.length === 0}
              />
            </Dropdown>
            <Button
              label={t('common.clear')}
              onClick={() => {
                table.resetColumnFilters();
                setDraftFilters([]);
                table.resetPageIndex();
                closePopup();
              }}
            />
            <Button
              label={t('common.apply')}
              onClick={() => {
                table.setColumnFilters(draftFilters);
                table.resetPageIndex();
                closePopup();
              }}
              variant="submit"
            />
          </Flex>
        </Form>
      )}
    >
      <Button
        label={t('dataTable.filters')}
        badge={filters.length ? filters.length : undefined}
        disabled={loading}
      />
    </Popover>
  );
};
