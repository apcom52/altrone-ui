import {memo, useMemo, useRef, useState} from "react";
import './data-table-header.scss';
import {Button, ButtonVariant} from "../../button";
import {TextInput} from "../../form";
import {FloatingBox} from "../../containers";
import DataTableSorting from "./DataTableSorting";
import {Icon} from "../../icons";
import DataTableFiltering from "./DataTableFiltering";
import {useDataTableContext} from "../../../contexts";
import {useLocalization, useWindowSize} from "../../../hooks";
import {FloatingBoxMobileBehaviour} from "../../containers/FloatingBox/FloatingBox";
import {Role} from "../../../types";
import {DataTableAction as DataTableActionType} from "./DataTable";
import DataTableAction from "./DataTableAction";

interface DataTableHeaderProps {
  actions: DataTableActionType[];
}

const DataTableHeader = ({ actions = [] }: DataTableHeaderProps) => {
  const { search, setSearch, sortKeys, sortBy, columns, appliedFilters, filters, searchBy, mobileColumns } = useDataTableContext()
  const [isSortVisible, setIsSortVisible] = useState(false)
  const [isFilterVisible, setIsFilterVisible] = useState(false)
  const [isSearchVisible, setIsSearchVisible] = useState(false)

  const t = useLocalization()

  const { ltePhoneL, gtPhoneL } = useWindowSize()

  const currentSortingColumn = useMemo(() => {
    if (!sortBy) return null

    return columns.find(column => column.accessor === sortBy) || null
  }, [columns, sortBy])

  const sortRef = useRef()
  const filterRef = useRef()

  const closeSortingPopup = () => {
    setIsSortVisible(false)
  }

  const closeFilteringPopup = () => {
    setIsFilterVisible(false)
  }

  return <>
    <tr className='alt-data-table-header-wrapper'>
      <th colSpan={ltePhoneL ? mobileColumns.length + 1 : columns.length}>
        <div className='alt-data-table-header'>
          {(gtPhoneL || (ltePhoneL && !isSearchVisible)) && <div className='alt-data-table-header__actions'>
            {actions.map((action, actionIndex) => (
              <DataTableAction key={actionIndex} {...action} />
            ))}
            {sortKeys.length > 0 && (
              <Button
                ref={sortRef}
                leftIcon={ltePhoneL ? null : <Icon i='swap_vert' />}
                variant={ButtonVariant.text}
                onClick={() => setIsSortVisible(true)}
                isIcon={ltePhoneL}
              >
                {ltePhoneL
                  ? <Icon i='swap_vert' />
                  : <>{sortBy ? t('data.dataTable.sortedBy') : t('data.dataTable.sort')} {currentSortingColumn && <strong className='alt-data-table-header__filter-value'>{currentSortingColumn.label || currentSortingColumn.accessor}</strong>}</>
                }
              </Button>
            )}
            {filters.length > 0 && <Button
              ref={filterRef}
              leftIcon={ltePhoneL ? null : <Icon i='tune' style='outlined' />}
              variant={ButtonVariant.transparent}
              onClick={() => setIsFilterVisible(true)}
              isIcon={ltePhoneL}
              role={ltePhoneL && appliedFilters.length > 0 && Role.primary}
              indicator={appliedFilters.length > 0 && {
                position: 'baseline',
                value: appliedFilters.length
              }}
            >
              {ltePhoneL
                ? <Icon i='tune' style='outlined' />
                : <>{t('data.dataTable.filters')}</>
              }
            </Button>}
          </div>}
          {(searchBy && !isSearchVisible)
            ?
              ltePhoneL
                ? <Button variant={ButtonVariant.transparent} isIcon onClick={() => setIsSearchVisible(true)}><Icon i='search' /></Button>
                : <div className='alt-data-table-header__search' data-testid='alt-test-datatable-search'>
                  <TextInput placeholder={t('common.search')} value={search} onChange={setSearch} />
                </div>
            : null
          }
          {(searchBy && isSearchVisible)
            ? <>
                <Button
                  ref={sortRef}
                  variant={ButtonVariant.transparent}
                  onClick={() => setIsSearchVisible(false)}
                  isIcon={ltePhoneL}
                >
                  <Icon i='arrow_forward_ios' />
                </Button>

                <div className='alt-data-table-header__search' data-testid='alt-test-datatable-search'>
                  <TextInput placeholder={t('common.search')} value={search} onChange={setSearch} fluid />
                </div>
                <Button
                  ref={sortRef}
                  variant={ButtonVariant.transparent}
                  onClick={() => setSearch('')}
                  isIcon={ltePhoneL}
                >
                  <Icon i='backspace' />
                </Button>
              </>
            : null
          }
        </div>
      </th>
    </tr>
    {isSortVisible && sortKeys.length && <FloatingBox targetElement={sortRef.current} onClose={closeSortingPopup} minWidth={250} mobileBehaviour={FloatingBoxMobileBehaviour.modal} useParentWidth useRootContainer={true}>
      <DataTableSorting onClose={closeSortingPopup} />
    </FloatingBox>}
    {isFilterVisible && <FloatingBox targetElement={filterRef.current} onClose={closeFilteringPopup} minWidth={250} mobileBehaviour={FloatingBoxMobileBehaviour.modal} useParentWidth useRootContainer={true}>
      <DataTableFiltering onClose={closeFilteringPopup} />
    </FloatingBox>}
  </>
}

export default memo(DataTableHeader)