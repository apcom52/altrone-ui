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
    edit: string;
    done: string;
  };
  breadcrumbs: {
    label: string;
  };
  loading: {
    label: string;
  };
  datePicker: {
    placeholder: string;
    placeholderRange: string;
    today: string;
    thisMonth: string;
    thisYear: string;
    next: string;
    prev: string;
    clickToChangeView: string;
    startDate: string;
    endDate: string;
  };
  filePicker: {
    noFiles: string;
    placeholder: string;
    errorMessage: string;
    untitledFile: string;
    retryUpload: string;
  };
  textInput: {
    loading: string;
  };
  passwordInput: {
    showPassword: string;
    hidePassword: string;
  };
  search: {
    placeholder: string;
  };
  select: {
    notFound: string;
  };
  toolbar: {
    back: string;
    forward: string;
    search: string;
    collapseSidebar: string;
    expandSidebar: string;
  };
  screen: {
    sidebarLabel: string;
    bottomNavigationLabel: string;
  };
  pagination: {
    navigation: string;
    previous: string;
    next: string;
    firstPage: string;
    lastPage: string;
    page: string;
  };
  dataTable: {
    filters: string;
    filtering: string;
    addFilter: string;
    selectableMode: string;
    disableSelectableMode: string;
    selectRow: string;
    deselectRow: string;
    where: string;
    and: string;
    noFilters: string;
    empty: string;
    chooseRule: string;
    shownRows: PluralString;
    selectedRows: PluralString;
    totalRows: string;
    rowsPerPage: string;
    actions: string;
    moreActions: string;
    stringFilter: {
      empty: string;
      notEmpty: string;
      contain: string;
      notContain: string;
      equal: string;
      notEqual: string;
    };
    numberFilter: {
      empty: string;
      notEmpty: string;
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
    dateFilter: {
      empty: string;
      notEmpty: string;
      equal: string;
      notEqual: string;
      gt: string;
      gte: string;
      lt: string;
      lte: string;
      between: string;
      beyond: string;
    };
    selectFilter: {
      has: string;
      notHas: string;
    };
    colorFilter: {
      has: string;
      notHas: string;
    };
    passwordFilter: {
      empty: string;
      notEmpty: string;
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
  notifications: {
    regionLabel: string;
  };
  dialog: {
    alertTitle: string;
    confirmTitle: string;
    promptTitle: string;
    ok: string;
    confirm: string;
    cancel: string;
    promptPlaceholder: string;
  };
  colorPicker: {
    placeholder: string;
    savedColors: string;
    palette: string;
  };
  result: {
    empty: string;
  };
  autocompleteInput: {
    loadError: string;
  };
  calendar: {
    previousMonth: string;
    nextMonth: string;
  };
  splitter: {
    collapsePanel: string;
    expandPanel: string;
    panel: string;
  };
}
