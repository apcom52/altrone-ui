import { Localization } from './types.ts';

export const en: Localization = {
  common: {
    clear: 'Clear',
    apply: 'Apply',
    close: 'Close',
    cancel: 'Cancel',
    delete: 'Delete',
    refresh: 'Refresh',
  },
  datePicker: {
    placeholder: 'Select date',
    placeholderRange: 'Select period',
    today: 'Today',
    thisMonth: 'This month',
    thisYear: 'This year',
  },
  filePicker: {
    noFiles: 'No files chosen',
    placeholder: 'Choose file',
    errorMessage: 'Cannot upload the file. Please try again',
  },
  numberInput: {
    increase: 'Increase',
    decrease: 'Decrease',
  },
  passwordInput: {
    showPassword: 'Show password',
    hidePassword: 'Hide password',
  },
  search: {
    placeholder: 'Search',
  },
  pagination: {
    progress: '{{current}} of {{total}}',
    title: 'Navigate to page',
    action: 'Navigate',
  },
  dataTable: {
    filters: 'Filters',
    filtering: 'Filtering',
    addFilter: 'Add filter',
    selectableMode: 'Select rows',
    disableSelectableMode: 'Disable selectable mode',
    where: 'Where',
    and: 'AND',
    noFilters:
      'No filters are currently applied. Click "Add Filter" to create a new filter.',
    shownRows: {
      zero: '{{count}} rows shown',
      one: '{{count}} rows shown',
      two: '{{count}} rows shown',
      few: '{{count}} rows shown',
      many: '{{count}} rows shown',
      other: '{{count}} rows shown',
    },
    selectedRows: {
      zero: '{{count}} rows selected',
      one: '{{count}} rows selected',
      two: '{{count}} rows selected',
      few: '{{count}} rows selected',
      many: '{{count}} rows selected',
      other: '{{count}} rows selected',
    },
    totalRows: 'Total rows',
    rowsPerPage: 'Rows per page',
    stringFilter: {
      empty: 'is empty',
      notEmpty: 'is not empty',
      contain: 'contains',
      notContain: 'not contains',
      equal: 'equals to',
      notEqual: 'not equals to',
    },
    numberFilter: {
      equal: 'equals to',
      notEqual: 'not equals to',
      gt: '>',
      gte: '≥',
      lt: '<',
      lte: '≤',
      between: 'is between',
      notBetween: 'is not between',
    },
    arrayFilter: {
      has: 'is contained in',
      notHas: 'is not contained in',
    },
    booleanFilter: {
      positive: 'is positive',
      negative: 'is negative',
    },
  },
  photoViewer: {
    previous: 'Previous photo',
    next: 'Next photo',
    progressLabel: 'Photo {{current}} of {{total}}',
    progress: '{{current}} of {{total}}',
    description: 'Description',
    noDescription: 'No description',
  },
  collapsedList: {
    expand: 'Show {{count}} hidden',
    collapse: 'Show less',
  },
  closeButton: {
    ariaLabel: 'Close',
  },
};
