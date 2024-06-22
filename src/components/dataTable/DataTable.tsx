import { DataTableProps } from './DataTable.types';
import { DataTableContextProvider } from './DataTable.context';
import { Body, ColumnHeaders, Header, Footer } from './inner';
import { Action } from './components';
import s from './dataTable.module.scss';
import { Children, useMemo } from 'react';
import { useConfiguration } from '../configuration';
import clsx from 'clsx';

const DataTableComponent = <DataType extends object>(
  props: DataTableProps<DataType>,
) => {
  const { dataTable: dataTableConfig = {} } = useConfiguration();

  const { children, selectable, showFooter = true } = props;

  const cls = clsx(s.Table, props.className, dataTableConfig.className);
  const styles = {
    ...dataTableConfig.style,
    ...props.style,
  };

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
        <table className={cls} style={styles}>
          <ColumnHeaders headingVisible={dataTableHeaderVisible} />
          <Body />
        </table>
        {showFooter ? <Footer /> : null}
      </div>
    </DataTableContextProvider>
  );
};

const DataTableNamespace = Object.assign(DataTableComponent, {
  Action: Action,
});

export { DataTableNamespace as DataTable };
