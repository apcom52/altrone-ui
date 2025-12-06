import { useCallback, useMemo, useState } from 'react';
import { Button } from 'components/button';
import { Dropdown } from 'components/dropdown';
import { Flex } from 'components/flex';
import { Form } from 'components/form';
import { Popover } from 'components/popover';
import { useDataTableCore } from '../DataTable.context.tsx';
import { useLocalization } from 'components/application';
import { Column, ColumnFilter } from '@tanstack/react-table';
import { Plus } from 'lucide-react';
import { Empty } from 'components/empty/Empty.tsx';
import { FilterRow } from './FilterRow.tsx';
import { RulesByDataType } from '../DataTable.constants.ts';

export const Filtering = () => {
  const t = useLocalization();

  const table = useDataTableCore();
  const mode = table.options.meta?.mode || 'read';

  const filterableColumns = table
    .getAllLeafColumns()
    .filter((column) => column.getCanFilter());

  const filters = table.getState().columnFilters;

  console.log('>> filters', filters);

  const [internalFilters, setInternalFilters] =
    useState<ColumnFilter[]>(filters);

  const freeToFilterColumns = useMemo(() => {
    return filterableColumns.filter(
      (column) => !internalFilters.some((filter) => filter.id === column.id)
    );
  }, [filterableColumns, internalFilters]);

  const handleAddFilter = useCallback((column: Column<any>) => {
    const filterFn = column.columnDef.filterFn;
    // Получаем тип из meta или из filterFn
    const meta = column.columnDef.meta as
      | { type?: string; options?: { level?: 'day' | 'month' | 'year' } }
      | undefined;
    const columnType =
      meta?.type || (typeof filterFn === 'string' ? filterFn : undefined);

    console.log('>> filterType', columnType);

    if (
      !columnType ||
      !RulesByDataType[columnType as keyof typeof RulesByDataType]
    ) {
      return;
    }

    const rules = RulesByDataType[columnType as keyof typeof RulesByDataType];
    if (!rules || rules.length === 0) {
      return;
    }

    const baseFilterValue: any = {
      rule: rules[0].value,
      join: 'AND',
      value: '',
      additionalValue: '',
    };

    // Для дат добавляем level из options
    if (columnType === 'date' && meta?.options) {
      const level = meta.options.level || 'day';
      baseFilterValue.level = level;
    }

    setInternalFilters((old) => [
      ...old,
      {
        id: column.id,
        value: baseFilterValue,
      },
    ]);
  }, []);

  const changeFilter = useCallback(
    (accessor: string, field: string, value: unknown) => {
      setInternalFilters((old) => {
        return old.map((filter) => {
          if (filter.id === accessor) {
            const currentValue = filter.value || {};
            return { ...filter, value: { ...currentValue, [field]: value } };
          }
          return filter;
        });
      });
    },
    []
  );

  const deleteFilter = useCallback((accessor: string) => {
    setInternalFilters((old) => {
      return old.filter((filter) => filter.id !== accessor);
    });
  }, []);

  const resetPagination = useCallback(() => {
    table.resetPageIndex();
  }, [table]);

  return (
    <Popover
      title={t('dataTable.filtering')}
      showCloseButton
      placement="bottom"
      style={{
        minWidth: '280px',
      }}
      overlap
      content={({ closePopup }) => (
        <Form>
          {internalFilters.length === 0 ? (
            <Empty>{t('dataTable.noFilters')}</Empty>
          ) : null}
          {internalFilters.map((filter) => (
            <FilterRow
              key={filter.id}
              filter={filter}
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
                  {freeToFilterColumns.map((column) => {
                    // Получаем заголовок колонки безопасным способом
                    const headerValue =
                      column.columnDef.header?.() || String(column.id);

                    return (
                      <Dropdown.Action
                        key={column.id}
                        label={headerValue}
                        onClick={() => {
                          handleAddFilter(column);
                        }}
                      />
                    );
                  })}
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
                setInternalFilters([]);
                resetPagination();
                closePopup();
              }}
            />
            <Button
              label={t('common.apply')}
              onClick={() => {
                table.setColumnFilters(internalFilters);
                resetPagination();
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
        disabled={mode === 'loading'}
      />
    </Popover>
  );
};
