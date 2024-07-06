import { render, screen } from '@testing-library/react';
import {
  AltroneApplication,
  Configuration,
  NumberInput,
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

describe('NumberInput', () => {
  test('need to show special island', () => {
    render(
      <AltroneApplication>
        <NumberInput onChange={() => null} data-testid="number">
          <TextInput.TextIsland data-testid="island" label="Text" />
        </NumberInput>
      </AltroneApplication>,
    );

    expect(screen.getByTestId('island')).toBeInTheDocument();
    expect(screen.getByText('keyboard_arrow_up')).toBeInTheDocument();
    expect(screen.getByText('keyboard_arrow_down')).toBeInTheDocument();
  });

  test('need to hide special island when showControls is falsy', () => {
    render(
      <AltroneApplication>
        <NumberInput
          onChange={() => null}
          showControls={false}
          data-testid="number"
        >
          <TextInput.TextIsland data-testid="island" label="Text" />
        </NumberInput>
      </AltroneApplication>,
    );

    expect(screen.getByTestId('island')).toBeInTheDocument();
    expect(screen.queryByText('keyboard_arrow_up')).not.toBeInTheDocument();
    expect(screen.queryByText('keyboard_arrow_down')).not.toBeInTheDocument();
  });

  test('check that custom className and styles works', () => {
    render(
      <AltroneApplication>
        <NumberInput
          onChange={() => null}
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
          numberInput={{
            className: 'cls',
            style: { color: 'red' },
            showControls: false,
          }}
        >
          <NumberInput onChange={() => null} data-testid="input" />
        </Configuration>
      </AltroneApplication>,
    );

    expect(screen.getByTestId('input')).toHaveClass('cls');
    expect(screen.getByTestId('input')).toHaveStyle('color: red');
    expect(screen.queryByText('keyboard_arrow_up')).not.toBeInTheDocument();
    expect(screen.queryByText('keyboard_arrow_down')).not.toBeInTheDocument();
  });
});
