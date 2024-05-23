import { DataTableProps } from './DataTable.types';
import { DataTableContextProvider } from './DataTable.context';
import { Body, ColumnHeaders, Header, Footer } from './inner';
import { Action } from './components';
import s from './dataTable.module.scss';

const DataTableComponent = <DataType extends object>(
  props: DataTableProps<DataType>,
) => {
  const { children, selectable } = props;

  return (
    <DataTableContextProvider<DataType> {...props}>
      <div className={s.Wrapper}>
        <Header<DataType> selectable={Boolean(selectable)}>{children}</Header>
        <table className={s.Table}>
          <ColumnHeaders />
          <Body />
        </table>
        <Footer />
      </div>
    </DataTableContextProvider>
  );
};

const DataTableNamespace = Object.assign(DataTableComponent, {
  Action: Action,
});

export { DataTableNamespace as DataTable };
