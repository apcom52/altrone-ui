import { forwardRef, useRef } from 'react';
import { Button, ButtonVariant } from '../../form';
import { useWindowSize } from '../../../hooks';
import { DataTableActionProps } from './DataTable.types';
import { Role } from '../../../types';

export const DataTableAction = forwardRef<HTMLButtonElement, DataTableActionProps>(
  ({ label, icon, indicator, danger = false, disabled, onClick, showLabel = true }, ref) => {
    const { ltePhoneL } = useWindowSize();

    return (
      <>
        <Button
          ref={ref}
          leftIcon={!ltePhoneL && showLabel ? icon : undefined}
          variant={ButtonVariant.text}
          isIcon={!showLabel || ltePhoneL}
          onClick={onClick}
          indicator={indicator}
          disabled={disabled}
          role={danger ? Role.danger : Role.default}>
          {ltePhoneL || !showLabel ? icon : label}
        </Button>
      </>
    );
  }
);
