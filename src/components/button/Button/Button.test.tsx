import { Button } from './index';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ButtonVariant } from './Button';
import { Icon } from '../../icons';
import { Role } from '../../../types';
import { RefObject } from 'react';

describe('Button.Button', () => {
  test('should renders correctly', () => {
    const { container, rerender } = render(<Button>Example button</Button>);
    const element = screen.getByText('Example button');
    expect(element).toBeInTheDocument();

    expect(container.innerHTML).toBe(
      '<button class="alt-button" type="button">Example button</button>'
    );

    rerender(<Button className="custom-class">Button with custom className</Button>);
    const customButton = screen.getByText('Button with custom className');
    expect(customButton).toHaveClass('custom-class');
  });

  test('if href was passed then tagName should be a', () => {
    const { container, rerender } = render(
      <Button role={Role.primary} variant={ButtonVariant.borders} href="https://google.com">
        Example button
      </Button>
    );
    const element = screen.getByText('Example button');
    expect(element.tagName).toBe('A');

    expect(container.innerHTML).toBe(
      '<a class="alt-button alt-button--role-primary alt-button--variant-borders" href="https://google.com">Example button</a>'
    );
  });

  test('should handle onClick', () => {
    const onClickHandler = jest.fn();
    render(<Button onClick={onClickHandler}>Example button</Button>);
    const element = screen.getByText('Example button');
    fireEvent.click(element);
    expect(onClickHandler).toBeCalledTimes(1);
  });

  test('should be fullWidth if passed prop fluid', () => {
    render(<Button fluid>Example button</Button>);
    const element = screen.getByText('Example button');
    expect(element).toHaveClass('alt-button--fluid');
  });

  test('should contain icons', () => {
    render(
      <>
        <Button leftIcon={<Icon i="face" />}>Left</Button>
        <Button rightIcon={<Icon i="trash" />}>Right</Button>
        <Button leftIcon={<Icon i="delete" />} rightIcon={<Icon i="phone" />}>
          Both
        </Button>
      </>
    );
    const left = screen.getByText('face');
    const right = screen.getByText('trash');
    const bothLeft = screen.getByText('delete');
    const bothRight = screen.getByText('phone');
    expect(left).toBeInTheDocument();
    expect(right).toBeInTheDocument();
    expect(bothLeft).toBeInTheDocument();
    expect(bothRight).toBeInTheDocument();
  });

  test('should open dropdown', async () => {
    const { container, rerender } = render(
      <Button dropdown={[{ title: 'Action', onClick: () => null }]}>Dropdown button</Button>
    );
    const button = screen.getByText('Dropdown button');
    await waitFor(() => fireEvent.click(button));

    rerender(
      <Button dropdown={[{ title: 'Action', onClick: () => null }]}>Dropdown button</Button>
    );
    const actionButton = screen.getByText('Action');
    expect(actionButton).toBeInTheDocument();

    await waitFor(() => fireEvent.click(actionButton));

    expect(container).toContainHTML(
      '<button class="alt-button" type="button">Dropdown button</button>'
    );
  });

  test('should ref works correctly', async () => {
    const ref: RefObject<HTMLButtonElement> = { current: null };

    let refValue: RefObject<HTMLButtonElement> = { current: null };
    const refFunction = (refElement: HTMLButtonElement) => {
      refValue = {
        current: refElement
      };
    };

    const { rerender } = render(<Button ref={ref}>Button</Button>);
    expect(ref.current?.tagName).toBe('BUTTON');
    expect(ref.current?.innerHTML).toBe('Button');

    rerender(<Button ref={refFunction}>Function</Button>);
    expect(refValue.current?.tagName).toBe('BUTTON');
    expect(refValue.current?.innerHTML).toBe('Function');
  });
});
