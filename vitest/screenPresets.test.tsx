import React from 'react';
import { expect, test, describe } from 'vitest';
import { render, screen as testingScreen } from '@testing-library/react';
import { Screen } from '../src/components';

describe('Screen presets', () => {
  test('ListDetail renders both panes', () => {
    render(
      <Screen.ListDetail
        list={<div data-testid="list">List</div>}
        detail={<div data-testid="detail">Detail</div>}
      />,
    );
    expect(testingScreen.getByTestId('list')).toBeInTheDocument();
    expect(testingScreen.getByTestId('detail')).toBeInTheDocument();
  });

  test('Dashboard renders its children', () => {
    render(
      <Screen.Dashboard>
        <Screen.Content data-testid="content">Widgets</Screen.Content>
      </Screen.Dashboard>,
    );
    expect(testingScreen.getByTestId('content')).toHaveTextContent('Widgets');
  });

  test('Form defaults to a narrow size unless overridden', () => {
    const { container, rerender } = render(<Screen.Form />);
    expect(container.querySelector('[class*="Small"]')).toBeInTheDocument();

    rerender(<Screen.Form size="xl" />);
    expect(container.querySelector('[class*="XLarge"]')).toBeInTheDocument();
  });

  test('Settings renders Sidebar and Content zones', () => {
    render(
      <Screen.Settings>
        <Screen.Sidebar data-testid="sidebar">Nav</Screen.Sidebar>
        <Screen.Content data-testid="content">Form</Screen.Content>
      </Screen.Settings>,
    );
    expect(testingScreen.getByTestId('sidebar')).toBeInTheDocument();
    expect(testingScreen.getByTestId('content')).toBeInTheDocument();
  });

  test('DataView renders full-width content', () => {
    render(
      <Screen.DataView>
        <Screen.Content data-testid="content">Table</Screen.Content>
      </Screen.DataView>,
    );
    expect(testingScreen.getByTestId('content')).toBeInTheDocument();
  });

  test('Auth, Empty, and Error each render their children', () => {
    render(
      <>
        <Screen.Auth>
          <div data-testid="auth">Sign in</div>
        </Screen.Auth>
        <Screen.Empty>
          <div data-testid="empty">Nothing here</div>
        </Screen.Empty>
        <Screen.Error>
          <div data-testid="error">Something broke</div>
        </Screen.Error>
      </>,
    );
    expect(testingScreen.getByTestId('auth')).toBeInTheDocument();
    expect(testingScreen.getByTestId('empty')).toBeInTheDocument();
    expect(testingScreen.getByTestId('error')).toBeInTheDocument();
  });
});
