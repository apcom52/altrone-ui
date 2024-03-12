import React from 'react';
import { FormField, FormGroup, Popover } from '../../containers';
import { Checkbox, CheckboxList, Select, Button, DatePicker } from '../../form';
import './data-table-filtering.scss';
import { Align, Direction, Option, Role } from '../../../types';
import ButtonContainer from '../../containers/ButtonContainer/ButtonContainer';
import { useLocalization } from '../../../hooks';
import dayjs from 'dayjs';
import { useDataTableContext } from './DataTable.context';
import { DataTable } from './DataTable';
import { Icon } from '../../typography';

export const DataTableFiltering = <T extends object>() => {
  const { filters, initialData, appliedFilters, setAppliedFilters } = useDataTableContext();
  const t = useLocalization();

  return (
    <Popover
      placement="bottom"
      useParentWidth
      minWidth={250}
      content={({ closePopup }) => (
        <div className="alt-data-table-filtering" data-testid="alt-test-datatable-filtering-popup">
          <div className="alt-data-table-filtering__title">{t('data.dataTable.filtering')}</div>
          <FormGroup>
            {filters.map((filter, filterIndex) => {
              const options = new Set<Option<any>>();

              initialData.forEach((row) => {
                options.add(row[filter.accessor]);
              });

              const selectOptions: Option<unknown>[] = Array.from(options).map((variant) => ({
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

              const onChange = (value: unknown) => {
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
                      _filters[currentFilterIndex].value = _filters[
                        currentFilterIndex
                      ].value.filter((filterValue: unknown) => filterValue !== value);
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

              let minDate, maxDate;
              if (filter.type === 'date') {
                const allDates = initialData.map((item) => dayjs(item[filter.accessor]));
                minDate = dayjs.min(allDates)?.toDate();
                maxDate = dayjs.max(allDates)?.toDate();
              }

              switch (filter.type) {
                case 'select':
                  children = (
                    <Select
                      options={selectOptions}
                      value={currentFilterValue}
                      onChange={onChange}
                    />
                  );
                  break;
                case 'checkboxList':
                  children = (
                    <CheckboxList direction={Direction.vertical}>
                      {selectOptions.map((checkbox, checkboxIndex) => (
                        <Checkbox
                          key={checkboxIndex}
                          checked={(currentFilterValue as unknown[])?.indexOf(checkbox.value) > -1}
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
                      value={currentFilterValue as Date}
                      onChange={onChange}
                      useDateRange={filter.useRange}
                      picker={filter.picker}
                      minDate={minDate}
                      maxDate={maxDate}
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
              <Button onClick={() => setAppliedFilters([])}>
                {t('data.dataTable.resetFilters')}
              </Button>
            )}
            <Button role={Role.primary} onClick={closePopup}>
              {t('common.apply')}
            </Button>
          </ButtonContainer>
        </div>
      )}>
      <DataTable.Action
        label={t('data.dataTable.filters')}
        icon={<Icon i="tune" style="outlined" />}
        indicator={
          appliedFilters.length > 0
            ? { position: 'baseline', value: appliedFilters.length }
            : undefined
        }
      />
    </Popover>
  );
};
