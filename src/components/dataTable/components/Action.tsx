import { forwardRef } from 'react';
import { Button } from 'components/button';
import { DataTableActionProps } from '../DataTable.types';
import clsx from 'clsx';
import { useDataTableCore } from '../DataTable.context';

export const Action = forwardRef<HTMLButtonElement, DataTableActionProps>(
  ({ label, showLabel = true, className, style, ...restProps }, ref) => {
    const table = useDataTableCore();
    const mode = table.options.meta?.mode || 'read';

    const cls = clsx(className);
    const styles = { ...style };

    return (
      <>
        <Button
          ref={ref}
          title={label}
          label={showLabel ? label : ''}
          className={cls}
          style={styles}
          disabled={mode === 'loading'}
          {...restProps}
        />
      </>
    );
  },
);
