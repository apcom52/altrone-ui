import {withAltrone} from "../../hocs";
import {Direction, Theme} from "../../types";
import {useCallback, useEffect, useState} from "react";
import {Chips, TabList, TabListVariant} from './index'

const Template = ({component, dark, values, value, ...args}) => {
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
    value: _value,
    onChange,
  })
}

const TabsTemplate = ({component, dark, selected, tabs = [], ...args}) => {
  const [_value, setValue] = useState(selected)
  const [tabsCounter, setTabsCounter] = useState(5)
  const [_tabs, setTabs] = useState(tabs)

  useEffect(() => {
    setValue(selected)
  }, [selected])

  useEffect(() => {
    setTabs(tabs)
  }, [tabs])

  const onChange = useCallback((value) => {
    setValue(value)
  }, [])

  const onAddTab = () => {
    setTabs(old => [...old, {
      label: 'Tab ' + tabsCounter,
      value: tabsCounter
    }])

    setTabsCounter(old => old + 1)
  }

  const onCloseTab = (value) => {
    setTabs(tabs => tabs.filter(tab => tab.value !== value))
  }

  return withAltrone(component, {
    theme: dark ? Theme.dark : Theme.light
  })({
    ...args,
    selected: _value,
    tabs: _tabs,
    onChange,
    onAddTab,
    onCloseTab
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

export const TabsExample = TabsTemplate.bind({})
TabsExample.args = {
  component: TabList,
  selected: 0,
  tabs: [{
    label: 'Dashboard',
    value: 0
  }, {
    label: 'Accessories',
    value: 1
  }, {
    label: 'My home',
    value: 2
  }, {
    label: 'Help and support',
    value: 3
  }],
  fluid: false,
  dark: false,
}
TabsExample.argTypes = {
  variant: {
    control: 'select',
    options: [TabListVariant.default, TabListVariant.border, TabListVariant.solid]
  }
}

export default {
  component: ChipsExample,
  title: 'Lists',
}