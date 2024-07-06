import { render, screen } from '@testing-library/react';
import {
  AltroneApplication,
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
      <AltroneApplication>
        <PasswordInput data-testid="password">
          <TextInput.TextIsland data-testid="island" label="Text" />
        </PasswordInput>
      </AltroneApplication>,
    );

    expect(screen.getByTestId('island')).toBeInTheDocument();
    expect(screen.getByText('visibility')).toBeInTheDocument();
  });

  test('need to hide special island when showControls is falsy', () => {
    render(
      <AltroneApplication>
        <PasswordInput showControls={false} data-testid="password">
          <TextInput.TextIsland data-testid="island" label="Text" />
        </PasswordInput>
      </AltroneApplication>,
    );

    expect(screen.getByTestId('island')).toBeInTheDocument();
    expect(screen.queryByText('visibility')).not.toBeInTheDocument();
  });

  test('check that custom className and styles works', () => {
    render(
      <AltroneApplication>
        <PasswordInput
          data-testid="input"
          className="cls"
          style={{ color: 'blue' }}
        />
      </AltroneApplication>,
    );

    expect(screen.getByTestId('input')).toHaveClass('cls');
    expect(screen.getByTestId('input')).toHaveStyle('color: blue');
  });

  test('check that configuration works', () => {
    render(
      <AltroneApplication>
        <Configuration
          passwordInput={{
            className: 'cls',
            style: { color: 'red' },
            showControls: false,
          }}
        >
          <PasswordInput data-testid="input" />
        </Configuration>
      </AltroneApplication>,
    );

    expect(screen.getByTestId('input')).toHaveClass('cls');
    expect(screen.getByTestId('input')).toHaveStyle('color: red');
    expect(screen.queryByText('visibility')).not.toBeInTheDocument();
  });
});
