import { Toolbar } from 'components/toolbar';
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
    <Toolbar.Action
      ref={ref}
      label={label}
      showLabel={showLabel}
      disabled={loading}
      {...restProps}
    />
  );
};
