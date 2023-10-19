import { memo } from 'react';
import { FormField, FormGroup } from '../../containers';
import { Checkbox, CheckboxList, Select, Button, DatePicker } from '../../form';
import './data-table-filtering.scss';
import { Align, Direction, Option, Role } from '../../../types';
import { useDataTableContext } from '../../../contexts';
import ButtonContainer from '../../containers/ButtonContainer/ButtonContainer';
import { useLocalization } from '../../../hooks';
import { DataTablePopupActionProps } from './DataTable';

const DataTableFiltering = ({ closePopup }: DataTablePopupActionProps) => {
  const { filters, initialData, appliedFilters, setAppliedFilters } = useDataTableContext();
  const t = useLocalization();

  return (
    <div className="alt-data-table-filtering" data-testid="alt-test-datatable-filtering-popup">
      <div className="alt-data-table-filtering__title">{t('data.dataTable.filtering')}</div>
      <FormGroup>
        {filters.map((filter, filterIndex) => {
          const options = new Set<Option<any>>();

          initialData.forEach((row) => {
            options.add(row[filter.accessor]);
          });

          const selectOptions: Option<any>[] = Array.from(options).map((variant) => ({
            label: String(variant),
            value: variant
          }));

          const currentFilterIndex = appliedFilters.findIndex(
            (appliedFilter) => appliedFilter.accessor === filter.accessor
          );
          let currentFilterValue: unknown = null;

          switch (filter.type) {
            case 'select':
            case 'checkbox':
            case 'date':
              currentFilterValue = appliedFilters[currentFilterIndex]?.value || null;
              break;
            case 'checkboxList':
              currentFilterValue = appliedFilters[currentFilterIndex]?.value || [];
              break;
          }

          const onChange = (value) => {
            let _filters = [...appliedFilters];
            if (filter.type === 'select') {
              if (currentFilterIndex === -1) {
                _filters.push({
                  accessor: filter.accessor,
                  value
                });
              } else {
                _filters[currentFilterIndex].value = value;
              }
            } else if (filter.type === 'checkboxList') {
              if (currentFilterIndex === -1) {
                _filters.push({
                  accessor: filter.accessor,
                  value: [value]
                });
              } else {
                if (_filters[currentFilterIndex].value?.indexOf(value) > -1) {
                  _filters[currentFilterIndex].value = _filters[currentFilterIndex].value.filter(
                    (filterValue) => filterValue !== value
                  );
                  if (_filters[currentFilterIndex].value.length === 0) {
                    _filters = _filters.filter(
                      (_, filterIndex) => filterIndex !== currentFilterIndex
                    );
                  }
                } else {
                  _filters[currentFilterIndex].value.push(value);
                }
              }
            } else if (filter.type === 'checkbox') {
              if (currentFilterIndex === -1) {
                _filters.push({
                  accessor: filter.accessor,
                  value
                });
              } else {
                _filters[currentFilterIndex].value = value;
              }
            } else if (filter.type === 'date') {
              if (currentFilterIndex === -1) {
                _filters.push({
                  accessor: filter.accessor,
                  value,
                  range: filter.useRange
                });
              } else {
                _filters[currentFilterIndex].value = value;
              }
            }

            setAppliedFilters(_filters);
          };

          let children = <></>;
          let isLabelNeeded = true;

          switch (filter.type) {
            case 'select':
              children = (
                <Select options={selectOptions} value={currentFilterValue} onChange={onChange} />
              );
              break;
            case 'checkboxList':
              children = (
                <CheckboxList direction={Direction.vertical}>
                  {selectOptions.map((checkbox, checkboxIndex) => (
                    <Checkbox
                      key={checkboxIndex}
                      value={checkbox.value}
                      checked={currentFilterValue?.indexOf(checkbox.value) > -1}
                      onChange={() => onChange(checkbox.value)}>
                      {checkbox.label}
                    </Checkbox>
                  ))}
                </CheckboxList>
              );
              break;
            case 'checkbox':
              isLabelNeeded = false;
              children = (
                <Checkbox checked={Boolean(currentFilterValue)} onChange={onChange}>
                  {filter.label || filter.accessor}
                </Checkbox>
              );
              break;
            case 'date':
              children = (
                <DatePicker
                  value={currentFilterValue}
                  onChange={onChange}
                  useDateRange={filter.useRange}
                  picker={filter.picker}
                />
              );
              break;
          }

          return (
            <FormField
              key={filterIndex}
              label={isLabelNeeded ? filter.label || filter.accessor : ''}>
              {children}
            </FormField>
          );
        })}
      </FormGroup>
      <ButtonContainer align={Align.end} className="alt-data-table-sorting__footer" mobileFluid>
        {appliedFilters.length > 0 && (
          <Button onClick={() => setAppliedFilters([])}>{t('data.dataTable.resetFilters')}</Button>
        )}
        <Button role={Role.primary} onClick={closePopup}>
          {t('common.apply')}
        </Button>
      </ButtonContainer>
    </div>
  );
};

export default memo(DataTableFiltering) as typeof DataTableFiltering;
