import { forwardRef } from 'react';
import { Button } from 'components/button';
import { DataTableActionProps } from '../DataTable.types';
import { useConfiguration } from 'components/configuration/AltroneConfiguration.context';
import clsx from 'clsx';

export const Action = forwardRef<HTMLButtonElement, DataTableActionProps>(
  ({ label, showLabel = true, className, style, ...restProps }, ref) => {
    const { dataTable: { action: actionConfig = {} } = {} } =
      useConfiguration();

    const cls = clsx(actionConfig.className, className);
    const styles = { ...actionConfig.style, ...style };

    return (
      <>
        <Button
          ref={ref}
          title={label}
          label={showLabel ? label : undefined}
          className={cls}
          style={styles}
          {...restProps}
        />
      </>
    );
  },
);
