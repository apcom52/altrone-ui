import { fireEvent, render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import { Button, Icon } from 'components';

describe('Button', () => {
  test('need to render only icon when no label was passed', () => {
    render(<Button leftIcon={<Icon i="check" />} data-testid="element" />);

    const element = screen.getByTestId('element');
    expect(element.children).toHaveLength(1);
  });

  test('need to render left and right icons', () => {
    render(
      <Button
        leftIcon={<Icon i="check" />}
        rightIcon={<Icon i="forward" />}
        label="Button label"
        data-testid="element"
      />,
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
      <Button
        leftIcon={<Icon i="check" />}
        data-testid="element"
        onClick={onClickHandler}
      />,
    );

    fireEvent.click(screen.getByTestId('element'));
    expect(onClickHandler).toBeCalledTimes(1);
  });
});
