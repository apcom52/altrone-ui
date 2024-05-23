import { AnyObject, useDebouncedMemo } from '../../utils';
import { Filter, FilterType, Sort } from './DataTable.types.ts';
import { numberFilter, stringFilter } from './filters';
import { arrayFilter } from './filters/arrayFilter.ts';

export function useDataTableFilters<T extends AnyObject>(
  initialData: T[],
  filters: Filter[],
  sortBy: string | undefined,
  sortType: Sort,
  search: string,
) {
  return useDebouncedMemo(
    () => {
      if (filters.length === 0 && !sortBy && !search) {
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
    300,
  );
}
