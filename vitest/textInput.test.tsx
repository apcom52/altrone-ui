import React, { createRef } from 'react';
import { expect, test, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AltroneApplication, TextInput } from '../src';

describe('TextInput', () => {
  test('renders every island type, split by placement', () => {
    render(
      <AltroneApplication>
        <TextInput data-testid="input">
          <TextInput.TextIsland label="Prefix" data-testid="text-island" />
          <TextInput.IconIsland
            icon={<svg />}
            placement="end"
            data-testid="icon-island"
          />
          <TextInput.ActionIsland label="Go" data-testid="action-island" />
          <TextInput.CustomIsland placement="end" data-testid="custom-island">
            x
          </TextInput.CustomIsland>
          <TextInput.LoadingIsland placement="end" data-testid="loading-island" />
        </TextInput>
      </AltroneApplication>,
    );

    expect(screen.getByTestId('text-island').closest('[data-altrone-island]'))
      .toHaveAttribute('data-altrone-island', 'start');
    expect(screen.getByTestId('icon-island').closest('[data-altrone-island]'))
      .toHaveAttribute('data-altrone-island', 'end');
    expect(screen.getByTestId('action-island')).toBeInTheDocument();
    expect(screen.getByTestId('custom-island')).toBeInTheDocument();
    expect(screen.getByTestId('loading-island')).toBeInTheDocument();
  });

  test('wrapperClassName/wrapperStyle target the wrapper, className/style the input', () => {
    render(
      <AltroneApplication>
        <TextInput
          data-testid="input"
          wrapperClassName="wrapperCls"
          wrapperStyle={{ color: 'rgb(255, 0, 0)' }}
          className="inputCls"
          style={{ color: 'rgb(0, 0, 255)' }}
        />
      </AltroneApplication>,
    );

    const input = screen.getByTestId('input');
    expect(input).toHaveClass('inputCls');
    expect(input).toHaveStyle('color: rgb(0, 0, 255)');

    const wrapper = input.closest('.wrapperCls');
    expect(wrapper).not.toBeNull();
    expect(wrapper).toHaveStyle('color: rgb(255, 0, 0)');
    expect(wrapper).not.toBe(input);
  });

  test('ref points at the wrapper, inputRef at the field', () => {
    const ref = createRef<HTMLElement>();
    const inputRef = createRef<HTMLInputElement>();

    render(
      <AltroneApplication>
        <TextInput data-testid="input" ref={ref} inputRef={inputRef} />
      </AltroneApplication>,
    );

    expect(inputRef.current).toBe(screen.getByTestId('input'));
    expect(inputRef.current?.tagName).toBe('INPUT');
    expect(ref.current).not.toBeNull();
    expect(ref.current).not.toBe(inputRef.current);
    expect(ref.current?.contains(inputRef.current)).toBe(true);
  });

  test('asChild uses the first non-island child as the field element', () => {
    render(
      <AltroneApplication>
        <TextInput asChild>
          <textarea data-testid="field" />
          <TextInput.TextIsland label="note" />
        </TextInput>
      </AltroneApplication>,
    );

    expect(screen.getByTestId('field').tagName).toBe('TEXTAREA');
  });

  test('wrapper zeroes its vertical padding so islands cannot inflate the height', () => {
    const { container } = render(
      <AltroneApplication>
        <TextInput data-testid="input">
          <TextInput.ActionIsland label="Go" data-testid="action-island" />
        </TextInput>
      </AltroneApplication>,
    );

    const wrapper = container.querySelector('[style*="--box-padding-y"]');
    expect(wrapper).not.toBeNull();
    expect(wrapper?.getAttribute('style')).toContain('--box-padding-y: 0px');
    expect(wrapper?.contains(screen.getByTestId('input'))).toBe(true);
  });

  test('ActionIsland forwards Button-only props (it is a Button)', () => {
    render(
      <AltroneApplication>
        <TextInput data-testid="input">
          <TextInput.ActionIsland
            label="Save"
            state="loading"
            data-testid="action"
          />
        </TextInput>
      </AltroneApplication>,
    );

    expect(screen.getByTestId('action')).toHaveAttribute('aria-busy', 'true');
  });

  test('invalid sets aria-invalid on the input', () => {
    render(
      <AltroneApplication>
        <TextInput data-testid="input" invalid />
      </AltroneApplication>,
    );

    expect(screen.getByTestId('input')).toHaveAttribute('aria-invalid', 'true');
  });
});
