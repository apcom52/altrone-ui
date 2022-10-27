import {memo} from "react";
import './data-table-header.scss';
import {Button} from "../../button";
import {ButtonVariant} from "../../button/Button/Button";
import {TextInput} from "../../form";

const DataTableHeader = () => {
  return <div className='alt-data-table-header'>
    <div className='alt-data-table-header__filters'>
      <Button variant={ButtonVariant.transparent}>Sort by</Button>
      <Button variant={ButtonVariant.transparent}>Filters</Button>
    </div>
    <div className='alt-data-table-header__search'>
      <TextInput placeholder='Search' />
    </div>
  </div>
}

export default memo(DataTableHeader)