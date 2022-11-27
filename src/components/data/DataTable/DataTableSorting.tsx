import {memo, useMemo} from "react";
import {FormField, FormGroup} from "../../containers";
import {RadioList, Select} from "../../form";
import './data-table-sorting.scss';
import {Direction, Role} from "../../../types";
import {Button} from "../../button";
import {useDataTableContext} from "../../../contexts";
import {useLocalization} from "../../../hooks";
import ButtonContainer from "../../containers/ButtonContainer/ButtonContainer";
import {Align} from "../../../types/Align";

interface DataTableSortingProps {
  onClose: () => void
}

const DataTableSorting = ({ onClose }: DataTableSortingProps) => {
  const { columns, sortKeys, sortBy, sortType, setSortType, setSortBy } = useDataTableContext()
  const t = useLocalization()

  const sortKeysOptions = useMemo(() => {
    return sortKeys.map((keyName) => {
      const option = columns.find(column => column.accessor === keyName)

      return {
        label: option?.label || keyName,
        value: keyName
      }
    }, [])
  }, [columns, sortKeys])

  return <div className='alt-data-table-sorting' data-testid='alt-test-datatable-sorting'>
    <div className='alt-data-table-sorting__title'>{t('data.dataTable.sorting')}</div>
    <FormGroup>
      <FormField label={t('data.dataTable.field')}>
        <Select options={sortKeysOptions} value={sortBy} onChange={setSortBy} />
      </FormField>
      <FormField label={t('data.dataTable.direction')}>
        <RadioList
          value={sortType}
          direction={Direction.vertical}
          onChange={setSortType}
          name='sort-direction'
          options={[{
            label: t('common.asc'),
            value: 'asc'
          }, {
            label: t('common.desc'),
            value: 'desc'
          }]}
        />
      </FormField>
    </FormGroup>
    <div className='alt-data-table-sorting__footer'>
      <ButtonContainer align={Align.end} direction={Direction.vertical}>
        {sortBy && <Button onClick={() => setSortBy(null)}>{t('data.dataTable.resetSorting')}</Button>}
        <Button role={Role.primary} onClick={onClose}>{t('common.apply')}</Button>
      </ButtonContainer>
    </div>
  </div>
}

export default memo(DataTableSorting)