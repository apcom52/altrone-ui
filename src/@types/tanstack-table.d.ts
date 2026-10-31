import '@tanstack/react-table';

declare module '@tanstack/react-table' {
  interface TableState {
    selectableMode?: boolean;
  }

  interface FilterFnOption<TData> {
    text?: FilterFn<TData>;
    number?: FilterFn<TData>;
    password?: FilterFn<TData>;
  }
}
