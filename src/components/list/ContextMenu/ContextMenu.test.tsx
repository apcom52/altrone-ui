import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ContextMenuType as ContextMenuType } from '../../../types';
import { ContextMenu } from './index';

const CONTEXT_MENU_DATA: ContextMenuType = [
  {
    title: 'Normal action',
    onClick: () => null
  },
  {
    title: 'Danger action',
    onClick: () => null,
    danger: true
  },
  {
    title: 'Item with hint',
    onClick: () => null,
    disabled: true,
    hint: 'Ctrl+N',
    selected: true
  },
  {
    title: 'Parent group',
    children: [
      {
        title: 'Children action',
        onClick: () => null
      }
    ]
  }
];

describe('List.ContextMenu', () => {
  test('should renders correctly', () => {
    const { container } = render(<ContextMenu menu={CONTEXT_MENU_DATA} onClose={() => null} />);
    const menu = container.querySelector('.alt-context-menu-list');
    expect(menu).toBeInTheDocument();
    expect(menu?.childNodes.length).toBe(4);
  });

  test('should danger items renders correctly', () => {
    render(<ContextMenu menu={CONTEXT_MENU_DATA} onClose={() => null} />);
    const dangerAction = screen.getByText('Danger action');
    expect(dangerAction.parentElement).toHaveClass('alt-context-menu-item--danger');
  });

  test('should disabled items renders correctly', () => {
    render(<ContextMenu menu={CONTEXT_MENU_DATA} onClose={() => null} />);
    const dangerAction = screen.getByText('Item with hint');
    expect(dangerAction.parentElement).toHaveAttribute('disabled', '');
  });

  test('should render hint', () => {
    render(<ContextMenu menu={CONTEXT_MENU_DATA} onClose={() => null} />);
    const hint = screen.getByText('Ctrl+N');
    expect(hint).toBeInTheDocument();
  });

  test('should fluid works correctly', () => {
    render(<ContextMenu menu={CONTEXT_MENU_DATA} onClose={() => null} fluid />);
    expect(screen.getByTestId('alt-test-contextMenu')).toHaveClass('alt-context-menu-list--fluid');
  });

  test('should selected ContextMenu item renders correctly', () => {
    render(<ContextMenu menu={CONTEXT_MENU_DATA} onClose={() => null} />);
    expect(screen.getByText('Item with hint').parentElement).toHaveClass(
      'alt-context-menu-item--selected'
    );
  });

  test('should maxHeight prop works correctly', () => {
    render(<ContextMenu menu={CONTEXT_MENU_DATA} onClose={() => null} maxHeight={200} />);
    expect(screen.getByTestId('alt-test-contextMenu')).toHaveStyle('max-height: 200px');
  });
});
