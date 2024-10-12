type PluralString = {
  zero: string;
  one: string;
  two: string;
  few: string;
  many: string;
  other: string;
};

export interface Localization {
  common: {
    clear: string;
    apply: string;
    close: string;
    cancel: string;
    delete: string;
    refresh: string;
  };
  datePicker: {
    placeholder: string;
    placeholderRange: string;
    today: string;
    thisMonth: string;
    thisYear: string;
  };
  filePicker: {
    noFiles: string;
    placeholder: string;
    errorMessage: string;
  };
  numberInput: {
    increase: string;
    decrease: string;
  };
  passwordInput: {
    showPassword: string;
    hidePassword: string;
  };
  search: {
    placeholder: string;
  };
  pagination: {
    progress: string;
    title: string;
    action: string;
  };
  dataTable: {
    filters: string;
    filtering: string;
    addFilter: string;
    selectableMode: string;
    disableSelectableMode: string;
    where: string;
    and: string;
    noFilters: string;
    shownRows: PluralString;
    selectedRows: PluralString;
    totalRows: string;
    rowsPerPage: string;
    stringFilter: {
      empty: string;
      notEmpty: string;
      contain: string;
      notContain: string;
      equal: string;
      notEqual: string;
    };
    numberFilter: {
      equal: string;
      notEqual: string;
      gt: string;
      gte: string;
      lt: string;
      lte: string;
      between: string;
      notBetween: string;
    };
    arrayFilter: {
      has: string;
      notHas: string;
    };
    booleanFilter: {
      positive: string;
      negative: string;
    };
  };
  photoViewer: {
    previous: string;
    next: string;
    progressLabel: string;
    progress: string;
    description: string;
    noDescription: string;
  };
  collapsedList: {
    expand: string;
    collapse: string;
  };
  closeButton: {
    ariaLabel: string;
  };
}
