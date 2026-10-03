import React from 'react';
import { expect, test, describe } from 'vitest';
import { act, render, screen } from '@testing-library/react';
import { Application, Screen, setPageTitle, resetPageTitle } from '../src';

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

describe('Application document title', () => {
  test('combines Screen.title and applicationName on initial mount', () => {
    render(
      <Application applicationName="Altrone">
        <Screen title="Dashboard" />
      </Application>,
    );
    expect(document.title).toBe('Dashboard - Altrone');
  });

  test('falls back to just applicationName with no Screen.title', () => {
    render(
      <Application applicationName="Altrone">
        <Screen />
      </Application>,
    );
    expect(document.title).toBe('Altrone');
  });

  test('falls back to just the screen title with no applicationName', () => {
    render(
      <Application>
        <Screen title="Dashboard" />
      </Application>,
    );
    expect(document.title).toBe('Dashboard');
  });

  test('updates when Screen.title changes', () => {
    const { rerender } = render(
      <Application applicationName="Altrone">
        <Screen title="Dashboard" />
      </Application>,
    );
    expect(document.title).toBe('Dashboard - Altrone');

    rerender(
      <Application applicationName="Altrone">
        <Screen title="Settings" />
      </Application>,
    );
    expect(document.title).toBe('Settings - Altrone');
  });

  test('manageTitle={false} leaves document.title untouched', () => {
    document.title = 'Untouched';
    render(
      <Application applicationName="Altrone" manageTitle={false}>
        <Screen title="Dashboard" />
      </Application>,
    );
    expect(document.title).toBe('Untouched');
  });

  test('setPageTitle overrides the computed title; resetPageTitle reverts to it', () => {
    render(
      <Application applicationName="Altrone">
        <Screen title="Dashboard" />
      </Application>,
    );
    expect(document.title).toBe('Dashboard - Altrone');

    act(() => setPageTitle('Custom title'));
    expect(document.title).toBe('Custom title');

    act(() => resetPageTitle());
    expect(document.title).toBe('Dashboard - Altrone');
  });

  test('setPageTitle still applies when manageTitle is false', () => {
    render(
      <Application applicationName="Altrone" manageTitle={false}>
        <Screen title="Dashboard" />
      </Application>,
    );

    act(() => setPageTitle('Custom title'));
    expect(document.title).toBe('Custom title');
  });
});
