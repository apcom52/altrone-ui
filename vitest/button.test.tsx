import React from 'react';
import { expect, test, describe, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { Application, Button, Icon } from '../src';

describe('Button', () => {
  test('need to render only icon when no label was passed', () => {
    render(
      <Application>
        <Button leftIcon={<Icon i="check" />} data-testid="element" />
      </Application>,
    );

    const element = screen.getByTestId('element');
    expect(element.children).toHaveLength(1);
  });

  test('need to render left and right icons', () => {
    render(
      <Application>
        <Button
          leftIcon={<Icon i="check" />}
          rightIcon={<Icon i="forward" />}
          label="Button label"
          data-testid="element"
        />
      </Application>,
    );

    const buttonLabel = screen.getByText('Button label');
    const leftIcon = screen.getByText('check');
    const rightIcon = screen.getByText('forward');

    expect(buttonLabel).toBeInTheDocument();
    expect(leftIcon).toBeInTheDocument();
    expect(rightIcon).toBeInTheDocument();
  });

  test('check that onClick function works correctly', () => {
    const onClickHandler = vi.fn();

    render(
      <Application>
        <Button
          leftIcon={<Icon i="check" />}
          data-testid="element"
          onClick={onClickHandler}
        />
      </Application>,
    );

    fireEvent.click(screen.getByTestId('element'));
    expect(onClickHandler).toBeCalledTimes(1);
  });

  test('check that custom className and styles works', () => {
    render(
      <Button
        data-testid="button"
        className="cls"
        style={{
          color: 'rgb(0, 0, 255)',
        }}
      />,
    );
    expect(screen.getByTestId('button')).toHaveClass('cls');
    expect(screen.getByTestId('button')).toHaveStyle('color: rgb(0, 0, 255)');
  });

  test('check that configuration works', () => {
    render(
      <Application
        config={{
          button: { className: 'cls', style: { color: 'rgb(0, 0, 255)' } },
        }}
      >
        <Button data-testid="button" />
      </Application>,
    );

    const element = screen.getByTestId('button');
    expect(element).toHaveClass('cls');
    expect(element).toHaveStyle('color: rgb(0, 0, 255)');
  });
});
