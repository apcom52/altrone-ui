import React, { createRef } from 'react';
import { expect, test, describe, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Radio } from '../src/components';

describe('Radio', () => {
  test('renders one native radio input per item, sharing a name', () => {
    render(
      <Radio value="a" onChange={vi.fn()} name="plan">
        <Radio.Item value="a">Free</Radio.Item>
        <Radio.Item value="b">Pro</Radio.Item>
        <Radio.Item value="c" disabled>
          Enterprise
        </Radio.Item>
      </Radio>,
    );

    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(3);
    radios.forEach((r) => expect(r).toHaveAttribute('name', 'plan'));

    expect(screen.getByRole('radio', { name: 'Free' })).toBeChecked();
    expect(screen.getByRole('radio', { name: 'Pro' })).not.toBeChecked();
    expect(screen.getByRole('radio', { name: 'Enterprise' })).toBeDisabled();
  });

  test('selecting an item calls onChange with its value and the event', () => {
    const onChange = vi.fn();
    render(
      <Radio value="a" onChange={onChange} name="plan">
        <Radio.Item value="a">Free</Radio.Item>
        <Radio.Item value="b">Pro</Radio.Item>
      </Radio>,
    );

    fireEvent.click(screen.getByText('Pro'));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0]).toBe('b');
    expect(onChange.mock.calls[0][1]).toHaveProperty('currentTarget');
  });

  test('group-level disabled disables every item', () => {
    render(
      <Radio value="a" onChange={vi.fn()} name="plan" disabled>
        <Radio.Item value="a">Free</Radio.Item>
        <Radio.Item value="b">Pro</Radio.Item>
      </Radio>,
    );

    screen.getAllByRole('radio').forEach((r) => expect(r).toBeDisabled());
  });

  test('a bare item takes its name from aria-label', () => {
    render(
      <Radio value="a" onChange={vi.fn()} name="c">
        <Radio.Item value="a" aria-label="Option A" />
        <Radio.Item value="b" aria-label="Option B" />
      </Radio>,
    );

    expect(screen.getByRole('radio', { name: 'Option A' })).toBeInTheDocument();
  });

  test('forwards refs to the group <div> and the item <label>', () => {
    const groupRef = createRef<HTMLDivElement>();
    const itemRef = createRef<HTMLLabelElement>();

    render(
      <Radio ref={groupRef} value="a" onChange={vi.fn()} name="c">
        <Radio.Item ref={itemRef} value="a">
          Free
        </Radio.Item>
      </Radio>,
    );

    expect(groupRef.current).toBeInstanceOf(HTMLDivElement);
    expect(itemRef.current).toBeInstanceOf(HTMLLabelElement);
  });

  test('className and style apply to the group and the item', () => {
    render(
      <Radio
        data-testid="group"
        value="a"
        onChange={vi.fn()}
        name="c"
        className="group-cls"
        style={{ color: 'rgb(0, 0, 255)' }}
      >
        <Radio.Item
          data-testid="item"
          value="a"
          className="item-cls"
          style={{ color: 'rgb(255, 255, 0)' }}
        >
          Free
        </Radio.Item>
      </Radio>,
    );

    expect(screen.getByTestId('group')).toHaveClass('group-cls');
    expect(screen.getByTestId('group')).toHaveStyle('color: rgb(0, 0, 255)');
    expect(screen.getByTestId('item')).toHaveClass('item-cls');
    expect(screen.getByTestId('item')).toHaveStyle('color: rgb(255, 255, 0)');
  });
});
