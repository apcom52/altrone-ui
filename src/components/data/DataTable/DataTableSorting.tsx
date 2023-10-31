import { memo, useMemo } from 'react';
import { ButtonContainer, FormField, FormGroup } from '../../containers';
import { RadioList, Select, Button } from '../../form';
import './data-table-sorting.scss';
import { Align, Direction, Role, Sort } from '../../../types';
import { useLocalization } from '../../../hooks';
import { DataTablePopupActionProps } from './DataTableAction.types';
import { useDataTableContext } from './DataTable.context';

const DataTableSorting = ({ closePopup }: DataTablePopupActionProps) => {
  const { columns, sortKeys, sortBy, sortType, setSortType, setSortBy } = useDataTableContext();
  const t = useLocalization();

  const sortKeysOptions = useMemo(() => {
    return sortKeys.map((keyName) => {
      const option = columns.find((column) => column.accessor === keyName);

      return {
        label: option?.label || keyName,
        value: keyName
      };
    }, []);
  }, [columns, sortKeys]);

  return (
    <div className="alt-data-table-sorting" data-testid="alt-test-datatable-sorting">
      <div className="alt-data-table-sorting__title">{t('data.dataTable.sorting')}</div>
      <FormGroup>
        <FormField label={t('data.dataTable.field')}>
          <Select<Sort | undefined>
            options={sortKeysOptions}
            value={sortBy}
            onChange={setSortBy}
            clearable
          />
        </FormField>
        <FormField label={t('data.dataTable.direction')}>
          <RadioList
            value={sortType}
            direction={Direction.vertical}
            onChange={setSortType}
            name="sort-direction"
            options={[
              {
                label: t('common.asc'),
                value: Sort.asc
              },
              {
                label: t('common.desc'),
                value: Sort.desc
              }
            ]}
          />
        </FormField>
      </FormGroup>
      <div className="alt-data-table-sorting__footer">
        <ButtonContainer align={Align.end} direction={Direction.vertical}>
          {sortBy && (
            <Button onClick={() => setSortBy(null)}>{t('data.dataTable.resetSorting')}</Button>
          )}
          <Button role={Role.primary} onClick={closePopup}>
            {t('common.apply')}
          </Button>
        </ButtonContainer>
      </div>
    </div>
  );
};

export default memo(DataTableSorting) as typeof DataTableSorting;
