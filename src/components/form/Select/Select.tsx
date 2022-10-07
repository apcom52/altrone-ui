import {memo, useMemo} from "react";
import {Option, OptionParent} from "../../../types";
import button from "../../button/Button/Button";

interface SelectProps<T extends number | string | boolean = string> extends Omit<React.HTMLProps<HTMLSelectElement>, 'value' | 'onChange'> {
  value: T
  options: Option<T>[]
  onChange: (value: T) => void
  parents?: OptionParent[]
  searchable?: boolean
  searchFunc?: (searchTerm: string, item: T) => boolean
  ItemComponent?: (item: Option<T>, checked: boolean) => Element
}

const Select = ({ value, options = [], onChange, parents, searchable = false, searchFunc, ItemComponent }: SelectProps) => {
  const selectedOption = useMemo(() => {
    return options.find(option => option.value === value)
  }, [value, options])

  return <button>
    {selectedOption ? selectedOption.label : null}
  </button>
}

export default memo(Select)