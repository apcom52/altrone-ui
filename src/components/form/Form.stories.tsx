import {withAltrone} from "../../hocs";
import {Theme} from "../../types";
import {PasswordInput, TextInput} from "./index";
import {Icon} from "../icons";
import {InputIslandType} from "./TextInput/TextInput";
import {NumberInput} from "./NumberInput";
import {useCallback, useEffect, useState} from "react";

const Template = ({component, dark, value = '', ...args}) => {
  const [_value, setValue] = useState(value)

  console.log('value', _value);

  useEffect(() => {
    setValue(value)
  }, [value])

  const onChange = useCallback((value) => {
    setValue(value)
  }, [])

  return withAltrone(component, {
    theme: dark ? Theme.dark : Theme.light
  })({
    ...args,
    value: _value,
    onChange
  })
}

export const TextInputExample = Template.bind({})
TextInputExample.args = {
  component: TextInput,
  placeholder: 'Type something',
  hintText: '',
  errorText: '',
  required: false,
  dark: false
}

export const TextInputWithLeftIslandExample = Template.bind({})
TextInputWithLeftIslandExample.args = {
  component: TextInput,
  placeholder: 'Type something',
  prefix: 'search:',
  dark: false
}

export const TextInputWithRightIslandExample = Template.bind({})
TextInputWithRightIslandExample.args = {
  component: TextInput,
  placeholder: 'Type something',
  rightIcon: <Icon i='search' />,
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
  dark: false
}

export const PasswordInputExample = Template.bind({})
PasswordInputExample.args = {
  component: PasswordInput,
  placeholder: 'Type your password',
  dark: false,
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
  dark: false,
  showControls: true
}

export default {
  component: TextInputExample,
  title: 'Forms',
}