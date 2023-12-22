import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Toolbar, ToolbarGroup } from './index';
import { ToolbarAction } from './ToolbarAction';
import { Icon } from '../../typography';

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
  observe() {
    return null;
  }
  unobserve() {
    return null;
  }
  disconnect() {
    return null;
  }
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

  test('should context-menu toolbarActions works correctly', async () => {
    const contextMenuAction = jest.fn();

    const { rerender } = render(
      <Toolbar menu={menu}>
        <ToolbarAction
          icon={<Icon i="back" />}
          label="Context Menu Action"
          contextMenu={[
            {
              title: 'Test context action',
              onClick: contextMenuAction
            }
          ]}
        />
      </Toolbar>
    );

    await waitFor(() => fireEvent.click(screen.getByText('Context Menu Action')));

    rerender(
      <Toolbar menu={menu}>
        <ToolbarAction
          icon={<Icon i="back" />}
          label="Context Menu Action"
          contextMenu={[
            {
              title: 'Test context action',
              onClick: contextMenuAction
            }
          ]}
        />
      </Toolbar>
    );

    const contextMenuItem = await screen.findByText('Test context action');
    await waitFor(() => fireEvent.click(contextMenuItem));

    expect(contextMenuAction).toBeCalled();
  });

  test('should popup toolbarActions works correctly', async () => {
    const { rerender } = render(
      <Toolbar menu={menu}>
        <ToolbarAction
          icon={<Icon i="back" />}
          label="Popup Action"
          content={() => <>test popup</>}
        />
      </Toolbar>
    );

    const popupAction = screen.getByText('Popup Action');
    await waitFor(() => fireEvent.click(popupAction));

    rerender(
      <Toolbar menu={menu}>
        <ToolbarAction
          icon={<Icon i="back" />}
          label="Popup Action"
          content={() => <>test popup</>}
        />
      </Toolbar>
    );

    const popupContent = await screen.findByText('test popup');
    expect(popupContent).toBeInTheDocument();
  });

  test('has to hide labels', () => {
    render(
      <Toolbar>
        <ToolbarAction icon={<Icon i="back" />} label="Test" hideLabel onClick={jest.fn()} />
      </Toolbar>
    );

    expect(screen.queryByText('Test')).not.toBeInTheDocument();
    expect(screen.queryByTitle('Test')).toBeInTheDocument();
  });

  test('has to show custom content', () => {
    render(
      <Toolbar>
        <ToolbarAction icon={<Icon i="back" />} label="Test" onClick={jest.fn()}>
          Content
        </ToolbarAction>
      </Toolbar>
    );

    expect(screen.queryByText('Content')).toBeInTheDocument();
  });
});
