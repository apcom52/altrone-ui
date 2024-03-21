import { Blockquote } from './index';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Typography.Blockquote', () => {
  test('should render blockquote', () => {
    render(<Blockquote>lorem ipsum</Blockquote>);
    const element = screen.getByText('lorem ipsum');
    expect(element).toBeInTheDocument();
  });

  test('should render blockquote with author', () => {
    render(<Blockquote author="Foo Bar">lorem ipsum</Blockquote>);
    const element = screen.getByText('Foo Bar');
    expect(element).toBeInTheDocument();
  });

  test('should add cite attribute to blockquote', () => {
    render(
      <Blockquote author="Foo Bar" cite="https://google.com">
        lorem ipsum
      </Blockquote>
    );
    const element = screen.getByText('lorem ipsum');
    expect(element).toHaveAttribute('cite', 'https://google.com');
  });

  test('should be customizable with classNames', () => {
    render(
      <Blockquote
        author="Foo Bar"
        cite="https://google.com"
        classNames={{
          content: 'demo-class',
          author: 'demo-class'
        }}
        className="parent-class"
        data-testid="blockquote">
        lorem ipsum
      </Blockquote>
    );
    const quote = screen.getByTestId('blockquote');
    const content = screen.getByText('lorem ipsum');
    const author = screen.getByText('Foo Bar');
    expect(quote).toHaveAttribute('class', 'alt-blockquote parent-class');
    expect(content).toHaveAttribute('class', 'alt-blockquote__content demo-class');
    expect(author).toHaveAttribute('class', 'alt-blockquote__author demo-class');
  });
});
