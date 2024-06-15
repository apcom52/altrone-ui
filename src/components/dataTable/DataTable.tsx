import { DataTableProps } from './DataTable.types';
import { DataTableContextProvider } from './DataTable.context';
import { Body, ColumnHeaders, Header, Footer } from './inner';
import { Action } from './components';
import s from './dataTable.module.scss';
import { Children, useMemo } from 'react';

const DataTableComponent = <DataType extends object>(
  props: DataTableProps<DataType>,
) => {
  const { children, selectable } = props;

  const dataTableHeaderVisible = useMemo(() => {
    return (
      Children.count(children) > 0 ||
      props.columns.filter((column) => column.filterable).length > 0
    );
  }, [children, props.columns]);

  return (
    <DataTableContextProvider<DataType> {...props}>
      <div className={s.Wrapper}>
        {dataTableHeaderVisible ? (
          <Header<DataType> selectable={Boolean(selectable)}>{children}</Header>
        ) : null}
        <table className={s.Table}>
          <ColumnHeaders headingVisible={dataTableHeaderVisible} />
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
