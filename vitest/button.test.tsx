import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { AltroneApplication, Button, Icon } from '../src';

describe('Button', () => {
  test('need to render only icon when no label was passed', () => {
    render(
      <AltroneApplication>
        <Button leftIcon={<Icon i="check" />} data-testid="element" />
      </AltroneApplication>,
    );

    const element = screen.getByTestId('element');
    expect(element.children).toHaveLength(1);
  });

  test('need to render left and right icons', () => {
    render(
      <AltroneApplication>
        <Button
          leftIcon={<Icon i="check" />}
          rightIcon={<Icon i="forward" />}
          label="Button label"
          data-testid="element"
        />
      </AltroneApplication>,
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
      <AltroneApplication>
        <Button
          leftIcon={<Icon i="check" />}
          data-testid="element"
          onClick={onClickHandler}
        />
      </AltroneApplication>,
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
          color: 'blue',
        }}
      />,
    );
    expect(screen.getByTestId('button')).toHaveClass('cls');
    expect(screen.getByTestId('button')).toHaveStyle('color: blue');
  });

  test('check that configuration works', () => {
    render(
      <AltroneApplication
        config={{ button: { className: 'cls', style: { color: 'blue' } } }}
      >
        <Button data-testid="button" />
      </AltroneApplication>,
    );

    const element = screen.getByTestId('button');
    expect(element).toHaveClass('cls');
    expect(element).toHaveStyle('color: blue');
  });
});
