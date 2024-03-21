import { useLocalization, useWindowSize } from '../../../hooks';
import { useDataTableContext } from './DataTable.context';

const DataTableFooterStatus = () => {
  const { data, selectedRows } = useDataTableContext();

  const { ltePhoneL } = useWindowSize();
  const t = useLocalization();

  if (ltePhoneL) {
    return (
      <>
        {t('data.dataTable.lines', {
          plural: true,
          value: data.length,
          vars: { count: data.length }
        })}
      </>
    );
  }

  return (
    <>
      {t('data.dataTable.showing')}{' '}
      {t('data.dataTable.lines', {
        plural: true,
        value: data.length,
        vars: { count: data.length }
      })}
      {selectedRows.length ? ` (${selectedRows.length} selected)` : ''}
    </>
  );
};

export default DataTableFooterStatus;
