import React from 'react';
import { expect, test, describe } from 'vitest';
import { render, screen as testingScreen } from '@testing-library/react';
import { Screen } from '../src/components';

describe('Screen', () => {
  test('renders Content as a <main> with no other zones present', () => {
    render(
      <Screen>
        <Screen.Content data-testid="content">Hello</Screen.Content>
      </Screen>,
    );

    const content = testingScreen.getByTestId('content');
    expect(content.tagName).toBe('MAIN');
    expect(content).toHaveTextContent('Hello');
  });

  test('renders each zone with its semantic tag when composed together', () => {
    render(
      <Screen>
        <Screen.Sidebar data-testid="sidebar">Sidebar</Screen.Sidebar>
        <Screen.Header data-testid="header">Header</Screen.Header>
        <Screen.Content data-testid="content">Content</Screen.Content>
        <Screen.Footer data-testid="footer">Footer</Screen.Footer>
      </Screen>,
    );

    expect(testingScreen.getByTestId('sidebar').tagName).toBe('ASIDE');
    expect(testingScreen.getByTestId('header').tagName).toBe('HEADER');
    expect(testingScreen.getByTestId('content').tagName).toBe('MAIN');
    expect(testingScreen.getByTestId('footer').tagName).toBe('FOOTER');
  });

  test('a zone that is not rendered by the consumer is simply absent', () => {
    render(
      <Screen>
        <Screen.Content>Content</Screen.Content>
      </Screen>,
    );

    expect(testingScreen.queryByRole('complementary')).not.toBeInTheDocument();
  });
});
