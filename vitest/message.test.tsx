import { expect, test, describe, vi } from 'vitest';
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { Message } from '../src/components';

describe('Message', () => {
  test('renders the header and the body content', () => {
    render(
      <Message data-testid="message" header="Header">
        Body content
      </Message>,
    );

    expect(screen.getByTestId('message')).toBeInTheDocument();
    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Body content')).toBeInTheDocument();
  });

  test('renders the icon when provided', () => {
    render(
      <Message data-testid="message" icon={<span>icon</span>}>
        Body
      </Message>,
    );

    expect(screen.getByText('icon')).toBeInTheDocument();
  });

  test('spreads arbitrary props and className onto the root element', () => {
    render(
      <Message data-testid="message" className="custom" id="my-id">
        Body
      </Message>,
    );

    const element = screen.getByTestId('message');
    expect(element).toHaveClass('custom');
    expect(element.id).toBe('my-id');
  });

  test('root role defaults to "status" for a non-danger severity', () => {
    render(
      <Message data-testid="message" severity="warning">
        Body
      </Message>,
    );

    expect(screen.getByTestId('message')).toHaveAttribute('role', 'status');
  });

  test('root role defaults to "alert" for severity="danger"', () => {
    render(
      <Message data-testid="message" severity="danger">
        Body
      </Message>,
    );

    expect(screen.getByTestId('message')).toHaveAttribute('role', 'alert');
  });

  test('an explicit ariaRole overrides the severity-derived default', () => {
    render(
      <Message data-testid="message" severity="danger" ariaRole="status">
        Body
      </Message>,
    );

    expect(screen.getByTestId('message')).toHaveAttribute('role', 'status');
  });

  test('close button appears only when onClose is passed and fires it on click', () => {
    render(<Message>Body</Message>);
    expect(screen.queryByRole('button', { name: 'Close' })).toBeNull();
    cleanup();

    const onClose = vi.fn();
    render(<Message onClose={onClose}>Body</Message>);
    fireEvent.click(screen.getByRole('button', { name: 'Close' }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
