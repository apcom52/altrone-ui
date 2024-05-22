import { useMemo } from 'react';
import { AnyObject } from '../../utils';
import { Filter, FilterType, Sort } from './DataTable.types.ts';
import { numberFilter, stringFilter } from './filters';
import { arrayFilter } from './filters/arrayFilter.ts';

export function useDataTableFilters<T extends AnyObject>(
  initialData: T[],
  filters: Filter[],
  sortBy: string | undefined,
  sortType: Sort,
) {
  console.log('>> s', sortBy, sortType);
  return useMemo(() => {
    if (filters.length === 0 && !sortBy) {
      return initialData;
    }

    const filteredData = initialData.filter((row) => {
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

    console.log('>> sortby', sortBy);

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
  }, [initialData, filters, sortBy, sortType]);
}
