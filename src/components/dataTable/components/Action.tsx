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
      label={label}
      showLabel={showLabel}
      disabled={loading}
      {...restProps}
    />
  );
};
