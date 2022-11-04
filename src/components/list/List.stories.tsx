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
    theme: dark ? Theme.dark : Theme.light,
    style: {
      height: 250,
      backgroundImage: 'url(https://4kwallpapers.com/images/wallpapers/windows-11-flow-dark-mode-dark-background-pink-3840x2160-5747.jpg)',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center'
    }
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
      <ToolbarAction icon={<Icon i='local_grocery_store' />} label='Music store' />
      <ToolbarAction icon={<Icon i='queue_music' />} label='Collection' />
      <ToolbarAction icon={<Icon i='favorite' />} label='Favorite' />
    </ToolbarGroup>
    <ToolbarSeparator />
    <ToolbarGroup collapsible>
      <ToolbarAction icon={<Icon i='interpreter_mode' />} label='Artists' />
      <ToolbarAction icon={<Icon i='library_music' />} label='Albums' />
      <ToolbarAction icon={<Icon i='lyrics' />} label='Songs' />
      <ToolbarAction icon={<Icon i='album' />} label='Playlists' />
    </ToolbarGroup>

    <ToolbarGroup collapsible>
      <ToolbarAction icon={<Icon i='skip_previous' />} label='Previous song' />
      <ToolbarAction icon={<Icon i='stop' />} label='Stop' danger />
      <ToolbarAction icon={<Icon i='play_arrow' />} label='Play' />
      <ToolbarAction icon={<Icon i='pause' />} label='Pause' />
      <ToolbarAction icon={<Icon i='skip_next' />} label='Next song' />
    </ToolbarGroup>

    <ToolbarGroup>
      <ToolbarAction icon={<Icon i='replay' />} label='Repeat' disabled />
      <ToolbarAction icon={<Icon i='shuffle' />} label='Shuffle' active />
    </ToolbarGroup>

    <ToolbarGroup fluid align={Align.end}>
      <ToolbarAction icon={<Icon i='play_circle' />} label='Play' />
      <ToolbarAction icon={<Icon i='ios_share' />} label='Share' />
      <ToolbarAction icon={<Icon i='search' />} label='Search' />
    </ToolbarGroup>
  </>,
  dark: false,
  menu: [{
    label: 'File',
    submenu: [{
      title: 'New document',
      onClick: () => null,
    }, {
      title: 'Open',
      onClick: () => null,
    }, {
      title: 'Open recent',
      children: [{
        title: 'File 1',
        onClick: () => null,
      }, {
        title: 'File 2',
        onClick: () => null,
      }, {
        title: 'File 3',
        onClick: () => null,
      }, {
        title: 'File 4',
        onClick: () => null,
      }]
    }, {
      title: 'Rename document',
      onClick: () => null,
    }, {
      title: 'Close application',
      onClick: () => null,
    }]
  }, {
    label: 'Edit',
    submenu: [{
      title: 'Cut',
      onClick: () => null,
    }, {
      title: 'Copy',
      onClick: () => null,
    }, {
      title: 'Duplicate',
      onClick: () => null,
    }, {
      title: 'Paste',
      onClick: () => null,
    }]
  }, {
    label: 'Format',
    submenu: [{
      title: 'Reset to defaults',
      onClick: () => null,
    }, {
      title: 'Text',
      onClick: () => null,
    }, {
      title: 'Images',
      onClick: () => null,
    }, {
      title: 'Advanced formatting',
      onClick: () => null,
    }]
  }, {
    label: 'Help',
    submenu: [{
      title: 'Search',
      onClick: () => null,
    }, {
      title: 'Help',
      onClick: () => null,
    }, {
      title: 'About application',
      onClick: () => null,
    }]
  }],
  floated: false,
  offset: {
    x: 100,
    y: 8
  },
  width: 'calc(100% - 100px - 16px)'
}

export default {
  component: ChipsExample,
  title: 'Lists',
}