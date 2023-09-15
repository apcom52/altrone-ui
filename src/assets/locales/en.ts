import { Localization } from '../../types/Localization';

const localization: Localization = {
  common: {
    apply: 'Apply',
    cancel: 'Cancel',
    search: 'Search',
    back: 'Back',
    asc: 'Ascending',
    desc: 'Descending',
    more: 'Show more',
    less: 'Show less',
    clear: 'Clear'
  },
  containers: {
    modal: {
      closeModal: 'Close modal'
    }
  },
  data: {
    dataTable: {
      showing: 'Showing',
      lines: {
        zero: '{{count}} lines',
        one: '{{count}} line',
        two: '{{count}} lines',
        few: '{{count}} lines',
        many: '{{count}} lines',
        other: '{{count}} lines'
      },
      total: 'Total: {{count}}',
      sortedBy: 'Sorted by',
      sort: 'Sort',
      sorting: 'Sorting',
      field: 'Field',
      direction: 'Direction',
      filters: 'Filters',
      filtering: 'Filtering',
      resetFilters: 'Reset filters',
      resetSorting: 'Reset sorting'
    }
  },
  form: {
    datePicker: {
      chooseMonth: 'Select month',
      chooseYear: 'Select year',
      today: 'Today',
      currentMonth: 'Current month',
      placeholder: 'Select date'
    },
    select: {
      placeholder: 'Select an option',
      others: 'Others',
      search: 'Search...'
    }
  }
};

export default localization;
