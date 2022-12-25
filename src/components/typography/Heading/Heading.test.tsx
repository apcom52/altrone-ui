import { Heading } from './index';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Typography.Heading', () => {
  test('should render default heading as h1', () => {
    render(<Heading>Header</Heading>);
    const headingElement = screen.getByText('Header');
    expect(headingElement.tagName).toBe('H1');
  });

  test('should render heading with a specific level', () => {
    render(<Heading level={3}>Header</Heading>);
    const headingElement = screen.getByText('Header');
    expect(headingElement.tagName).toBe('H3');
  });

  test('should render heading with a wrong level', () => {
    // @ts-ignore
    render(<Heading level={-1}>Header</Heading>);
    const headingElement = screen.getByText('Header');
    expect(headingElement.tagName).toBe('H1');
  });

  test('should render something without children', () => {
    // @ts-ignore
    render(<Heading data-testid="heading" />);
    const headingElement = screen.getByTestId('heading');
    expect(headingElement.tagName).toBe('H1');
  });
});
