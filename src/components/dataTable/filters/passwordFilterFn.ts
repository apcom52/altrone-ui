import { FilterFn } from '@tanstack/react-table';

export const passwordFilterFn: FilterFn<any> = (row, columnId, filterValue) => {
  if (!filterValue || !filterValue.rule) return true;

  const raw = row.getValue<string>(columnId);

  const password = raw == null ? '' : String(raw).trim();
  const lower = password.toLowerCase();

  switch (filterValue.rule) {
    case 'empty':
      return lower.length === 0;

    case 'notEmpty':
      return lower.length > 0;

    default:
      return true;
  }
};
