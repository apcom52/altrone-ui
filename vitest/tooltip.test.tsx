import { createRef } from 'react';
import { expect, test, describe, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Form, Tooltip } from '../src/components';
import s from '../src/components/tooltip/tooltip.module.scss';

describe('Tooltip', () => {
  test('opens on focus and shows content', () => {
    render(
      <Tooltip content="Saves your changes">
        <button>Save</button>
      </Tooltip>,
    );

    expect(screen.queryByText('Saves your changes')).not.toBeInTheDocument();

    fireEvent.focus(screen.getByRole('button', { name: 'Save' }));

    expect(screen.getByText('Saves your changes')).toBeInTheDocument();
  });

  test('renders a HelpCircle button when no children are given', () => {
    render(<Tooltip content="Your secret API key" />);

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test.each([
    ['mini', s.Mini],
    ['s', s.Small],
    ['m', undefined],
    ['l', s.Large],
    ['xl', s.XLarge],
  ] as const)('applies the %s size to the built-in trigger', (size, sizeClass) => {
    render(<Tooltip content="Field help" triggerSize={size} />);

    const button = screen.getByRole('button', { name: 'Field help' });
    expect(button.className).toBe([s.QuestionMark, sizeClass].filter(Boolean).join(' '));
    expect(button).not.toHaveAttribute('triggerSize');
  });

  test('keeps the default trigger markup inside a differently sized form field', () => {
    const { rerender } = render(
      <Form size="xl">
        <Form.Field label="Workspace">
          <Tooltip content="Field help" />
        </Form.Field>
      </Form>,
    );
    const button = screen.getByRole('button', { name: 'Field help' });
    const defaultMarkup = button.outerHTML;

    expect(button.className).toBe(s.QuestionMark);
    rerender(
      <Form size="xl">
        <Form.Field label="Workspace">
          <Tooltip content="Field help" triggerSize="m" />
        </Form.Field>
      </Form>,
    );

    expect(screen.getByRole('button', { name: 'Field help' }).outerHTML).toBe(defaultMarkup);
  });

  test('leaves a custom trigger intact when a built-in trigger size is set', () => {
    render(
      <Tooltip content="Field help" triggerSize="xl">
        <button className="own-trigger" style={{ width: 40 }}>Help</button>
      </Tooltip>,
    );

    const button = screen.getByRole('button', { name: 'Help' });
    expect(button.className).toBe('own-trigger');
    expect(button).toHaveStyle({ width: '40px' });
    expect(button).not.toHaveAttribute('triggerSize');
  });

  test("forwards ref to the trigger without clobbering the child's own ref", () => {
    const tooltipRef = createRef<HTMLElement>();
    const buttonRef = createRef<HTMLButtonElement>();

    render(
      <Tooltip ref={tooltipRef} content="Delete permanently">
        <button ref={buttonRef}>Delete</button>
      </Tooltip>,
    );

    expect(buttonRef.current).toBeInstanceOf(HTMLButtonElement);
    expect(tooltipRef.current).toBe(buttonRef.current);
  });

  test('className and style apply to the floating panel', () => {
    render(
      <Tooltip content="Tooltip content" className="cls" style={{ color: 'rgb(0, 0, 255)' }}>
        <button>Trigger</button>
      </Tooltip>,
    );

    fireEvent.focus(screen.getByRole('button', { name: 'Trigger' }));

    const panel = screen.getByRole('tooltip');
    expect(panel).toHaveClass('cls');
    expect(panel).toHaveStyle('color: rgb(0, 0, 255)');
  });

  test('triggerClassName/triggerStyle target the auto-generated HelpCircle button', () => {
    render(
      <Tooltip
        content="Your secret API key"
        triggerClassName="trigger-cls"
        triggerStyle={{ color: 'rgb(255, 0, 0)' }}
      />,
    );

    const button = screen.getByRole('button');
    expect(button).toHaveClass('trigger-cls');
    expect(button).toHaveStyle('color: rgb(255, 0, 0)');
  });

  test('forwards HTMLAttributes like id/data-* to the trigger element', () => {
    render(
      <Tooltip content="Tooltip content" id="save-trigger" data-testid="save-trigger">
        <button>Save</button>
      </Tooltip>,
    );

    const trigger = screen.getByRole('button', { name: 'Save' });
    expect(trigger).toHaveAttribute('id', 'save-trigger');
    expect(trigger).toHaveAttribute('data-testid', 'save-trigger');
  });

  test('title and kbd render alongside content', () => {
    render(
      <Tooltip title="Keyboard shortcut" content="Saves the file" kbd="⌘S">
        <button>Save</button>
      </Tooltip>,
    );

    fireEvent.focus(screen.getByRole('button', { name: 'Save' }));

    expect(screen.getByText('Keyboard shortcut')).toBeInTheDocument();
    expect(screen.getByText('Saves the file')).toBeInTheDocument();
    expect(screen.getByText('⌘S')).toBeInTheDocument();
  });

  test('defaultOpen renders the panel without any interaction', () => {
    render(
      <Tooltip content="Saves your changes" defaultOpen>
        <button>Save</button>
      </Tooltip>,
    );

    expect(screen.getByText('Saves your changes')).toBeInTheDocument();
  });

  test('trigger="click" does not open on focus, and opens on click', () => {
    render(
      <Tooltip content="Saves your changes" trigger="click">
        <button>Save</button>
      </Tooltip>,
    );

    fireEvent.focus(screen.getByRole('button', { name: 'Save' }));
    expect(screen.queryByText('Saves your changes')).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Save' }));
    expect(screen.getByText('Saves your changes')).toBeInTheDocument();
  });

  test('onOpenChange fires with the new state and reason on focus', () => {
    const onOpenChange = vi.fn();

    render(
      <Tooltip content="Saves your changes" onOpenChange={onOpenChange}>
        <button>Save</button>
      </Tooltip>,
    );

    fireEvent.focus(screen.getByRole('button', { name: 'Save' }));

    expect(onOpenChange).toHaveBeenCalledWith(true, expect.anything(), 'focus');
  });
});
