import { useMemo } from 'react';
import { AnyObject } from '../../utils';
import { Filter, FilterType } from './DataTable.types.ts';
import { numberFilter, stringFilter } from './filters';
import { arrayFilter } from './filters/arrayFilter.ts';

export function useDataTableFilters<T extends AnyObject>(
  initialData: T[],
  filters: Filter[],
) {
  return useMemo(() => {
    if (!filters || filters.length === 0) return initialData;

    return initialData.filter((row) => {
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
  }, [initialData, filters]);
}
