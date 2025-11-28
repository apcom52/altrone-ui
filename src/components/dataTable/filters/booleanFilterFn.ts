import { FilterFn } from '@tanstack/react-table';

export const booleanFilterFn: FilterFn<any> = (row, columnId, filterValue) => {
  if (!filterValue || !filterValue.rule) return true;

  const raw = row.getValue<any>(columnId);
  const value = Boolean(raw);

  switch (filterValue.rule) {
    case 'positive':
      return value === true;

    case 'negative':
      return value === false;

    default:
      return true;
  }
};
