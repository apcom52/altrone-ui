import { useMemo } from 'react';
import { AnyObject } from '../../utils';
import {
  Filter,
  NumberFilterRules,
  StringFilterRules,
} from './DataTable.types.ts';

export function useDataTableFilters<T extends AnyObject>(
  initialData: T[],
  filters: Filter[],
) {
  const filteredData = useMemo(() => {
    if (!filters || filters.length === 0) return initialData;

    return initialData.filter((row) => {
      let validRow = true;

      for (const filter of filters) {
        if (!validRow) {
          break;
        }

        if (filter.type === 'string') {
          const value = String(row[filter.field]).toLowerCase();
          const condition = filter.conditions[0];
          const rule = condition.rule;
          const filterValue = condition.value.trim().toLowerCase();

          switch (rule) {
            case StringFilterRules.contain:
              validRow = value.includes(filterValue);
              break;
            case StringFilterRules.notContain:
              validRow = !value.includes(filterValue);
              break;
            case StringFilterRules.empty:
              validRow = value == '';
              break;
            case StringFilterRules.notEmpty:
              validRow = value != '';
              break;
            case StringFilterRules.equal:
              validRow = value == filterValue;
              break;
            case StringFilterRules.notEqual:
              validRow = value != filterValue;
              break;
          }
        } else if (filter.type === 'number') {
          const value = Number(row[filter.field]);

          if (Number.isNaN(value)) {
            validRow = false;
            break;
          }

          const condition = filter.conditions[0];
          const rule = condition.rule;
          const filterValue = condition.value;
          const minFilterValue = condition.minValue || 0;
          const maxFilterValue = condition.maxValue || 0;

          switch (rule) {
            case NumberFilterRules.equal:
              validRow = value === filterValue;
              break;
            case NumberFilterRules.notEqual:
              validRow = value !== filterValue;
              break;
            case NumberFilterRules.gt:
              validRow = value > filterValue;
              break;
            case NumberFilterRules.gte:
              validRow = value >= filterValue;
              break;
            case NumberFilterRules.lt:
              validRow = value < filterValue;
              break;
            case NumberFilterRules.lte:
              validRow = value <= filterValue;
              break;
            case NumberFilterRules.between:
              validRow = value >= minFilterValue && value <= maxFilterValue;
              break;
            case NumberFilterRules.notBetween:
              validRow = value < minFilterValue || value > maxFilterValue;
              break;
          }
        }
      }

      return validRow;
    });
  }, [initialData, filters]);

  return filteredData;
}
