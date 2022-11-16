import {memo, useMemo, useRef, useState} from "react";
import './data-table-header.scss';
import {Button} from "../../button";
import {ButtonVariant} from "../../button/Button/Button";
import {TextInput} from "../../form";
import {FloatingBox} from "../../containers";
import DataTableSorting from "./DataTableSorting";
import {Icon} from "../../icons";
import DataTableFiltering from "./DataTableFiltering";
import {useDataTableContext} from "../../../contexts";
import {useWindowSize} from "../../../hooks";
import {FloatingBoxMobileBehaviour} from "../../containers/FloatingBox/FloatingBox";
import {Role} from "../../../types";

const DataTableHeader = () => {
  const { search, setSearch, sortKeys, sortBy, columns, appliedFilters, filters, searchBy } = useDataTableContext()
  const [isSortVisible, setIsSortVisible] = useState(false)
  const [isFilterVisible, setIsFilterVisible] = useState(false)
  const [isSearchVisible, setIsSearchVisible] = useState(false)

  const { ltePhoneL } = useWindowSize()

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

  return <div className='alt-data-table-header'>
    {ltePhoneL && !isSearchVisible && <div className='alt-data-table-header__filters'>
        {sortKeys.length > 0 && (
          <Button
            ref={sortRef}
            leftIcon={ltePhoneL ? null : <Icon i='swap_vert' />}
            variant={ButtonVariant.transparent}
            onClick={() => setIsSortVisible(true)}
            isIcon={ltePhoneL}
          >
            {ltePhoneL
              ? <Icon i='swap_vert' />
              : <>{sortBy ? 'Sorted' : 'Sort'} by {currentSortingColumn && <strong className='alt-data-table-header__filter-value'>{currentSortingColumn.label || currentSortingColumn.accessor}</strong>}</>
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
        >
          {ltePhoneL
            ? <Icon i='tune' style='outlined' />
            : <>Filters {appliedFilters.length > 0 && <strong className='alt-data-table-header__filter-value'>({appliedFilters.length})</strong>}</>
          }
        </Button>}
    </div>}
    {(searchBy && !isSearchVisible)
      ?
        ltePhoneL
          ? <Button variant={ButtonVariant.transparent} isIcon onClick={() => setIsSearchVisible(true)}><Icon i='search' /></Button>
          : <div className='alt-data-table-header__search' data-testid='alt-test-datatable-search'>
            <TextInput placeholder='Search' value={search} onChange={setSearch} />
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
            <TextInput placeholder='Search' value={search} onChange={setSearch} />
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
    {isSortVisible && sortKeys.length && <FloatingBox targetRef={sortRef.current} onClose={closeSortingPopup} minWidth={250} mobileBehaviour={FloatingBoxMobileBehaviour.modal} useParentWidth>
      <DataTableSorting onClose={closeSortingPopup} />
    </FloatingBox>}
    {isFilterVisible && <FloatingBox targetRef={filterRef.current} onClose={closeFilteringPopup} minWidth={250} mobileBehaviour={FloatingBoxMobileBehaviour.modal} useParentWidth>
      <DataTableFiltering onClose={closeFilteringPopup} />
    </FloatingBox>}
  </div>
}

export default memo(DataTableHeader)