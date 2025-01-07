import { AnyObject, useDebouncedMemo, useLocale } from '../../utils';
import {
  DataTableColumn,
  Filter,
  FilterType,
  Sort,
} from './DataTable.types.ts';
import {
  booleanFilter,
  numberFilter,
  stringFilter,
  arrayFilter,
} from './filters';

export function useDataTableFilters<T extends AnyObject>(
  initialData: T[],
  filters: Filter[],
  columns: DataTableColumn<T>[],
  sortBy: string | undefined,
  sortType: Sort,
) {
  const { locale: appLocale = 'en-US' } = useLocale();

  return useDebouncedMemo(
    () => {
      if (filters.length === 0 && !sortBy) {
        return initialData;
      }

      let filteredData = initialData;

      filteredData = filteredData.filter((row) => {
        let validRow = true;

        for (const filter of filters) {
          if (!validRow) {
            break;
          }

          if (filter.type === FilterType.string) {
            validRow = stringFilter({
              row,
              filter,
            });
          } else if (filter.type === FilterType.number) {
            validRow = numberFilter({
              row,
              filter,
            });
          } else if (filter.type === FilterType.array) {
            validRow = arrayFilter({
              row,
              filter,
            });
          } else if (filter.type === FilterType.boolean) {
            validRow = booleanFilter({
              row,
              filter,
            });
          }
        }

        return validRow;
      });

      if (sortBy) {
        const columnParams = columns.find(
          (column) => column.accessor === sortBy,
        );

        const columnLocale = columnParams?.options?.locale ?? appLocale;

        const collator = new Intl.Collator(columnLocale, {
          usage: 'sort',
          sensitivity: 'base',
          ignorePunctuation: true,
          caseFirst: 'false',
        });

        return filteredData.sort((itemA, itemB) => {
          const valueA = String(itemA[sortBy]);
          const valueB = String(itemB[sortBy]);

          const isNumericValue =
            typeof valueA === 'number' ||
            columnParams?.type === 'number' ||
            columnParams?.type === 'currency';

          if (isNumericValue) {
            const numA = parseFloat(valueA);
            const numB = parseFloat(valueB);
            return sortType === 'asc' ? numA - numB : numB - numA;
          }

          const result = collator.compare(valueA, valueB);
          return sortType === 'asc' ? result : -result;
        });
      }

      return filteredData;
    },
    [initialData, filters, columns, sortBy, sortType, appLocale],
    1,
  );
}
