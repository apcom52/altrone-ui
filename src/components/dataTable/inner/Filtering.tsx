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
import { StringFilterRules } from '../DataTable.types.ts';
import { Empty } from 'components/empty/Empty.tsx';
import { FilterRow } from './FilterRow.tsx';

export const Filtering = () => {
  const t = useLocalization();

  const table = useDataTableCore();
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
    setInternalFilters((old) => [
      ...old,
      {
        id: column.id,
        value: {
          rule: StringFilterRules.contain,
          join: 'AND',
          value: '',
        },
      },
    ]);
  }, []);

  const changeFilter = useCallback(
    (accessor: string, field: string, value: unknown) => {
      setInternalFilters((old) => {
        return old.map((filter) => {
          if (filter.id === accessor) {
            return { ...filter, value: { ...filter.value, [field]: value } };
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
                  {freeToFilterColumns.map((column) => (
                    <Dropdown.Action
                      key={column.id}
                      label={String(
                        column.columnDef.header() || column.columnDef.id
                      )}
                      onClick={() => {
                        handleAddFilter(column);
                      }}
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
                setInternalFilters([]);
                table.setPageIndex(0);
                closePopup();
              }}
            />
            <Button
              label={t('common.apply')}
              onClick={() => {
                table.setColumnFilters(internalFilters);
                table.setPageIndex(0);
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
      />
    </Popover>
  );
};
