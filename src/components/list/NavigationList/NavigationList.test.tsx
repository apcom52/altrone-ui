import {fireEvent, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom'
import {Icon} from "../../icons";
import {NavigationList} from "./index";
import React from "react";

const list = [{
  label: 'My notes',
  value: 'my',
  icon: <Icon i='collections_bookmark' />,
  submenu: [{
    label: 'Recent notes',
    value: 'recent',
    icon: <Icon i='collections_bookmark' />,
  }, {
    label: 'All notes',
    value: 'all'
  }]
}, {
  label: 'Shared notes',
  value: 'shared',
  icon: <Icon i='folder_shared' />
}, {
  label: 'Favorites',
  value: 'favorites',
  icon: <Icon i='favorite_border' />
},  {
  label: 'Settings',
  value: 'settings',
  icon: <Icon i='settings' />,
  submenu: [
    {
      label: 'Appearance',
      value: 'appearance',
      icon: <Icon i='palette' />,
      submenu: []
    }, {
      label: 'Privacy',
      value: 'privacy',
      icon: <Icon i='lock' />,
      submenu: []
    }, {
      label: 'Settings for username@mail.com',
      value: 'account',
      icon: <Icon i='person' />,
      submenu: [{
        label: 'Account information',
        value: 'info'
      }, {
        label: 'Sync',
        value: 'sync'
      }, {
        label: 'Credentials',
        value: 'cred'
      }, {
        label: 'Log out',
        value: 'logout'
      }]
    }, {
      label: 'Accessibility',
      value: 'preferences',
      icon: <Icon i='settings_accessibility' />,
      submenu: []
    }, {
      label: 'About application',
      value: 'about',
      icon: <Icon i='collections_bookmark' />,
      submenu: []
    },
  ]
}]

describe('List.NavigationList', () => {
  test('should renders correctly', () => {
    const { container, rerender } = render(<NavigationList list={list} selected='sync' onChange={() => null} />)

    expect(container.querySelectorAll('.alt-navigation-list-item')).toHaveLength(4)
    expect(container.querySelectorAll('.alt-navigation-list-sub-item')).toHaveLength(5)
    expect(container.querySelectorAll('.alt-navigation-list-sub-sub-item')).toHaveLength(4)
  })

  test('should selected prop works correctly', async () => {
    let page = 'shared'
    const handleChange = _page => {
      page = _page
    }

    render(<NavigationList list={list} selected={page} onChange={handleChange} />)

    const notes = screen.getByText('Favorites')
    fireEvent.click(notes)

    expect(page).toBe('favorites')
  })
})