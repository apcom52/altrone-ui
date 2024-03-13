import { StoryObj } from '@storybook/react';
import { StorybookBackgroundDecorator } from '../../../../storybook/StorybookPlayground';
import React, { useState } from 'react';
import { Icon } from '../../../typography';
import { NavigationListMenu } from '../NavigationList';
import { NavigationList } from '../index';
import { Dropdown } from '../../../containers/Dropdown';
import { Button } from '../../../form';

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
    icon: <Icon i="public" />
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

export const SimpleNavigationList: StoryObj<typeof NavigationList> = {
  name: 'Simple Navigation List',
  render: ({ ...args }) => {
    const [current, setCurrent] = useState('');

    return (
      <div style={{ width: 300 }}>
        <NavigationList
          {...args}
          selected={current}
          onChange={(value) => setCurrent(String(value))}>
          <NavigationList.Header
            title="Settings"
            action={
              <Dropdown
                content={
                  <Dropdown.Menu>
                    <Dropdown.Action label="Network settings" />
                    <Dropdown.Action label="Notification settings" />
                    <Dropdown.Action label="Security settings" />
                  </Dropdown.Menu>
                }>
                <Button isIcon>
                  <Icon i="add" />
                </Button>
              </Dropdown>
            }
          />
          <NavigationList.Menu>
            <NavigationList.Link label="Wi-Fi" active icon={<Icon i="wifi" />} />
            <NavigationList.Link
              label="Bluetooth"
              href="https://noob-club.ru"
              icon={<Icon i="bluetooth" />}
            />
            <NavigationList.Link label="Network" disabled icon={<Icon i="public" />} />
            <NavigationList.Link label="VPN" icon={<Icon i="vpn_lock" />} />
            <NavigationList.Link label="Notifications" icon={<Icon i="notifications" />} />
            <NavigationList.Link label="Sound" icon={<Icon i="volume_up" />} />
            <NavigationList.Link label="Focus" icon={<Icon i="nightlight_round" />} />
            <NavigationList.Link label="Screen Time" icon={<Icon i="hourglass_bottom" />} />
            <NavigationList.Link label="General" icon={<Icon i="settings" />} />
            <NavigationList.Link label="Appearance" icon={<Icon i="brightness_6" />} />
            <NavigationList.Link label="Accessibility" icon={<Icon i="accessibility" />} />
            <NavigationList.Link label="Control Centre" icon={<Icon i="tune" />} />
            <NavigationList.Link label="Siri & Spotlight" icon={<Icon i="graphic_eq" />} />
            <NavigationList.Link label="Privacy & Security" icon={<Icon i="fingerprint" />} />
          </NavigationList.Menu>
        </NavigationList>
      </div>
    );
  },
  decorators: [StorybookBackgroundDecorator]
};
