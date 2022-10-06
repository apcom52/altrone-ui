import {memo} from "react";
import {Option, OptionParent} from "../../../types";

interface SelectProps<T extends number | string | boolean = string> extends Omit<React.HTMLProps<HTMLSelectElement>, 'value' | 'onChange'> {
  value: T
  options: Option<T>[]
  onChange: (value: T) => void
  parents?: OptionParent[]
  searchable?: boolean
  searchFunc?: (searchTerm: string, item: T) => boolean
  ItemComponent?: (item: Option<T>, checked: boolean) => Element
}

const Select = ({}: SelectProps) => {
  return null
}

export default memo(Select)