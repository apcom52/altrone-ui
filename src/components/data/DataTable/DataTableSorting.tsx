import {memo, useMemo} from "react";
import {FormField, FormGroup} from "../../containers";
import {RadioList, Select} from "../../form";
import './data-table-sorting.scss';
import {Direction, Role} from "../../../types";
import {Button} from "../../button";
import {useDataTableContext} from "../../../contexts";

interface DataTableSortingProps {
  onClose: () => void
}

const DataTableSorting = ({ onClose }: DataTableSortingProps) => {
  const { columns, sortKeys, sortBy, sortType, setSortType, setSortBy } = useDataTableContext()

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
    <div className='alt-data-table-sorting__title'>Sorting</div>
    <FormGroup>
      <FormField label='Field'>
        <Select options={sortKeysOptions} value={sortBy} onChange={setSortBy} />
      </FormField>
      <FormField label='Direction'>
        <RadioList
          value={sortType}
          direction={Direction.vertical}
          onChange={setSortType}
          name='sort-direction'
          options={[{
            label: 'Ascending',
            value: 'asc'
          }, {
            label: 'Descending',
            value: 'desc'
          }]}
        />
      </FormField>
    </FormGroup>
    <div className='alt-data-table-sorting__footer'>
      {sortBy && <Button onClick={() => setSortBy(null)}>Reset sorting</Button>}
      <Button role={Role.primary} onClick={onClose}>Apply</Button>
    </div>
  </div>
}

export default memo(DataTableSorting)