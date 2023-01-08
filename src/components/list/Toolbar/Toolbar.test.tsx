import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Toolbar, ToolbarGroup } from './index';
import ToolbarAction from './ToolbarAction';
import { Icon } from '../../icons';

const menu = [
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
];

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe('List.Toolbar', () => {
  beforeEach(() => {
    window.ResizeObserver = ResizeObserver;
  });

  test('should renders correctly', () => {
    render(
      <Toolbar>
        <ToolbarGroup>
          <ToolbarAction icon={<Icon i="back" />} label="Action 1" onClick={() => null} />
          <ToolbarAction icon={<Icon i="back" />} label="Action 2" onClick={() => null} />
          <ToolbarAction icon={<Icon i="back" />} label="Action 3" onClick={() => null} />
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarAction icon={<Icon i="back" />} label="Action 4" onClick={() => null} />
          <ToolbarAction icon={<Icon i="back" />} label="Action 5" onClick={() => null} />
        </ToolbarGroup>
      </Toolbar>
    );

    expect(screen.queryAllByTestId('alt-test-toolbarGroup')).toHaveLength(2);
    expect(screen.queryAllByTestId('alt-test-toolbarAction')).toHaveLength(5);
  });

  test('should renders menu correctly', () => {
    render(
      <Toolbar menu={menu}>
        <ToolbarAction icon={<Icon i="back" />} label="Action 1" onClick={() => null} />
      </Toolbar>
    );

    expect(screen.getByTestId('alt-test-toolbarMenu')).toBeInTheDocument();
    expect(screen.queryAllByTestId('alt-test-toolbarMenu-item')).toHaveLength(menu.length);
  });
});
