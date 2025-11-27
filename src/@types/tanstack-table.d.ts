import '@tanstack/react-table';

declare module '@tanstack/react-table' {
  interface TableState {
    selectableMode?: boolean;
  }

  interface FilterFnOption<TData> {
    customString?: FilterFn<TData>;
    customText?: FilterFn<TData>;
    customNumber?: FilterFn<TData>;
    customArray?: FilterFn<TData>;
    customBoolean?: FilterFn<TData>;
    customDate?: FilterFn<TData>;
    customSelect?: FilterFn<TData>;
    customLink?: FilterFn<TData, any>;
    customColor?: FilterFn<TData, any>;
    customCustom?: FilterFn<TData, any>;
  }
}
