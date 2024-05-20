import { forwardRef, useRef } from 'react';
import { Button, ButtonVariant } from '../../form';
import { DataTableActionProps } from './DataTable.types';
import { Role } from '../../../types';

export const DataTableAction = forwardRef<
  HTMLButtonElement,
  DataTableActionProps
>(({ label, showLabel = true, ...restProps }, ref) => {
  const { ltePhoneL } = useWindowSize();

  return (
    <>
      <Button ref={ref} {...restProps} />
    </>
  );
});
