import React, { createRef } from 'react';
import { expect, test, describe, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Switcher } from '../src/components';

describe('Switcher', () => {
  test('renders as an accessible switch', () => {
    render(
      <Switcher checked={false} onChange={vi.fn()}>
        Dark mode
      </Switcher>,
    );

    const input = screen.getByRole('switch', { name: 'Dark mode' });
    expect(input.tagName).toBe('INPUT');
    expect(input).not.toBeChecked();
  });

  test('clicking the label toggles and reports the next state', () => {
    const onChange = vi.fn();
    render(
      <Switcher checked={false} onChange={onChange}>
        Notifications
      </Switcher>,
    );

    fireEvent.click(screen.getByText('Notifications'));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0]).toBe(true);
  });

  test('disabled is applied to the native input', () => {
    render(
      <Switcher checked disabled onChange={vi.fn()}>
        Auto-save
      </Switcher>,
    );

    expect(screen.getByRole('switch', { name: 'Auto-save' })).toBeDisabled();
  });

  test('a bare switch takes its name from aria-label', () => {
    render(<Switcher aria-label="Compact layout" onChange={vi.fn()} />);

    expect(
      screen.getByRole('switch', { name: 'Compact layout' }),
    ).toBeInTheDocument();
  });

  test('forwards ref to the root <label>', () => {
    const ref = createRef<HTMLLabelElement>();
    render(<Switcher ref={ref} onChange={vi.fn()}>Label</Switcher>);

    expect(ref.current).toBeInstanceOf(HTMLLabelElement);
  });

  test('className and style apply to the root <label>', () => {
    render(
      <Switcher
        data-testid="switcher"
        className="cls"
        style={{ color: 'rgb(0, 0, 255)' }}
        onChange={vi.fn()}
      />,
    );

    const label = screen.getByTestId('switcher');
    expect(label.tagName).toBe('LABEL');
    expect(label).toHaveClass('cls');
    expect(label).toHaveStyle('color: rgb(0, 0, 255)');
  });
});
