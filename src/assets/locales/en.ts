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
      resetSorting: 'Reset sorting',
      select: 'Select rows'
    }
  },
  form: {
    datePicker: {
      chooseMonth: 'Select month',
      chooseYear: 'Select year',
      today: 'Today',
      currentMonth: 'Current month',
      placeholder: 'Select date',
      startYear: 'Start Year',
      endYear: 'End Year'
    },
    select: {
      placeholder: 'Select an option',
      others: 'Others',
      search: 'Search...'
    },
    filePicker: {
      placeholder: 'Select a file',
      selectedFiles: {
        zero: 'Uploaded {{count}} files',
        one: 'Uploaded {{count}} file',
        two: 'Uploaded {{count}} files',
        few: 'Uploaded {{count}} files',
        many: 'Uploaded {{count}} files',
        other: 'Uploaded {{count}} files'
      },
      uploadNew: 'Upload new file',
      errorMessage: 'Cannot upload the file',
      deleteFile: 'Delete the file',
      reuploadFile: 'Repeat again'
    }
  },
  list: {
    breadcrumbs: {
      home: 'Home'
    }
  },
  indicators: {
    pagination: {
      moveToPage: 'Navigate to page',
      apply: 'Navigate'
    }
  }
};

export default localization;
