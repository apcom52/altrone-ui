import {withAltrone} from "../../hocs";
import {Direction, Size, Theme} from "../../types";
import {
  Checkbox,
  CheckboxList,
  DatePicker,
  InputIslandType,
  NumberInput,
  PasswordInput,
  RadioList,
  ScrollableSelector,
  Select,
  Switcher,
  Textarea,
  TextInput
} from "./index";
import {Icon} from "../icons";
import {SelectOptionProps} from "./Select";
import button from "../button/Button/Button";
import clsx from "clsx";
import {useCallback, useEffect, useState} from "react";
import {Align} from "../../types/Align";
import {Picker} from "./DatePicker/DatePicker";

const Template = ({component, dark, value = '', locale, ...args}) => {
  const [_value, setValue] = useState(value)

  useEffect(() => {
    setValue(value)
  }, [value])

  const onChange = useCallback((value) => {
    setValue(value)
  }, [])

  return withAltrone(component, {
    theme: dark ? Theme.dark : Theme.light,
    locale
  })({
    ...args,
    value: _value,
    onChange,
  })
}

const CustomSelectItem = ({ label, value, onSelect, inSelectHeader, parent, selected, disabled, className}: SelectOptionProps) => {
  const ComponentName = inSelectHeader ? 'div' : 'button'

  return <ComponentName
    className={clsx('alt-select-option', {
      'alt-select-option--selected': selected
    })}
    onClick={() => onSelect(value)}
  >
    <div className='alt-select-option__label'>{value} {label}</div>
  </ComponentName>
}

export const TextInputExample = Template.bind({})
TextInputExample.args = {
  component: TextInput,
  placeholder: 'Type something',
  hintText: '',
  errorText: '',
  required: false,
  size: Size.medium,
  dark: false
}

export const TextInputWithLeftIslandExample = Template.bind({})
TextInputWithLeftIslandExample.args = {
  component: TextInput,
  placeholder: 'Type something',
  prefix: 'search:',
  size: Size.medium,
  dark: false
}

export const TextInputWithRightIslandExample = Template.bind({})
TextInputWithRightIslandExample.args = {
  component: TextInput,
  placeholder: 'Type something',
  rightIcon: <Icon i='search' />,
  size: Size.medium,
  dark: false
}

export const TextInputWithBothIslandsExample = Template.bind({})
TextInputWithBothIslandsExample.args = {
  component: TextInput,
  placeholder: 'Type something Type something Type something Type something Type something ' +
    'Type something Type something Type something Type something Type something Type something Type something',
  leftIsland: {
    type: InputIslandType.components,
    content: <b>{'q>:'}</b>
  },
  rightIsland: {
    type: InputIslandType.actions,
    content: [{
      title: 'Decrease',
      icon: <Icon i='keyboard_arrow_down' />,
      onClick: () => alert('Decrease clicked')
    }, {
      title: 'Increase',
      icon: <Icon i='keyboard_arrow_up' />,
      onClick: () => alert('Increase clicked')
    }]
  },
  required: false,
  disabled: false,
  size: Size.medium,
  dark: false
}

export const PasswordInputExample = Template.bind({})
PasswordInputExample.args = {
  component: PasswordInput,
  placeholder: 'Type your password',
  dark: false,
  size: Size.medium,
  showControls: true
}

export const NumberInputExample = Template.bind({})
NumberInputExample.args = {
  component: NumberInput,
  value: 0,
  digitsAfterDecimal: 0,
  step: 3,
  min: 0,
  max: 10,
  size: Size.medium,
  dark: false,
  showControls: true
}

export const CheckboxExample = Template.bind({})
CheckboxExample.args = {
  component: Checkbox,
  value: 0,
  checked: false,
  disabled: false,
  danger: false,
  children: 'Example',
  dark: false,
}

export const CheckboxListExample = Template.bind({})
CheckboxListExample.args = {
  component: CheckboxList,
  children: [<Checkbox onChange={() => null}>First option</Checkbox>, <Checkbox onChange={() => null}>Second option</Checkbox>, <Checkbox onChange={() => null}>Third option</Checkbox>, <Checkbox onChange={() => null}>Forth option</Checkbox>,
    <Checkbox onChange={() => null}>First option</Checkbox>, <Checkbox onChange={() => null}>Second option</Checkbox>, <Checkbox onChange={() => null}>Third option</Checkbox>, <Checkbox onChange={() => null}>Forth option</Checkbox>,
    <Checkbox onChange={() => null}>First option</Checkbox>, <Checkbox onChange={() => null}>Second option</Checkbox>, <Checkbox onChange={() => null}>Third option</Checkbox>, <Checkbox onChange={() => null}>Forth option</Checkbox>],
  dark: false,
}
CheckboxListExample.argTypes = {
  direction: {
    control: 'select',
    options: [Direction.horizontal, Direction.vertical]
  }
}

