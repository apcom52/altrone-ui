import { fireEvent, render, screen } from '@testing-library/react';
import { Button, Popover } from '../src';

describe('Popover', () => {
  test('need to be rendered when openByDefault prop is passed', () => {
    render(
      <Popover content="Popover content" openedByDefault data-testid="popover">
        <Button label="Test" data-testid="button" />
      </Popover>,
    );

    const content = screen.getByText('Popover content');
    expect(content).toBeInTheDocument();
  });

  test('need to be rendered only after clicking on the button', () => {
    render(
      <Popover content="Popover content" data-testid="popover">
        <Button label="Test" data-testid="button" />
      </Popover>,
    );

    expect(screen.queryByText('Popover content')).not.toBeInTheDocument();

    const button = screen.getByTestId('button');
    fireEvent.click(button);

    expect(screen.queryByText('Popover content')).toBeInTheDocument();
  });

  test('need to be show title', () => {
    render(
      <Popover
        title="Popover title"
        content="Popover content"
        openedByDefault
        data-testid="popover"
      >
        <Button label="Test" data-testid="button" />
      </Popover>,
    );

    expect(screen.getByText('Popover title')).toBeInTheDocument();
    expect(screen.queryByText('close')).not.toBeInTheDocument();
  });

  test('need to be show close button with title', () => {
    const { rerender } = render(
      <Popover
        title="Popover title"
        content="Popover content"
        openedByDefault
        showCloseButton
        data-testid="popover"
      >
        <Button label="Test" data-testid="button" />
      </Popover>,
    );

    expect(screen.getByText('Popover title')).toBeInTheDocument();
    expect(screen.getByText('close')).toBeInTheDocument();

    rerender(
      <Popover
        content="Popover content"
        openedByDefault
        showCloseButton
        data-testid="popover"
      >
        <Button label="Test" data-testid="button" />
      </Popover>,
    );

    expect(screen.queryByText('Popover title')).not.toBeInTheDocument();
    expect(screen.getByText('close')).toBeInTheDocument();
  });
});
