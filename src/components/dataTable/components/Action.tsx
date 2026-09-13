import { Button } from 'components/button';
import { DataTableActionProps } from '../DataTable.types';
import { useDataTableContext } from '../DataTable.context';

export const Action = ({
  ref,
  label,
  showLabel = true,
  ...restProps
}: DataTableActionProps) => {
  const { loading } = useDataTableContext();

  return (
    <Button
      ref={ref}
      title={label}
      label={showLabel ? label : ''}
      disabled={loading}
      {...restProps}
    />
  );
};
