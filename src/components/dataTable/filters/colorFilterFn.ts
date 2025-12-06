import { FilterFn } from '@tanstack/react-table';

export const colorFilterFn: FilterFn<any> = (row, columnId, filterValue) => {
  if (!filterValue || !filterValue.rule) return true;

  const raw = row.getValue<any>(columnId);
  const rowColor = String(raw || '').toLowerCase().trim();

  const rule = filterValue.rule;
  const filterColors = Array.isArray(filterValue.value) ? filterValue.value : [];

  // Если не выбрано ни одного цвета для фильтрации, не фильтруем
  if (filterColors.length === 0) return true;

  // Нормализуем цвета для сравнения (приводим к нижнему регистру)
  const normalizedFilterColors = filterColors.map((color: any) =>
    String(color || '').toLowerCase().trim()
  );

  switch (rule) {
    case 'has':
      // Проверяем, совпадает ли цвет строки с одним из выбранных цветов
      return normalizedFilterColors.includes(rowColor);

    case 'notHas':
      // Проверяем, что цвет строки не совпадает ни с одним из выбранных цветов
      return !normalizedFilterColors.includes(rowColor);

    default:
      return true;
  }
};


