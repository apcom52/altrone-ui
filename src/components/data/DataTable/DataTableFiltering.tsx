import {memo} from "react";
import {FormField, FormGroup} from "../../containers";
import {Checkbox, CheckboxList, Select} from "../../form";
import './data-table-filtering.scss';
import {Direction, Option} from "../../../types";
import {useDataTableContext} from "./DataTable";
import {Button} from "../../button";
import {ButtonStyle} from "../../button/Button/Button";

interface DataTableFilteringProps {
  onClose: () => void
}

const DataTableFiltering = ({ onClose }: DataTableFilteringProps) => {
  const { columns, filters, data, appliedFilters, setAppliedFilters } = useDataTableContext()

  return <div className='alt-data-table-filtering'>
    <div className='alt-data-table-filtering__title'>Filtering</div>
    <FormGroup>
      {filters.map((filter, filterIndex) => {
        const options = new Set<Option>()

        data.forEach((row) => {
          options.add(row[filter.accessor]);
        })

        const selectOptions: Option<any>[] = Array.from(options).map(variant => ({
          label: variant.toString(),
          value: variant
        }))

        return <FormField label={filter.label || filter.accessor}>
          {filter.type === 'select' && <Select options={selectOptions} value={null} onChange={() => null} />}
          {filter.type === 'checkboxList' && <CheckboxList direction={Direction.vertical}>
            {selectOptions.map((checkbox, checkboxIndex) => (
              <Checkbox key={checkboxIndex} value={checkbox.value} onChange={() => null}>{checkbox.label}</Checkbox>
            ))}
          </CheckboxList>}
        </FormField>
      })}
    </FormGroup>
    <div className='alt-data-table-sorting__footer'>
      {appliedFilters.length > 0 && <Button onClick={() => setAppliedFilters([])}>Reset filters</Button>}
      <Button style={ButtonStyle.primary} onClick={onClose}>Apply</Button>
    </div>
  </div>
}

export default memo(DataTableFiltering)