import React from 'react';
import { expect, test, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  Application,
  Configuration,
  PasswordInput,
  TextInput,
} from '../src';

class ResizeObserver {
  observe() {}
  unobserve() {}
}

beforeAll(() => {
  // @ts-ignore
  window.ResizeObserver = ResizeObserver;
});

describe('Password', () => {
  test('need to show special island', () => {
    render(
      <Application>
        <PasswordInput data-testid="password">
          <TextInput.TextIsland data-testid="island" label="Text" />
        </PasswordInput>
      </Application>,
    );

    expect(screen.getByTestId('island')).toBeInTheDocument();
    expect(screen.getByText('visibility')).toBeInTheDocument();
  });

  test('need to hide special island when showControls is falsy', () => {
    render(
      <Application>
        <PasswordInput showControls={false} data-testid="password">
          <TextInput.TextIsland data-testid="island" label="Text" />
        </PasswordInput>
      </Application>,
    );

    expect(screen.getByTestId('island')).toBeInTheDocument();
    expect(screen.queryByText('visibility')).not.toBeInTheDocument();
  });

  test('check that custom className and styles works', () => {
    render(
      <Application>
        <PasswordInput
          data-testid="input"
          className="cls"
          style={{ color: 'rgb(0, 0, 255)' }}
        />
      </Application>,
    );

    expect(screen.getByTestId('input')).toHaveClass('cls');
    expect(screen.getByTestId('input')).toHaveStyle('color: rgb(0, 0, 255)');
  });

  test('check that configuration works', () => {
    render(
      <Application>
        <Configuration
          passwordInput={{
            className: 'cls',
            style: { color: 'red' },
            showControls: false,
          }}
        >
          <PasswordInput data-testid="input" />
        </Configuration>
      </Application>,
    );

    expect(screen.getByTestId('input')).toHaveClass('cls');
    expect(screen.getByTestId('input')).toHaveStyle('color: rgb(255, 0, 0)');
    expect(screen.queryByText('visibility')).not.toBeInTheDocument();
  });
});
