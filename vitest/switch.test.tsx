import React, { createRef } from 'react';
import { expect, test, describe, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Switch } from '../src/components';

describe('Switch', () => {
  test('renders as an accessible switch', () => {
    render(
      <Switch checked={false} onChange={vi.fn()}>
        Dark mode
      </Switch>,
    );

    const input = screen.getByRole('switch', { name: 'Dark mode' });
    expect(input.tagName).toBe('INPUT');
    expect(input).not.toBeChecked();
  });

  test('clicking the label toggles and reports the next state', () => {
    const onChange = vi.fn();
    render(
      <Switch checked={false} onChange={onChange}>
        Notifications
      </Switch>,
    );

    fireEvent.click(screen.getByText('Notifications'));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0]).toBe(true);
  });

  test('disabled is applied to the native input', () => {
    render(
      <Switch checked disabled onChange={vi.fn()}>
        Auto-save
      </Switch>,
    );

    expect(screen.getByRole('switch', { name: 'Auto-save' })).toBeDisabled();
  });

  test('a bare switch takes its name from aria-label', () => {
    render(<Switch aria-label="Compact layout" onChange={vi.fn()} />);

    expect(
      screen.getByRole('switch', { name: 'Compact layout' }),
    ).toBeInTheDocument();
  });

  test('forwards ref to the root <label>', () => {
    const ref = createRef<HTMLLabelElement>();
    render(<Switch ref={ref} onChange={vi.fn()}>Label</Switch>);

    expect(ref.current).toBeInstanceOf(HTMLLabelElement);
  });

  test('className and style apply to the root <label>', () => {
    render(
      <Switch
        data-testid="switch"
        className="cls"
        style={{ color: 'rgb(0, 0, 255)' }}
        onChange={vi.fn()}
      />,
    );

    const label = screen.getByTestId('switch');
    expect(label.tagName).toBe('LABEL');
    expect(label).toHaveClass('cls');
    expect(label).toHaveStyle('color: rgb(0, 0, 255)');
  });
});
