import { render, screen } from '@testing-library/react';
import { Message, Icon, AltroneApplication } from '../src/components';

describe('Message', () => {
  test('Message has to display the content', () => {
    render(<Message data-testid="message">Test content</Message>);

    const element = screen.getByTestId('message');
    expect(element).toBeInTheDocument();
    expect(screen.getByText('Test content')).toBeInTheDocument();
  });

  test('Message has to display heading', () => {
    render(
      <Message data-testid="message" header="Header">
        Test content
      </Message>,
    );

    expect(screen.getByText('Header')).toBeInTheDocument();
  });

  test('Message has to display icon', () => {
    render(
      <Message
        data-testid="message"
        header="Header"
        icon={<Icon i="test-icon" />}
      >
        Test content
      </Message>,
    );

    expect(screen.getByText('test-icon')).toBeInTheDocument();
  });

  test('Message has to apply custom className and id', () => {
    render(
      <Message data-testid="message" className="test-classname" id="test-id">
        Test content
      </Message>,
    );

    const element = screen.getByTestId('message');
    expect(element).toHaveClass('test-classname');
    expect(element.id).toBe('test-id');
  });

  test('check that Message configuration works correctly', () => {
    render(
      <AltroneApplication
        config={{ message: { className: 'cls', style: { color: 'blue' } } }}
      >
        <Message data-testid="element">content</Message>
      </AltroneApplication>,
    );

    const element = screen.getByTestId('element');
    expect(element).toHaveClass('cls');
    expect(element).toHaveStyle('color: blue');
  });
});
