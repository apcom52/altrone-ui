import {render, screen} from "@testing-library/react";
import '@testing-library/jest-dom'
import {ContextMenuType as ContextMenuType} from "../../../types";
import {ContextMenu} from "./index";

const CONTEXT_MENU_DATA: ContextMenuType = [{
  title: 'Normal action',
  onClick: () => null,
}, {
  title: 'Danger action',
  onClick: () => null,
  danger: true,
}, {
  title: 'Item with hint',
  onClick: () => null,
  disabled: true,
  hint: 'Ctrl+N'
}, {
  title: 'Parent group',
  children: [
    {
      title: 'Children action',
      onClick: () => null
    }
  ]
}]

describe('List.ContextMenu', () => {
  test('should renders correctly', () => {
    const { container } = render(<ContextMenu menu={CONTEXT_MENU_DATA} />)
    const menu = container.querySelector('.alt-context-menu-list')
    expect(menu).toBeInTheDocument()
    expect(menu.childNodes.length).toBe(4)
  })

  test('should danger items renders correctly', () => {
    render(<ContextMenu menu={CONTEXT_MENU_DATA} />)
    const dangerAction = screen.getByText('Danger action')
    expect(dangerAction.parentElement).toHaveClass('alt-context-menu-item--danger')
  })

  test('should disabled items renders correctly', () => {
    render(<ContextMenu menu={CONTEXT_MENU_DATA} />)
    const dangerAction = screen.getByText('Item with hint')
    expect(dangerAction.parentElement).toHaveAttribute('disabled', '')
  })

  test('should render hint', () => {
    render(<ContextMenu menu={CONTEXT_MENU_DATA} />)
    const hint = screen.getByText('Ctrl+N')
    expect(hint).toBeInTheDocument()
  })
})