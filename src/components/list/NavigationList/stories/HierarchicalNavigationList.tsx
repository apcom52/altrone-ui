import { StoryObj } from '@storybook/react';
import { StorybookBackgroundDecorator } from '../../../../storybook/StorybookPlayground';
import React, { useState } from 'react';
import { Icon } from '../../../icons';
import { NavigationListMenu } from '../NavigationList';
import { NavigationList } from '../index';

export const MENU: NavigationListMenu = [
  {
    label: 'Wi-Fi',
    value: 'wifi',
    icon: <Icon i="wifi" />
  },
  {
    label: 'Bluetooth',
    value: 'bluetooth',
    icon: <Icon i="bluetooth" />
  },
  {
    label: 'Network',
    value: 'network',
    icon: <Icon i="public" />,
    submenu: [
      {
        label: 'Network settings',
        value: 'network_settings',
        icon: <Icon i="public" />,
        submenu: [
          {
            label: 'Wireless connection',
            value: 'wireless'
          },
          {
            label: 'Ethernet',
            value: 'ethernet'
          }
        ]
      },
      {
        label: 'Firewall',
        value: 'firewall',
        icon: <Icon i="public" />
      }
    ]
  },
  {
    label: 'VPN',
    value: 'vpn',
    icon: <Icon i="vpn_lock" />
  },
  '-',
  {
    label: 'Notifications',
    value: 'notifications',
    icon: <Icon i="notifications" />
  },
  {
    label: 'Sound',
    value: 'sound',
    icon: <Icon i="volume_up" />
  },
  {
    label: 'Focus',
    value: 'focus',
    icon: <Icon i="nightlight_round" />
  },
  {
    label: 'Screen Time',
    value: 'screenTime',
    icon: <Icon i="hourglass_bottom" />
  },
  '-',
  {
    label: 'General',
    value: 'general',
    icon: <Icon i="settings" />
  },
  {
    label: 'Appearance',
    value: 'appearance',
    icon: <Icon i="brightness_6" />
  },
  {
    label: 'Accessibility',
    value: 'a18y',
    icon: <Icon i="accessibility" />
  },
  {
    label: 'Control Centre',
    value: 'cc',
    icon: <Icon i="tune" />
  },
  {
    label: 'Siri & Spotlight',
    value: 'siri',
    icon: <Icon i="graphic_eq" />
  },
  {
    label: 'Privacy & Security',
    value: 'privacy',
    icon: <Icon i="fingerprint" />
  }
];

const ACTION = {
  icon: <Icon i="ads_click" />,
  onClick: () => alert('Navigation List action')
};

export const HierarchicalNavigationList: StoryObj<typeof NavigationList> = {
  name: 'Simple Navigation List',
  render: ({ ...args }) => {
    const [current, setCurrent] = useState('');

    return (
      <div style={{ width: 300 }}>
        <NavigationList
          {...args}
          list={MENU}
          selected={current}
          onChange={(value) => setCurrent(String(value))}
          action={ACTION}
        />
      </div>
    );
  },
  decorators: [StorybookBackgroundDecorator]
};
