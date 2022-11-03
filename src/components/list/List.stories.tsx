import {withAltrone} from "../../hocs";
import {Direction, Theme} from "../../types";
import {useCallback, useEffect, useState} from "react";
import {Chips, TabList, TabListVariant, Toolbar, ToolbarGroup, ToolbarSeparator} from './index'
import {Align} from "../../types/Align";
import {Icon} from "../icons";
import ToolbarAction from "./Toolbar/ToolbarAction";

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
    value: 2,
    disabled: true,
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
  },
  align: {
    control: 'select',
    options: [Align.start, Align.center, Align.end]
  }
}

export const ToolbarExample = Template.bind({})
ToolbarExample.args = {
  component: Toolbar,
  children: <>
    <ToolbarGroup>
      <ToolbarAction icon={<Icon i='undo' />} label='Undo command' />
      <ToolbarAction icon={<Icon i='redo' />} label='Redo' />
    </ToolbarGroup>
    <ToolbarSeparator />
    <ToolbarGroup>
      <ToolbarAction icon={<Icon i='add' />} label='Create document' />
      <ToolbarAction icon={<Icon i='folder_open' />} label='Open folder' />
      <ToolbarAction icon={<Icon i='cloud_upload' />} label='Save' />
      <ToolbarAction icon={<Icon i='expand_more' />} label='More...' />
    </ToolbarGroup>

    <ToolbarGroup fluid>
      <ToolbarAction icon={<Icon i='skip_previous' />} label='Previous song' />
      <ToolbarAction icon={<Icon i='stop' />} label='Stop' />
      <ToolbarAction icon={<Icon i='play_arrow' />} label='Play' />
      <ToolbarAction icon={<Icon i='pause' />} label='Pause' />
      <ToolbarAction icon={<Icon i='skip_next' />} label='Next song' />
    </ToolbarGroup>

    <ToolbarGroup>
      <ToolbarAction icon={<Icon i='replay' />} label='Repeat' />
      <ToolbarAction icon={<Icon i='shuffle' />} label='Shuffle' />
    </ToolbarGroup>

    <ToolbarGroup fluid align={Align.end}>
      <ToolbarAction icon={<Icon i='play_circle' />} label='Play' />
      <ToolbarAction icon={<Icon i='ios_share' />} label='Share' />
    </ToolbarGroup>
  </>,
  dark: false
}

export default {
  component: ChipsExample,
  title: 'Lists',
}