import { AnyObject, useDebouncedMemo } from '../../utils';
import { Filter, FilterType, Sort } from './DataTable.types.ts';
import {
  booleanFilter,
  numberFilter,
  stringFilter,
  arrayFilter,
} from './filters';

export function useDataTableFilters<T extends AnyObject>(
  initialData: T[],
  filters: Filter[],
  sortBy: string | undefined,
  sortType: Sort,
) {
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
            validRow = stringFilter({ row, filter });
          } else if (filter.type === FilterType.number) {
            validRow = numberFilter({ row, filter });
          } else if (filter.type === FilterType.array) {
            validRow = arrayFilter({ row, filter });
          } else if (filter.type === FilterType.boolean) {
            validRow = booleanFilter({ row, filter });
          }
        }

        return validRow;
      });

      if (sortBy) {
        return filteredData.sort((itemA, itemB) => {
          if (sortType === 'asc') {
            return itemA[sortBy] > itemB[sortBy] ? 1 : -1;
          } else {
            return itemA[sortBy] < itemB[sortBy] ? 1 : -1;
          }
        });
      }

      return filteredData;
    },
    [initialData, filters, sortBy, sortType],
    1,
  );
}
