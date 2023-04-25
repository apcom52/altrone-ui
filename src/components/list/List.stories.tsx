import { Altrone } from '../../hocs';
import { Direction, Size, Surface, Theme } from '../../types';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Chips,
  NavigationList,
  TabList,
  TabListVariant,
  Toolbar,
  ToolbarGroup,
  ToolbarSeparator
} from './index';
import { Align } from '../../types/Align';
import { Icon } from '../icons';
import ToolbarAction from './Toolbar/ToolbarAction';
import { Heading } from '../typography';
import { Button } from '../button';
import { ModalExample } from '../containers/Containers.oldStories';

const Template = ({ Component, dark, values, value, ...args }) => {
  const [_value, setValue] = useState(values);

  useEffect(() => {
    setValue(values);
  }, [values]);

  const onChange = useCallback((value) => {
    setValue(value);
  }, []);

  return (
    <Altrone
      theme={dark ? Theme.dark : Theme.light}
      style={{
        height: 250,
        backgroundImage:
          'url(https://4kwallpapers.com/images/wallpapers/windows-11-flow-dark-mode-dark-background-pink-3840x2160-5747.jpg)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      }}>
      <Component {...args} values={_value} value={_value} onChange={onChange} />
    </Altrone>
  );
};

const TabsTemplate = ({ Component, dark, selected, tabs = [], ...args }) => {
  const [_value, setValue] = useState(selected);
  const [tabsCounter, setTabsCounter] = useState(5);
  const [_tabs, setTabs] = useState(tabs);

  useEffect(() => {
    setValue(selected);
  }, [selected]);

  useEffect(() => {
    setTabs(tabs);
  }, [tabs]);

  const onChange = useCallback((value) => {
    setValue(value);
  }, []);

  const onAddTab = () => {
    setTabs((old) => [
      ...old,
      {
        label: 'Tab ' + tabsCounter,
        value: tabsCounter
      }
    ]);

    setTabsCounter((old) => old + 1);
  };

  const onCloseTab = (value) => {
    setTabs((tabs) => tabs.filter((tab) => tab.value !== value));
  };

  return (
    <Altrone theme={dark ? Theme.dark : Theme.light}>
      <Component
        {...args}
        selected={_value}
        tabs={_tabs}
        onChange={onChange}
        onAddTab={onAddTab}
        onCloseTab={onCloseTab}
      />
    </Altrone>
  );
};

const NavigationListTemplate = ({ dark, selected, ...args }) => {
  const [_value, setValue] = useState(selected);

  useEffect(() => {
    setValue(selected);
  }, [selected]);

  const onChange = useCallback((value) => {
    setValue(value);
  }, []);

  return (
    <Altrone
      theme={dark ? Theme.dark : Theme.light}
      style={{
        display: 'grid',
        minHeight: '900px',
        gridTemplateColumns: '250px 1fr',
        backgroundImage:
          'url(https://img.freepik.com/free-photo/beautiful-view-greenery-bridge-forest-perfect-background_181624-17827.jpg?w=2000)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center'
      }}>
      <NavigationList selected={_value} onChange={onChange} {...args} />
    </Altrone>
  );
};

export const ChipsExample = Template.bind({});
ChipsExample.args = {
  Component: Chips,
  options: [
    {
      label: 'North America',
      value: 0
    },
    {
      label: 'South America',
      value: 1
    },
    {
      label: 'Europe',
      value: 2
    },
    {
      label: 'Asia',
      value: 3
    },
    {
      label: 'Africa',
      value: 4
    },
    {
      label: 'Australia',
      value: 5
    }
  ],
  values: [1, 3],
  dark: false
};
ChipsExample.argTypes = {
  direction: {
    control: 'select',
    options: [Direction.horizontal, Direction.vertical]
  },
  size: {
    control: 'select',
    options: [Size.small, Size.medium, Size.large]
  }
};

export const TabsExample = TabsTemplate.bind({});
TabsExample.args = {
  Component: TabList,
  selected: 0,
  tabs: [
    {
      label: 'Dashboard',
      value: 0,
      indicator: {
        position: 'baseline',
        value: 15
      }
    },
    {
      label: 'Accessories',
      value: 1,
      indicator: {
        position: 'baseline'
      }
    },
    {
      label: 'My home',
      value: 2,
      indicator: {
        position: 'corner',
        value: 9
      }
    },
    {
      label: 'Help and support',
      value: 3,
      indicator: {
        position: 'corner'
      }
    }
  ],
  fluid: false,
  dark: false
};
TabsExample.argTypes = {
  variant: {
    control: 'select',
    options: [TabListVariant.default, TabListVariant.border, TabListVariant.solid]
  },
  align: {
    control: 'select',
    options: [Align.start, Align.center, Align.end]
  }
};

export const ToolbarExample = Template.bind({});
ToolbarExample.args = {
  Component: Toolbar,
  children: (
    <>
      <ToolbarGroup>
        <ToolbarAction
          icon={<Icon i="local_grocery_store" />}
          label="Music store"
          indicator={{ position: 'baseline', value: 15 }}
        />
        <ToolbarAction
          icon={<Icon i="queue_music" />}
          label="Collection"
          contextMenu={[
            {
              title: 'My collection',
              onClick: () => null
            },
            {
              title: 'Shared collection',
              onClick: () => null
            }
          ]}
          indicator={{ position: 'baseline' }}
        />
        <ToolbarAction
          icon={<Icon i="favorite" />}
          label="Favorite"
          indicator={{ position: 'corner' }}
        />
      </ToolbarGroup>
      <ToolbarSeparator />
      <ToolbarGroup collapsible>
        <ToolbarAction
          icon={<Icon i="interpreter_mode" />}
          label="Artists"
          indicator={{ position: 'corner', value: 22 }}
        />
        <ToolbarAction icon={<Icon i="library_music" />} label="Albums" />
        <ToolbarAction icon={<Icon i="lyrics" />} label="Songs" />
        <ToolbarAction icon={<Icon i="album" />} label="Playlists" />
      </ToolbarGroup>

      <ToolbarGroup collapsible>
        <ToolbarAction icon={<Icon i="skip_previous" />} label="Previous song" />
        <ToolbarAction icon={<Icon i="stop" />} label="Stop" danger />
        <ToolbarAction icon={<Icon i="play_arrow" />} label="Play" />
        <ToolbarAction icon={<Icon i="pause" />} label="Pause" />
        <ToolbarAction
          icon={<Icon i="skip_next" />}
          label="Next song"
          contextMenu={[
            {
              title: 'My collection',
              onClick: () => null
            },
            {
              title: 'Shared collection',
              onClick: () => null
            }
          ]}
        />
      </ToolbarGroup>

      <ToolbarGroup>
        <ToolbarAction icon={<Icon i="replay" />} label="Repeat" disabled />
        <ToolbarAction icon={<Icon i="shuffle" />} label="Shuffle" active />
      </ToolbarGroup>

      <ToolbarGroup fluid align={Align.end}>
        <ToolbarAction icon={<Icon i="play_circle" />} label="Play" />
        <ToolbarAction
          icon={<Icon i="ios_share" />}
          label="Share"
          content={({ closePopup }) => (
            <>
              <Heading>Share to...</Heading>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus at autem
                consequatur debitis ea est, et eum fugit iusto minus natus numquam odio, porro
                provident quisquam quod soluta velit voluptatum?
              </p>
              <Button onClick={closePopup}>OK</Button>
            </>
          )}
        />
        <ToolbarAction icon={<Icon i="search" />} label="Search" />
      </ToolbarGroup>
    </>
  ),
  dark: false,
  menu: [
    {
      label: 'File',
      submenu: [
        {
          title: 'New document',
          onClick: () => null
        },
        {
          title: 'Open',
          onClick: () => null
        },
        {
          title: 'Open recent',
          children: [
            {
              title: 'File 1',
              onClick: () => null
            },
            {
              title: 'File 2',
              onClick: () => null
            },
            {
              title: 'File 3',
              onClick: () => null
            },
            {
              title: 'File 4',
              onClick: () => null
            }
          ]
        },
        {
          title: 'Rename document',
          onClick: () => null
        },
        {
          title: 'Close application',
          onClick: () => null
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        {
          title: 'Cut',
          onClick: () => null
        },
        {
          title: 'Copy',
          onClick: () => null
        },
        {
          title: 'Duplicate',
          onClick: () => null
        },
        {
          title: 'Paste',
          onClick: () => null
        }
      ]
    },
    {
      label: 'Format',
      submenu: [
        {
          title: 'Reset to defaults',
          onClick: () => null
        },
        {
          title: 'Text',
          onClick: () => null
        },
        {
          title: 'Images',
          onClick: () => null
        },
        {
          title: 'Advanced formatting',
          onClick: () => null
        }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          title: 'Search',
          onClick: () => null
        },
        {
          title: 'Help',
          onClick: () => null
        },
        {
          title: 'About application',
          onClick: () => null
        }
      ]
    }
  ],
  floated: false,
  offset: {
    x: 100,
    y: 8
  },
  width: 'calc(100% - 100px - 16px)'
};
ToolbarExample.argTypes = {
  surface: {
    control: 'select',
    options: [
      Surface.none,
      Surface.transparent,
      Surface.glass,
      Surface.solid,
      Surface.paper,
      Surface.metal
    ]
  }
};

export const NavigationListExample = NavigationListTemplate.bind({});
NavigationListExample.args = {
  title: 'Notes',
  selected: 'appearance',
  dark: false,
  action: {
    icon: <Icon i="add" />,
    title: 'Create',
    onClick: () => alert('click'),
    contextMenu: [
      {
        icon: <Icon i="description" />,
        title: 'Add document',
        onClick: () => null
      },
      {
        icon: <Icon i="folder_open" />,
        title: 'Add folder',
        onClick: () => null
      }
    ]
  },
  list: [
    {
      label: 'My notes',
      value: 'my',
      icon: <Icon i="collections_bookmark" />,
      indicator: {
        position: 'baseline',
        value: 15
      },
      submenu: [
        {
          label: 'Recent notes',
          value: 'recent',
          icon: <Icon i="collections_bookmark" />,
          indicator: {
            position: 'baseline',
            value: 15
          }
        },
        {
          label: 'All notes',
          value: 'all',
          indicator: {
            position: 'baseline'
          }
        }
      ]
    },
    {
      label: 'Shared notes',
      value: 'shared',
      icon: <Icon i="folder_shared" />,
      indicator: {
        position: 'baseline'
      }
    },
    {
      label: 'Favorites',
      value: 'favorites',
      icon: <Icon i="favorite_border" />,
      indicator: {
        position: 'corner'
      }
    },
    '-',
    {
      label: 'Settings',
      value: 'settings',
      icon: <Icon i="settings" />,
      indicator: {
        position: 'corner',
        value: 15
      },
      submenu: [
        {
          label: 'Appearance',
          value: 'appearance',
          icon: <Icon i="palette" />,
          submenu: []
        },
        {
          label: 'Privacy',
          value: 'privacy',
          icon: <Icon i="lock" />,
          submenu: [],
          indicator: {
            position: 'corner'
          }
        },
        {
          label: 'Settings for username@mail.com',
          value: 'account',
          icon: <Icon i="person" />,
          indicator: {
            position: 'corner',
            value: 15
          },
          submenu: [
            {
              label: 'Account information',
              value: 'info'
            },
            {
              label: 'Sync',
              value: 'sync',
              indicator: {
                type: 'baseline',
                value: 5
              }
            },
            {
              label: 'Credentials',
              value: 'cred'
            },
            {
              label: 'Log out',
              value: 'logout'
            }
          ]
        },
        {
          label: 'Accessibility',
          value: 'preferences',
          icon: <Icon i="settings_accessibility" />,
          submenu: []
        },
        {
          label: 'About application',
          value: 'about',
          icon: <Icon i="collections_bookmark" />,
          submenu: []
        }
      ]
    }
  ]
};
NavigationListExample.argTypes = {
  surface: {
    control: 'select',
    options: [
      Surface.none,
      Surface.transparent,
      Surface.glass,
      Surface.solid,
      Surface.paper,
      Surface.metal
    ]
  }
};

export default {
  component: ChipsExample,
  title: 'Lists'
};
