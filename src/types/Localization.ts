type PluralString = {
  zero: string;
  one: string;
  two: string;
  few: string;
  many: string;
  other: string;
};

export type PluralLocalizationPaths = 'form.filePicker.selectedFiles' | 'data.dataTable.lines';

export interface Localization {
  common: {
    apply: string;
    cancel: string;
    search: string;
    back: string;
    asc: string;
    desc: string;
    more: string;
    less: string;
    clear: string;
  };
  containers: {
    modal: {
      closeModal: string;
    };
  };
  data: {
    dataTable: {
      showing: string;
      lines: PluralString;
      total: string;
      sortedBy: string;
      sort: string;
      sorting: string;
      field: string;
      direction: string;
      filters: string;
      filtering: string;
      resetFilters: string;
      resetSorting: string;
    };
  };
  form: {
    datePicker: {
      chooseMonth: string;
      chooseYear: string;
      today: string;
      currentMonth: string;
      placeholder: string;
      startYear: string;
      endYear: string;
    };
    select: {
      placeholder: string;
      others: string;
      search: string;
    };
    filePicker: {
      placeholder: string;
      selectedFiles: PluralString;
      errorMessage: string;
      uploadNew: string;
      deleteFile: string;
      reuploadFile: string;
    };
  };
  list: {
    breadcrumbs: {
      home: string;
    };
  };
  indicators: {
    pagination: {
      moveToPage: string;
      apply: string;
    };
  };
}
