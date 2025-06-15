import { memo } from 'react';
import { DataTableRowActionProps } from '../DataTable.types';
import { Button } from 'components/button';
import { useConfiguration } from 'components/configuration';
import clsx from 'clsx';

export const RowAction = memo<DataTableRowActionProps>(
  ({ className, style, ...restProps }) => {
    const { dataTable: { rowAction: rowActionConfig = {} } = {} } =
      useConfiguration();

    const cls = clsx(rowActionConfig.className, className);
    const styles = { ...rowActionConfig.style, ...style };

    return <Button className={cls} style={styles} {...restProps} />;
  },
);
