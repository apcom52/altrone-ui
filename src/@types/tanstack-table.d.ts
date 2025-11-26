import '@tanstack/react-table';

declare module '@tanstack/react-table' {
  interface TableState {
    selectableMode?: boolean;
  }
}
