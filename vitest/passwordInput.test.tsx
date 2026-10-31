import { expect, test, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Application, PasswordInput, TextInput } from '../src';

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
    expect(screen.getByLabelText('Show password')).toBeInTheDocument();
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
    expect(screen.queryByLabelText('Show password')).not.toBeInTheDocument();
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

    const wrapper = screen.getByTestId('input').closest('.cls');
    expect(wrapper).not.toBeNull();
    expect(wrapper).toHaveStyle('color: rgb(0, 0, 255)');
  });
});
