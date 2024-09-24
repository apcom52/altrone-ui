import { forwardRef } from 'react';
import { Button } from 'components/button';
import { DataTableActionProps } from '../DataTable.types';

export const Action = forwardRef<HTMLButtonElement, DataTableActionProps>(
  ({ label, showLabel = true, ...restProps }, ref) => {
    return (
      <>
        <Button
          ref={ref}
          title={label}
          label={showLabel ? label : undefined}
          {...restProps}
        />
      </>
    );
  },
);