export const SelectExample = Template.bind({})
SelectExample.args = {
  component: Select,
  value: 'uk',
  dark: false,
  fluid: false,
  searchable: false,
  disabled: false,
  options: [{
    label: 'The United Kingdom',
    value: 'uk',
    parent: 'nato'
  }, {
    label: 'The United States of America',
    value: 'use',
    parent: 'nato'
  }, {
    label: 'Spain',
    value: 'spain',
    parent: 'eu',
    disabled: true
  }, {
    label: 'France',
    parent: 'eu',
    value: 'france'
  }, {
    label: 'Turkey',
    parent: 'nato',
    value: 'turkey',
  }, {
    label: 'Russia',
    value: 'russia'
  }, {
    label: 'Japan',
    parent: 'nato',
    value: 'japan'
  }, {
    label: 'China',
    value: 'china'
  }, {
    label: 'Brazil',
    value: 'brazil'
  }, {
    label: 'Germany',
    parent: 'eu',
    value: 'germany'
  }],
  parents: [{
    label: "European Union",
    value: 'eu',
    disabled: true
  }, {
    label: 'NATO',
    value: 'nato'
  }]
}
SelectExample.argTypes = {
  size: {
    control: 'select',
    options: ['small', 'medium', 'large']
  }
}

export const CustomSelectExample = Template.bind({})
CustomSelectExample.args = {
  component: Select,
  value: '🇫🇷',
  dark: false,
  fluid: false,
  searchable: false,
  disabled: false,
  options: [{
    label: 'The United Kingdom',
    value: '🇬🇧',
    parent: 'nato'
  }, {
    label: 'The United States of America',
    value: '🇺🇸',
    parent: 'nato'
  }, {
    label: 'Spain',
    value: '🇪🇸',
    parent: 'eu',
    disabled: true
  }, {
    label: 'France',
    parent: 'eu',
    value: '🇫🇷'
  }, {
    label: 'Turkey',
    parent: 'nato',
    value: '🇹🇷',
  }, {
    label: 'Russia',
    value: '🇷🇺'
  }, {
    label: 'Japan',
    parent: 'nato',
    value: '🇯🇵'
  }, {
    label: 'China',
    value: '🇨🇳'
  }, {
    label: 'Brazil',
    value: '🇧🇷'
  }, {
    label: 'Germany',
    parent: 'eu',
    value: '🇩🇪'
  }],
  parents: [{
    label: "European Union",
    value: 'eu',
    disabled: true
  }, {
    label: 'NATO',
    value: 'nato'
  }],
  ItemComponent: CustomSelectItem,
}
CustomSelectExample.argTypes = {
  size: {
    control: 'select',
    options: ['small', 'medium', 'large']
  }
}

export const SwitcherExample = Template.bind({})
SwitcherExample.args = {
  component: Switcher,
  children: 'Example',
  checked: false,
  danger: false,
  disabled: false,
  dark: false,
}
SwitcherExample.argTypes = {
  align: {
    control: 'select',
    options: [Align.start, Align.end]
  }
}

export const DatePickerExample = Template.bind({})
DatePickerExample.args = {
  value: null,
  component: DatePicker,
  locale: 'en-US',
  disabled: false,
  dark: false,
}
DatePickerExample.argTypes = {
  picker: {
    control: 'select',
    value: Picker.day,
    options: [Picker.day, Picker.month, Picker.year]
  },
  size: {
    control: 'select',
    options: ['small', 'medium', 'large']
  }
}

export const ScrollableSelectorExample = Template.bind({})
ScrollableSelectorExample.args = {
  component: ScrollableSelector,
  options: [
    { label: 'January', value: 1 },
    { label: 'February', value: 2 },
    { label: 'March', value: 3 },
    { label: 'April', value: 4 },
    { label: 'May', value: 5 },
    { label: 'June', value: 6 },
    { label: 'July', value: 7 },
    { label: 'August', value: 8 },
    { label: 'September', value: 9 },
    { label: 'October', value: 10 },
    { label: 'November', value: 11 },
    { label: 'December', value: 12 },
  ],
  value: 1,
  width: '100%',
  disabled: false,
  dark: false,
}
ScrollableSelectorExample.argTypes = {
  align: {
    control: 'select',
    options: [Align.start, Align.center, Align.end]
  },
}

export const RadioListExample = Template.bind({})
RadioListExample.args = {
  component: RadioList,
  options: [
    { label: 'January', value: 1 },
    { label: 'February', value: 2 },
    { label: 'March', value: 3 },
    { label: 'April', value: 4 },
    { label: 'May', value: 5 },
    { label: 'June', value: 6 },
    { label: 'July', value: 7 },
    { label: 'August', value: 8, disabled: true },
    { label: 'September', value: 9 },
    { label: 'October', value: 10 },
    { label: 'November', value: 11 },
    { label: 'December', value: 12 },
  ],
  value: 2,
  disabled: false,
  dark: false,
}
RadioListExample.argTypes = {
  direction: {
    control: 'select',
    options: [Direction.horizontal, Direction.vertical]
  },
}

export const TextareaExample = Template.bind({})
TextareaExample.args = {
  component: Textarea,
  placeholder: 'Type your password',
  dark: false,
  size: Size.medium,
  showControls: true
}

export default {
  component: TextInputExample,
  title: 'Forms',
}