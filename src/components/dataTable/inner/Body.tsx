import {
  useDataTableContext,
  useDataTableCore,
} from '../DataTable.context.tsx';
import clsx from 'clsx';
import { DataTableCellProps } from '../DataTableCell.tsx';
import { Checkbox } from '../../checkbox';
import s from './body.module.scss';
import { useVisibleColumns } from '../useVisibleColumns.ts';
import { DataTableBodyProps, DataTableColumnType } from '../DataTable.types.ts';
import {
  DataTableTextRenderer,
  DataTableCurrencyRenderer,
  DataTableNumberRenderer,
  DataTableDateRenderer,
  DataTableMonthRenderer,
  DataTableYearRenderer,
  DataTableBooleanRenderer,
  DataTableArrayRenderer,
} from '../renderers';
import { createElement } from 'react';
import { useLocalization } from '../../application';
import { GlobalUtils } from '../../../utils';
import { Empty } from 'components/empty/Empty.tsx';
import { flexRender } from '@tanstack/react-table';
import { Text } from '../../text';
import { useDataTableColumnsTemplate } from '../useDataTableColumnsTemplate.ts';
import { motion } from 'motion/react';

const CELL_RENDERERS: Record<
  DataTableColumnType,
  React.FC<DataTableCellProps<any>>
> = {
  text: DataTableTextRenderer,
  number: DataTableNumberRenderer,
  boolean: DataTableBooleanRenderer,
  array: DataTableArrayRenderer,
  currency: DataTableCurrencyRenderer,
  date: DataTableDateRenderer,
  month: DataTableMonthRenderer,
  year: DataTableYearRenderer,
};

export const Body = () => {
  const table = useDataTableCore();
  const selectableMode = table.getState().selectableMode || false;

  const columnsTemplate = useDataTableColumnsTemplate(selectableMode);

  return (
    <div className={s.TableBody}>
      {table.getRowModel().rows.map((row) => {
        const isSelected = row.getIsSelected();

        return (
          <div
            key={row.id}
            className={s.Row}
            data-selected={isSelected}
            style={{ gridTemplateColumns: columnsTemplate }}
          >
            {selectableMode ? (
              <div className={s.CheckboxCell}>
                <Checkbox
                  checked={isSelected}
                  onChange={() => row.toggleSelected()}
                />
              </div>
            ) : null}
            {row.getVisibleCells().map((cell) => (
              <div key={cell.id} className={s.Cell}>
                <Text size={4} weight="medium">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </Text>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};
