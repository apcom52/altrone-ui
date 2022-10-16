import {withAltrone} from "../../hocs";
import {Chips} from "./Chips";
import {Direction, Theme} from "../../types";
import {useCallback, useEffect, useState} from "react";

const Template = ({component, dark, values, ...args}) => {
  const [_value, setValue] = useState(values)

  useEffect(() => {
    setValue(values)
  }, [values])

  const onChange = useCallback((value) => {
    setValue(value)
  }, [])

  return withAltrone(component, {
    theme: dark ? Theme.dark : Theme.light
  })({
    ...args,
    values: _value,
    onChange,
  })
}

export const ChipsExample = Template.bind({})
ChipsExample.args = {
  component: Chips,
  options: [{
    label: 'North America',
    value: 0
  }, {
    label: 'South America',
    value: 1
  }, {
    label: 'Europe',
    value: 2
  }, {
    label: 'Asia',
    value: 3
  }, {
    label: 'Africa',
    value: 4
  }, {
    label: 'Australia',
    value: 5
  }],
  values: [1, 3],
  dark: false,
}
ChipsExample.argTypes = {
  direction: {
    control: 'select',
    options: [Direction.horizontal, Direction.vertical]
  }
}

export default {
  component: ChipsExample,
  title: 'Lists',
}