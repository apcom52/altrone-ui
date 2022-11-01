import {memo} from "react";
import {FormField, FormGroup} from "../../containers";
import {Checkbox, CheckboxList, Select} from "../../form";
import './data-table-filtering.scss';
import {Direction, Option} from "../../../types";
import {Button} from "../../button";
import {ButtonStyle} from "../../button/Button/Button";
import {useDataTableContext} from "../../../contexts";

interface DataTableFilteringProps {
  onClose: () => void
}

const DataTableFiltering = ({ onClose }: DataTableFilteringProps) => {
  const { filters, initialData, appliedFilters, setAppliedFilters } = useDataTableContext()

  return <div className='alt-data-table-filtering'>
    <div className='alt-data-table-filtering__title'>Filtering</div>
    <FormGroup>
      {filters.map((filter, filterIndex) => {
        const options = new Set<Option>()

        initialData.forEach((row) => {
          options.add(row[filter.accessor]);
        })

        const selectOptions: Option<any>[] = Array.from(options).map(variant => ({
          label: variant.toString(),
          value: variant
        }))

        const currentFilterIndex = appliedFilters.findIndex(appliedFilter => appliedFilter.accessor === filter.accessor)
        let currentFilterValue = null

        switch (filter.type) {
          case 'select':
            currentFilterValue = appliedFilters[currentFilterIndex]?.value || null
            break;
          case 'checkboxList':
            currentFilterValue = appliedFilters[currentFilterIndex]?.value || []
            break;
        }

        const onChange = (value) => {
          let _filters = [...appliedFilters]
          if (filter.type === 'select') {
            if (currentFilterIndex === -1) {
              _filters.push({
                accessor: filter.accessor,
                value
              })
            } else {
              _filters[currentFilterIndex].value = value
            }
          } else if (filter.type === 'checkboxList') {
            if (currentFilterIndex === -1) {
              _filters.push({
                accessor: filter.accessor,
                value: [value]
              })
            } else {
              if (_filters[currentFilterIndex].value?.indexOf(value) > -1) {
                _filters[currentFilterIndex].value = _filters[currentFilterIndex].value.filter(filterValue => filterValue !== value)
                if (_filters[currentFilterIndex].value.length === 0) {
                  _filters = _filters.filter((_, filterIndex) => filterIndex !== currentFilterIndex)
                }
              } else {
                _filters[currentFilterIndex].value.push(value)
              }
            }
          }

          setAppliedFilters(_filters)
        }

        return <FormField label={filter.label || filter.accessor}>
          {filter.type === 'select' && <Select options={selectOptions} value={currentFilterValue} onChange={onChange} />}
          {filter.type === 'checkboxList' && <CheckboxList direction={Direction.vertical}>
            {selectOptions.map((checkbox, checkboxIndex) => (
              <Checkbox key={checkboxIndex} value={checkbox.value} checked={currentFilterValue?.indexOf(checkbox.value) > -1} onChange={() => onChange(checkbox.value)}>{checkbox.label}</Checkbox>
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