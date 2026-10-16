import { expect, test, describe } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Application, ColorPicker } from '../src/components';
import { COLORS } from '../src/components/colorPicker/COLORS';
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

describe('ColorPicker', () => {
  beforeAll(() => {
    // @ts-ignore
    window.ResizeObserver = ResizeObserver;
  });

  test('check that render menu correctly', () => {
    render(<ColorPicker data-testid="picker" onChange={() => null} />);

    expect(screen.getByTestId('picker')).toBeInTheDocument();
  });

  test('check value and onChange props', async () => {
    let value: string | undefined = undefined;
    const handleChange = (color?: string) => {
      value = color;
    };

    const { rerender } = render(
      <ColorPicker
        data-testid="picker"
        value={value}
        onChange={handleChange}
        colorPresets={COLORS}
        clearable
      />,
    );

    await fireEvent.click(screen.getByTestId('picker'));

    rerender(
      <ColorPicker
        data-testid="picker"
        value={value}
        onChange={handleChange}
        colorPresets={COLORS}
        clearable
      />,
    );

    await fireEvent.click(screen.getByTitle('Crimson'));

    expect(value).toBe('#dc143c');

    /** Re-render with the committed value first — a controlled consumer always does this before the next interaction. */
    rerender(
      <ColorPicker
        data-testid="picker"
        value={value}
        onChange={handleChange}
        colorPresets={COLORS}
        clearable
      />,
    );

    await fireEvent.click(screen.getByText('Clear'));

    expect(value).toBe(undefined);
  });

  test('asChild uses the child as the trigger and opens the picker', async () => {
    render(
      <Application>
        <ColorPicker value="#00ff00" onChange={() => null} asChild>
          <button data-testid="custom-trigger">Pick</button>
        </ColorPicker>
      </Application>,
    );

    const trigger = screen.getByTestId('custom-trigger');
    expect(trigger).toHaveAttribute('data-value', '#00ff00');
    expect(trigger).toHaveAttribute('data-opened', 'false');

    fireEvent.click(trigger);
    expect(await screen.findByText('Select a color')).toBeInTheDocument();
  });

  test('the popover shows a localized title', () => {
    render(
      <Application language="ru">
        <ColorPicker data-testid="picker" onChange={() => null} />
      </Application>,
    );

    fireEvent.click(screen.getByTestId('picker'));

    expect(screen.getByText('Выберите цвет')).toBeInTheDocument();
  });

  test('check that className and style props works', () => {
    render(
      <ColorPicker
        className="cls"
        style={{ color: 'rgb(0, 0, 255) ' }}
        data-testid="picker"
        onChange={() => null}
      />,
    );

    const wrapper = screen.getByTestId('picker').closest('.cls');
    expect(wrapper).not.toBeNull();
    expect(wrapper).toHaveStyle('color: rgb(0, 0, 255)');
  });
});
