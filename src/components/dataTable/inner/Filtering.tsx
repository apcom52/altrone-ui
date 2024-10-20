import { memo, useCallback, useMemo, useState } from 'react';
import { Button } from 'components/button';
import { Dropdown } from 'components/dropdown';
import { Flex } from 'components/flex';
import { Form } from 'components/form';
import { Icon } from 'components/icon';
import { Popover } from 'components/popover';
import { useDataTableContext } from '../DataTable.context.tsx';
import {
  ArrayFilterRules,
  BooleanFilterRules,
  DataTableColumnType,
  Filter,
  FilterType,
  NumberFilterRules,
  StringFilterRules,
} from '../DataTable.types.ts';
import { FilterRow } from './FilterRow.tsx';
import s from './filtering.module.scss';
import { Option } from '../../select/Select.types.ts';
import { useLocalization } from 'components/application';
import { getCellType } from '../DataTable.utils.ts';

export const Filtering = memo(() => {
  const t = useLocalization();

  const { initialData, filters, setFilters, columns, setPage } =
    useDataTableContext();

  const columnsWithFilters = useMemo(() => {
    return columns.filter((item) => item.filterable);
  }, [columns]);

  const [internalFilters, setInternalFilters] = useState<Filter[]>([]);

  const addNewFilter = (
    accessor: string,
    type: FilterType,
    createAtIndex: number = -1,
  ) => {
    setInternalFilters((old) => {
      let newFilter: Filter = {
        field: accessor,
        type: FilterType.string,
        conditions: [],
      };

      if (type === FilterType.string) {
        newFilter = {
          field: accessor,
          type: FilterType.string,
          conditions: [
            {
              rule: StringFilterRules.contain,
              join: 'AND',
              value: '',
            },
          ],
        };
      } else if (type === FilterType.number) {
        newFilter = {
          field: accessor,
          type: FilterType.number,
          conditions: [
            {
              rule: NumberFilterRules.equal,
              join: 'AND',
              value: 0,
              minValue: 0,
              maxValue: 0,
            },
          ],
        };
      } else if (type === FilterType.array) {
        const optionsSet = new Set();
        initialData.forEach((row) => {
          const rowItem = row as Record<string, any[]>;

          if (Array.isArray(rowItem[accessor])) {
            for (const item of rowItem[accessor]) {
              optionsSet.add(item);
            }
          }
        });

        const options: Option[] = Array.from(optionsSet).map((item) => ({
          label: String(item),
          value: String(item),
        }));

        newFilter = {
          field: accessor,
          type: FilterType.array,
          conditions: [
            {
              rule: ArrayFilterRules.has,
              join: 'AND',
              value: options.length ? [options[0].value] : [],
              options: options,
            },
          ],
        };
      } else if (type === FilterType.boolean) {
        newFilter = {
          field: accessor,
          type: FilterType.boolean,
          conditions: [
            {
              rule: BooleanFilterRules.positive,
              join: 'AND',
              value: undefined,
            },
          ],
        };
      }

      if (createAtIndex !== -1) {
        return [
          ...old.slice(0, createAtIndex),
          newFilter,
          ...old.slice(createAtIndex),
        ];
      }

      return [...old, newFilter];
    });
  };

  const changeFilter = useCallback(
    (oldFilterIndex: number, accessor: string, type?: DataTableColumnType) => {
      deleteFilter(oldFilterIndex, 'field');

      const filterType = getCellType(initialData?.[0], accessor, type);

      if (!filterType) return;

      addNewFilter(accessor, filterType, oldFilterIndex);
    },
    [columns, initialData],
  );

  const changeField = useCallback(
    (filterIndex: number, field: string, value: unknown) => {
      setInternalFilters((old) => {
        const currentFilter = old[filterIndex];

        if (!currentFilter) {
          return old;
        }

        let currentCondition = currentFilter.conditions[0] as Record<
          string,
          unknown
        >;
        currentCondition[field] = value;

        return [...old];
      });
    },
    [],
  );

  const deleteFilter = useCallback(
    (filterIndex: number, source: 'delete' | 'field') => {
      setInternalFilters((old) => {
        const newFilters = old.filter((_, index) => index !== filterIndex);

        if (source === 'delete' && newFilters.length === 0) {
          setPage(1);
          setFilters([]);
        }

        return newFilters;
      });
    },
    [],
  );

  return (
    <Popover
      title={t('dataTable.filtering')}
      showCloseButton
      placement="bottom"
      style={{
        minWidth: '280px',
      }}
      content={({ closePopup }) => (
        <Form>
          {internalFilters.length === 0 ? (
            <div className={s.NoFilters}>
              <div className={s.NoFiltersIcon}>
                <Icon i="filter_alt_off" />
              </div>
              <div className={s.NoFiltersDescription}>
                {t('dataTable.noFilters')}
              </div>
            </div>
          ) : null}
          {internalFilters.map((filter, filterIndex) => {
            return (
              <Form.Field
                key={filterIndex}
                label={
                  filterIndex === 0 ? t('dataTable.where') : t('dataTable.and')
                }
              >
                <FilterRow
                  filterIndex={filterIndex}
                  filter={filter}
                  columns={columnsWithFilters}
                  changeField={changeField}
                  deleteFilter={deleteFilter}
                  changeFilter={changeFilter}
                />
              </Form.Field>
            );
          })}
          <Flex gap="m" direction="horizontal" justify="between">
            <Dropdown
              closeParentPopover={false}
              content={
                <Dropdown.Menu>
                  {columnsWithFilters.map((filter, filterIndex) => {
                    const filterType = getCellType(
                      initialData?.[0],
                      filter.accessor,
                      filter.type,
                    );

                    if (!filterType) return null;

                    const FILTER_TYPE_ICON: Record<string, string> = {
                      string: 'title',
                      number: '123',
                      array: 'data_array',
                      boolean: 'check_circle_outline',
                    };

                    const label = filter.label || filter.accessor;

                    return (
                      <Dropdown.Action
                        key={filterIndex}
                        icon={<Icon i={FILTER_TYPE_ICON[filterType]} />}
                        label={label}
                        onClick={() =>
                          addNewFilter(filter.accessor, filterType)
                        }
                        title={label}
                      />
                    );
                  })}
                </Dropdown.Menu>
              }
            >
              <Button
                leftIcon={<Icon i="add" />}
                label={t('dataTable.addFilter')}
              />
            </Dropdown>
            <Flex gap="m" justify="end" direction="horizontal">
              <Button
                leftIcon={<Icon i="backspace" />}
                label={t('common.clear')}
                onClick={() => {
                  setInternalFilters([]);
                  setFilters([]);
                  closePopup();
                }}
              />
              <Button
                leftIcon={<Icon i="filter_alt" />}
                severity="primary"
                label={t('common.apply')}
                title={t('common.apply')}
                onClick={() => {
                  setPage(1);
                  setFilters(internalFilters);
                  closePopup();
                }}
              />
            </Flex>
          </Flex>
        </Form>
      )}
    >
      {({ opened }) => (
        <Button
          leftIcon={<Icon i="filter_alt" />}
          title={t('dataTable.filters')}
          label={`${t('dataTable.filters')}${filters?.length ? ` (${filters.length})` : ''}`}
          rightIcon={<Icon i={opened ? 'expand_less' : 'expand_more'} />}
        />
      )}
    </Popover>
  );
});
