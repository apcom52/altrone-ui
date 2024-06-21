import {
  DropdownAction,
  DropdownCheckbox,
  DropdownChildMenu,
  DropdownMenu,
  DropdownRadioItem,
  DropdownRadioList,
} from './components';
import { DropdownWrapper } from './Dropdown.tsx';

const DropdownNamespace = Object.assign(DropdownWrapper, {
  Menu: DropdownMenu,
  Action: DropdownAction,
  Checkbox: DropdownCheckbox,
  RadioList: DropdownRadioList,
  RadioItem: DropdownRadioItem,
  ChildMenu: DropdownChildMenu,
});

export { DropdownNamespace as Dropdown };
