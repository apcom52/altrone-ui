import { memo, useCallback, useMemo, useState } from 'react';
import { Button, Dropdown, Flex, Form, Icon, Popover } from 'components';
import { Align, Direction, Gap, Role } from 'types';
import { useDataTableContext } from '../DataTable.context.tsx';
import {
  Filter,
  FilterType,
  NumberFilterRules,
  StringFilterRules,
} from '../DataTable.types.ts';
import { FilterRow } from './FilterRow.tsx';
import s from './filtering.module.scss';

export const Filtering = memo(() => {
  const { initialData, filters, setFilters, columns } = useDataTableContext();

  const columnsWithFilters = useMemo(() => {
    return columns.filter((item) => item.filterable);
  }, [columns]);

  const [internalFilters, setInternalFilters] = useState<Filter[]>([]);

  const addNewFilter = (accessor: string, type: 'string' | 'number') => {
    setInternalFilters((old) => {
      let newFilter: Filter = {
        field: accessor,
        type: FilterType.string,
        conditions: [],
      };

      if (type === 'string') {
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
      } else if (type === 'number') {
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
      }

      return [...old, newFilter];
    });
  };

  const changeField = useCallback(
    (filterIndex: number, field: any, value: unknown) => {
      setInternalFilters((old) => {
        const currentFilter = old[filterIndex];

        if (!currentFilter) {
          return old;
        }

        let currentCondition = currentFilter.conditions[0];
        currentCondition[field] = value;

        return [...old];
      });
    },
    [],
  );

  const deleteFilter = useCallback((filterIndex: number) => {
    setInternalFilters((old) =>
      old.filter((_, index) => index !== filterIndex),
    );
  }, []);

  return (
    <Popover
      title="Filtering"
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
                No filters are currently applied. Click "Add Filter" to create a
                new filter.
              </div>
            </div>
          ) : null}
          {internalFilters.map((filter, filterIndex) => {
            return (
              <Form.Field
                key={filterIndex}
                label={filterIndex === 0 ? 'Where' : 'And'}
              >
                <FilterRow
                  filterIndex={filterIndex}
                  filter={filter}
                  columns={columnsWithFilters}
                  changeField={changeField}
                  deleteFilter={deleteFilter}
                />
              </Form.Field>
            );
          })}
          <Flex
            gap={Gap.medium}
            direction={Direction.horizontal}
            justify={Align.between}
          >
            <Dropdown
              closeParentPopover={false}
              content={
                <Dropdown.Menu>
                  {columnsWithFilters.map((filter, filterIndex) => {
                    const cellValue =
                      initialData?.[0]?.[filter.accessor] || undefined;

                    let filterType: FilterType = FilterType.string;
                    if (typeof cellValue === 'string') {
                      filterType = FilterType.string;
                    } else if (typeof cellValue === 'number') {
                      filterType = FilterType.number;
                    } else if (typeof cellValue === 'object') {
                      if (Array.isArray(cellValue)) {
                        filterType = FilterType.string;
                      }
                    }

                    const FILTER_TYPE_ICON: Record<string, string> = {
                      string: 'title',
                      number: '123',
                      array: 'data_array',
                    };

                    return (
                      <Dropdown.Action
                        key={filterIndex}
                        icon={<Icon i={FILTER_TYPE_ICON[filterType]} />}
                        label={filter.label || filter.accessor}
                        onClick={() =>
                          addNewFilter(filter.accessor, filterType)
                        }
                      />
                    );
                  })}
                </Dropdown.Menu>
              }
            >
              <Button leftIcon={<Icon i="add" />} label="Add filter" />
            </Dropdown>
            <Flex
              gap={Gap.medium}
              justify={Align.end}
              direction={Direction.horizontal}
            >
              <Button leftIcon={<Icon i="backspace" />} label="Clear" />
              <Button
                leftIcon={<Icon i="filter_alt" />}
                role={Role.primary}
                label="Apply"
                onClick={() => {
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
          label={`Filters${filters?.length ? ` (${filters.length})` : ''}`}
          rightIcon={<Icon i={opened ? 'expand_less' : 'expand_more'} />}
        />
      )}
    </Popover>
  );
});
