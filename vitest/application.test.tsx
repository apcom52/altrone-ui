import React from 'react';
import { expect, test, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Application } from '../src';

describe('Application', () => {
  test('renders a div root by default', () => {
    render(<Application data-testid="app" />);
    expect(screen.getByTestId('app').tagName).toBe('DIV');
  });

  test('asChild merges root attributes onto the passed element', () => {
    render(
      <Application asChild data-testid="app">
        <section>content</section>
      </Application>,
    );
    const root = screen.getByTestId('app');
    expect(root.tagName).toBe('SECTION');
    expect(root).toHaveAttribute('data-altrone-root', 'true');
    expect(root).toHaveTextContent('content');
  });

  test('when dark theme is applied the root gets data-altrone-theme="dark"', () => {
    const { rerender } = render(<Application data-testid="app" />);
    expect(screen.getByTestId('app')).toHaveAttribute(
      'data-altrone-theme',
      'light',
    );

    rerender(<Application theme="dark" data-testid="app" />);
    expect(screen.getByTestId('app')).toHaveAttribute(
      'data-altrone-theme',
      'dark',
    );
  });

  test('check that [data-altrone-root] exists', () => {
    render(<Application data-testid="app" />);
    expect(screen.getByTestId('app')).toHaveAttribute('data-altrone-root');
  });
});
