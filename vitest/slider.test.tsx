import React from 'react';
import { expect, test, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Application, Slider } from '../src/components';

describe('Slider', () => {
  test('check that inner input has all necessary attributes', () => {
    const { container } = render(
      <Application>
        <Slider
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
        <Slider
          value={15}
          min={-50}
          max={500}
          onChange={() => null}
          readOnly
          data-testid="slider1"
        />
        <Slider
          value={44}
          onChange={() => null}
          direction="vertical"
          data-testid="slider2"
          disabled
          renderLabel={(value) => `${value}m2`}
        />
      </Application>,
    );

    const element = screen.getByTestId('slider1');
    expect(element).toHaveAttribute('role', 'slider');
    expect(element).toHaveAttribute('aria-orientation', 'horizontal');
    expect(element).toHaveAttribute('aria-valuenow', '15');
    expect(element).toHaveAttribute('aria-valuemin', '-50');
    expect(element).toHaveAttribute('aria-valuemax', '500');
    expect(element).toHaveAttribute('aria-valuetext', '15');

    const element2 = screen.getByTestId('slider2');
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
        <Slider
          value={44}
          onChange={() => null}
          readOnly
          data-testid="slider2"
          renderLabel={(value) => `${value}m2`}
        />
      </Application>,
    );

    const element = screen.getByTestId('slider2');
    expect(element).toHaveTextContent('44m2');
  });

  test('check that className, style, activeClassName, activeStyle props works', () => {
    const { container } = render(
      <Application>
        <Slider
          value={44}
          onChange={() => null}
          data-testid="slider"
          className="cls"
          style={{ color: 'rgb(0, 0, 255)' }}
          activeClassName="active-cls"
          activeStyle={{ color: 'rgb(255, 0, 0)' }}
        />
      </Application>,
    );

    expect(screen.getByTestId('slider')).toHaveClass('cls');
    expect(screen.getByTestId('slider')).toHaveStyle('color: rgb(0, 0, 255)');

    const element = container.querySelector('.active-cls');
    expect(element).toHaveClass('active-cls');
    expect(element).toHaveStyle('color: rgb(255, 0, 0)');
  });

  test('value bubble portals out of the root so an overflow ancestor cannot clip it', () => {
    render(
      <Application>
        <Slider
          value={30}
          onChange={() => null}
          showCurrentValue="always"
          data-testid="slider3"
          renderLabel={(value) => `${value}%`}
        />
      </Application>,
    );

    const root = screen.getByTestId('slider3');
    const bubble = screen.getByText('30%');

    expect(bubble).toBeInTheDocument();
    expect(root).not.toContainElement(bubble);
  });
});
