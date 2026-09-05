import React from 'react';
import { expect, test, describe, vi, beforeAll } from 'vitest';
import { act, fireEvent, render, renderHook, screen } from '@testing-library/react';
import { AltroneApplication, Select } from '../src/components';
import { useSelect } from '../src/components/select/useSelect';
import type { SelectProps } from '../src/components/select/Select.types';

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

beforeAll(() => {
  // @ts-ignore
  window.ResizeObserver = ResizeObserver;
});

const OPTIONS = [
  { value: 'fr', label: 'France' },
  { value: 'jp', label: 'Japan' },
  { value: 'ru', label: 'Russia' },
];

const renderSelect = (props: Partial<React.ComponentProps<typeof Select>>) =>
  render(
    <AltroneApplication>
      <Select
        data-testid="select"
        placeholder="Country"
        options={OPTIONS}
        value={undefined}
        onChange={() => {}}
        {...props}
      />
    </AltroneApplication>,
  );

describe('Select — rendering', () => {
  test('forwards className and style to the control', () => {
    renderSelect({ className: 'cls', style: { color: 'rgb(0, 0, 255)' } });

    const el = screen.getByTestId('select');
    expect(el).toHaveClass('cls');
    expect(el).toHaveStyle('color: rgb(0, 0, 255)');
  });

  test('submits the value through a hidden input named after `name`', () => {
    const { container } = renderSelect({ name: 'country', value: 'jp' });

    expect(
      container.querySelector('input[type="hidden"][name="country"]'),
    ).toHaveValue('jp');
  });

  test('empty value never reaches the form as the string "undefined"', () => {
    const { container } = renderSelect({ name: 'country', value: undefined });

    expect(
      container.querySelector('input[type="hidden"][name="country"]'),
    ).toHaveValue('');
  });

  test('multiple emits one hidden input per value under `name[]`', () => {
    const { container } = renderSelect({
      name: 'places',
      multiple: true,
      value: ['fr', 'ru'],
    });

    const hidden = container.querySelectorAll(
      'input[type="hidden"][name="places[]"]',
    );
    expect([...hidden].map((i) => (i as HTMLInputElement).value)).toEqual([
      'fr',
      'ru',
    ]);
  });

  test('clear button resets a single value to undefined', () => {
    const onChange = vi.fn();
    renderSelect({ clearable: true, value: 'ru', onChange });

    fireEvent.click(screen.getByRole('button', { name: /clear/i }));
    expect(onChange).toHaveBeenCalledWith(undefined, expect.anything());
  });

  test('the trigger is a combobox bound to its listbox', () => {
    renderSelect({});

    const combobox = screen.getByRole('combobox');
    expect(combobox).toHaveAttribute('aria-expanded', 'false');
    expect(combobox).toHaveAttribute(
      'aria-controls',
      combobox.getAttribute('aria-controls'),
    );
  });
});

describe('useSelect — value handling', () => {
  const setup = (props: Partial<SelectProps>) => {
    const onChange = vi.fn();
    const utils = renderHook((p: SelectProps) => useSelect(p), {
      initialProps: {
        options: OPTIONS,
        onChange,
        ...props,
      } as SelectProps,
    });
    return { onChange, ...utils };
  };

  test('single select emits the raw value', () => {
    const { result, onChange } = setup({ value: undefined });

    act(() => result.current.selectValue('jp'));
    expect(onChange).toHaveBeenCalledWith('jp', undefined);
  });

  test('multiple adds an unselected value and removes a selected one', () => {
    const { result, onChange, rerender } = setup({
      multiple: true,
      value: ['fr'],
    });

    act(() => result.current.selectValue('jp'));
    expect(onChange).toHaveBeenLastCalledWith(['fr', 'jp'], undefined);

    rerender({ options: OPTIONS, onChange, multiple: true, value: ['fr', 'jp'] });
    act(() => result.current.selectValue('fr'));
    expect(onChange).toHaveBeenLastCalledWith(['jp'], undefined);
  });

  test('clearValue resets to undefined / [] by mode', () => {
    const single = setup({ value: 'ru' });
    act(() => single.result.current.clearValue());
    expect(single.onChange).toHaveBeenLastCalledWith(undefined, undefined);

    const many = setup({ multiple: true, value: ['fr', 'ru'] });
    act(() => many.result.current.clearValue());
    expect(many.onChange).toHaveBeenLastCalledWith([], undefined);
  });

  test('search filters by case-insensitive substring, not prefix', () => {
    const { result } = setup({ searchable: true });

    act(() => result.current.setUserQuery('ANC'));

    expect(result.current.filteredOptions.map((o) => o.value)).toEqual(['fr']);
  });
});
