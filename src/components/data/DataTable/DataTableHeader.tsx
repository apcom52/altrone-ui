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

const DataTableHeader = () => {
  const { search, setSearch, sortKeys, sortBy, columns, appliedFilters, filters, searchBy } = useDataTableContext()
  const [isSortVisible, setIsSortVisible] = useState(false)
  const [isFilterVisible, setIsFilterVisible] = useState(false)
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
    <div className='alt-data-table-header__filters'>
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
      >
        {ltePhoneL
          ? <Icon i='tune' style='outlined' />
          : <>Filters {appliedFilters.length > 0 && <strong className='alt-data-table-header__filter-value'>({appliedFilters.length})</strong>}</>
        }
      </Button>}
    </div>
    {searchBy
      ?
        ltePhoneL
          ? <Button variant={ButtonVariant.transparent} isIcon><Icon i='search' /></Button>
          : <div className='alt-data-table-header__search' data-testid='alt-test-datatable-search'>
            <TextInput placeholder='Search' value={search} onChange={setSearch} />
          </div>
      : null
    }
    {isSortVisible && sortKeys.length && <FloatingBox targetRef={sortRef.current} onClose={closeSortingPopup} minWidth={250} useParentWidth>
      <DataTableSorting onClose={closeSortingPopup} />
    </FloatingBox>}
    {isFilterVisible && <FloatingBox targetRef={filterRef.current} onClose={closeFilteringPopup} minWidth={250} useParentWidth>
      <DataTableFiltering onClose={closeFilteringPopup} />
    </FloatingBox>}
  </div>
}

export default memo(DataTableHeader)