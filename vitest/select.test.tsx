import React from 'react';
import { expect, test, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Configuration, AltroneApplication, Select } from '../src/components';
import { SELECT_COUNTRIES } from '../src/components/select/constants';

class ResizeObserver {
  observe() {}
  unobserve() {}
}

beforeAll(() => {
  // @ts-ignore
  window.ResizeObserver = ResizeObserver;
});

describe('Select', () => {
  test('check that className and style props works', () => {
    render(
      <AltroneApplication>
        <Select
          name="country"
          multiple={false}
          value={''}
          onChange={() => null}
          data-testid="select"
          placeholder="Choose your country"
          options={SELECT_COUNTRIES}
          className="cls"
          style={{ color: 'rgb(0, 0, 255)' }}
        />
      </AltroneApplication>,
    );

    expect(screen.getByTestId('select')).toHaveClass('cls');
    expect(screen.getByTestId('select')).toHaveStyle('color: rgb(0, 0, 255)');
  });

  test('check that Textarea configuration works correctly', () => {
    render(
      <AltroneApplication>
        <Configuration
          select={{ className: 'cls', style: { color: 'rgb(0, 0, 255)' } }}
        >
          <Select
            name="country"
            multiple={false}
            value={''}
            onChange={() => null}
            data-testid="select"
            placeholder="Choose your country"
            options={SELECT_COUNTRIES}
          />
        </Configuration>
      </AltroneApplication>,
    );

    const element = screen.getByTestId('select');
    expect(element).toHaveClass('cls');
    expect(element).toHaveStyle('color: rgb(0, 0, 255)');
  });
});
