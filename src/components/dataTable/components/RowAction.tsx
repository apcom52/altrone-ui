import { memo } from 'react';
import { DataTableRowActionProps } from '../DataTable.types';
import { Button } from 'components/button';
import clsx from 'clsx';

export const RowAction = memo<DataTableRowActionProps>(
  ({ className, style, ...restProps }) => {
    const cls = clsx(className);
    const styles = { ...style };

    return <Button className={cls} style={styles} {...restProps} />;
  },
);
