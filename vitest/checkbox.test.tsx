import React, { createRef } from 'react';
import { expect, test, describe, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from '../src/components';

describe('Checkbox', () => {
  test('the real <input> stays in the accessibility tree', () => {
    render(<Checkbox checked={false} onChange={vi.fn()}>Accept</Checkbox>);

    const input = screen.getByRole('checkbox', { name: 'Accept' });
    expect(input.tagName).toBe('INPUT');
    expect(input).not.toBeChecked();
  });

  test('indeterminate is reported on the native input', () => {
    render(<Checkbox indeterminate onChange={vi.fn()}>All</Checkbox>);

    expect(screen.getByRole('checkbox', { name: 'All' })).toBePartiallyChecked();
  });

  test('clicking the label toggles and calls onChange with the next state', () => {
    const onChange = vi.fn();
    render(
      <Checkbox checked={false} onChange={onChange}>
        Subscribe
      </Checkbox>,
    );

    fireEvent.click(screen.getByText('Subscribe'));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0]).toBe(true);
  });

  test('disabled is applied to the native input', () => {
    render(
      <Checkbox checked={false} disabled onChange={vi.fn()}>
        Locked
      </Checkbox>,
    );

    expect(screen.getByRole('checkbox', { name: 'Locked' })).toBeDisabled();
  });

  test('forwards ref to the root <label>', () => {
    const ref = createRef<HTMLLabelElement>();
    render(<Checkbox ref={ref} onChange={vi.fn()}>Label</Checkbox>);

    expect(ref.current).toBeInstanceOf(HTMLLabelElement);
  });

  test('className and style apply to the root <label>', () => {
    render(
      <Checkbox
        data-testid="checkbox"
        className="cls"
        style={{ color: 'rgb(0, 0, 255)' }}
        onChange={vi.fn()}
      />,
    );

    const label = screen.getByTestId('checkbox');
    expect(label.tagName).toBe('LABEL');
    expect(label).toHaveClass('cls');
    expect(label).toHaveStyle('color: rgb(0, 0, 255)');
  });
});
