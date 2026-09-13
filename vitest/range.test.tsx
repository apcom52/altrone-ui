import React from 'react';
import { expect, test, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Application, Range } from '../src/components';

describe('Range', () => {
  test('check that inner input has all necessary attributes', () => {
    const { container } = render(
      <Application>
        <Range
          value={15}
          min={-50}
          max={100}
          onChange={() => null}
          name="test"
        />
      </Application>,
    );

    const element = container.querySelector('input') as HTMLInputElement;
    expect(element.value).toBe('15');
    expect(element.name).toBe('test');
  });

  test('check aria attributes', () => {
    render(
      <Application>
        <Range
          value={15}
          min={-50}
          max={500}
          onChange={() => null}
          readOnly
          data-testid="range1"
        />
        <Range
          value={44}
          onChange={() => null}
          direction="vertical"
          data-testid="range2"
          disabled
          renderLabel={(value) => `${value}m2`}
        />
      </Application>,
    );

    const element = screen.getByTestId('range1');
    expect(element).toHaveAttribute('role', 'slider');
    expect(element).toHaveAttribute('aria-orientation', 'horizontal');
    expect(element).toHaveAttribute('aria-valuenow', '15');
    expect(element).toHaveAttribute('aria-valuemin', '-50');
    expect(element).toHaveAttribute('aria-valuemax', '500');
    expect(element).toHaveAttribute('aria-valuetext', '15');

    const element2 = screen.getByTestId('range2');
    expect(element2).toHaveAttribute('role', 'slider');
    expect(element2).toHaveAttribute('aria-orientation', 'vertical');
    expect(element2).toHaveAttribute('aria-valuenow', '44');
    expect(element2).toHaveAttribute('aria-valuemin', '0');
    expect(element2).toHaveAttribute('aria-valuemax', '100');
    expect(element2).toHaveAttribute('aria-valuetext', '44m2');
  });

  test('renderLabel drives the visible read-only label', () => {
    render(
      <Application>
        <Range
          value={44}
          onChange={() => null}
          readOnly
          data-testid="range2"
          renderLabel={(value) => `${value}m2`}
        />
      </Application>,
    );

    const element = screen.getByTestId('range2');
    expect(element).toHaveTextContent('44m2');
  });

  test('check that className, style, activeTrackClassName props works', () => {
    const { container } = render(
      <Application>
        <Range
          value={44}
          onChange={() => null}
          data-testid="range"
          className="cls"
          style={{ color: 'rgb(0, 0, 255)' }}
          activeTrackClassName="active-cls"
        />
      </Application>,
    );

    expect(screen.getByTestId('range')).toHaveClass('cls');
    expect(screen.getByTestId('range')).toHaveStyle('color: rgb(0, 0, 255)');

    const element = container.querySelector('.active-cls');
    expect(element).toHaveClass('active-cls');
  });

  test('value bubble portals out of the root so an overflow ancestor cannot clip it', () => {
    render(
      <Application>
        <Range
          value={30}
          onChange={() => null}
          showCurrentValue="always"
          data-testid="range3"
          renderLabel={(value) => `${value}%`}
        />
      </Application>,
    );

    const root = screen.getByTestId('range3');
    const bubble = screen.getByText('30%');

    expect(bubble).toBeInTheDocument();
    expect(root).not.toContainElement(bubble);
  });
});
