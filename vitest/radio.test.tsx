import { render, screen } from '@testing-library/react';
import { Configuration, AltroneApplication, Radio } from '../src/components';

class ResizeObserver {
  observe() {}
  unobserve() {}
}

beforeAll(() => {
  // @ts-ignore
  window.ResizeObserver = ResizeObserver;
});

describe('Radio', () => {
  test('check that all inner items are rendered', () => {
    render(
      <AltroneApplication>
        <Radio
          data-testid="radio"
          value="0"
          onChange={() => null}
          name="radio"
          className="cls"
          style={{ color: 'blue' }}
        >
          <Radio.Item
            data-testid="radio-item"
            className="inner-cls"
            style={{ color: 'yellow' }}
            value="0"
          >
            First option
          </Radio.Item>
          <Radio.Item value="1">Second option</Radio.Item>
          <Radio.Item value="2" disabled>
            Third option
          </Radio.Item>
        </Radio>
      </AltroneApplication>,
    );

    expect(screen.getByText('First option')).toBeInTheDocument();
    expect(screen.getByText('First option').parentElement).toHaveAttribute(
      'aria-checked',
      'true',
    );
    expect(screen.getByText('Second option')).toBeInTheDocument();
    expect(screen.getByText('Third option')).toBeInTheDocument();
    expect(screen.getByText('Third option').parentElement).toHaveAttribute(
      'aria-disabled',
      'true',
    );
  });

  test('check that className and style props works', () => {
    render(
      <AltroneApplication>
        <Radio
          data-testid="radio"
          value="0"
          onChange={() => null}
          name="radio"
          className="cls"
          style={{ color: 'blue' }}
        >
          <Radio.Item
            data-testid="radio-item"
            className="inner-cls"
            style={{ color: 'yellow' }}
            value="0"
          >
            First option
          </Radio.Item>
          <Radio.Item value="1">Second option</Radio.Item>
        </Radio>
      </AltroneApplication>,
    );

    expect(screen.getByTestId('radio')).toHaveClass('cls');
    expect(screen.getByTestId('radio')).toHaveStyle('color: blue');
    expect(screen.getByTestId('radio-item')).toHaveClass('inner-cls');
    expect(screen.getByTestId('radio-item')).toHaveStyle('color: yellow');
  });

  test('check that Textarea configuration works correctly', () => {
    render(
      <AltroneApplication>
        <Configuration
          radio={{
            className: 'cls',
            style: { color: 'blue' },
          }}
        >
          <Radio
            data-testid="radio"
            value="0"
            onChange={() => null}
            name="radio"
          >
            <Radio.Item data-testid="radio-item" value="0">
              First option
            </Radio.Item>
            <Radio.Item value="1">Second option</Radio.Item>
          </Radio>
        </Configuration>
      </AltroneApplication>,
    );

    const element = screen.getByTestId('radio');
    expect(element).toHaveClass('cls');
    expect(element).toHaveStyle('color: blue');
  });
});
