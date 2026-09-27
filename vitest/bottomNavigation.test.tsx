import React from 'react';
import { expect, test, describe, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { BottomNavigation } from '../src/components';

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

beforeAll(() => {
  // @ts-ignore
  window.ResizeObserver = ResizeObserver;
});

describe('BottomNavigation', () => {
  test('forwards className/style to the container and renders links as anchors', () => {
    render(
      <BottomNavigation
        data-testid="bar"
        className="cls"
        style={{ color: 'rgb(255, 0, 0)' }}
      >
        <BottomNavigation.Link
          data-testid="home"
          label="Home"
          icon={<span />}
        />
      </BottomNavigation>,
    );

    const bar = screen.getByTestId('bar');
    expect(bar).toHaveClass('cls');
    expect(bar).toHaveStyle('color: rgb(255, 0, 0)');
    expect(screen.getByTestId('home').tagName).toBe('A');
  });

  test('the selected link is marked with aria-current', () => {
    render(
      <BottomNavigation>
        <BottomNavigation.Link data-testid="home" label="Home" icon={<span />} />
        <BottomNavigation.Link
          data-testid="search"
          label="Search"
          icon={<span />}
          selected
        />
      </BottomNavigation>,
    );

    expect(screen.getByTestId('home')).not.toHaveAttribute('aria-current');
    expect(screen.getByTestId('search')).toHaveAttribute('aria-current', 'page');
  });

  test('renders the badge content', () => {
    render(
      <BottomNavigation>
        <BottomNavigation.Link
          label="Alerts"
          icon={<span />}
          badge="9+"
          data-testid="alerts"
        />
      </BottomNavigation>,
    );

    expect(screen.getByTestId('alerts')).toHaveTextContent('9+');
  });

  test('fires onClick when a link is activated', () => {
    const onClick = vi.fn();
    render(
      <BottomNavigation>
        <BottomNavigation.Link
          label="Home"
          icon={<span />}
          onClick={onClick}
          data-testid="home"
        />
      </BottomNavigation>,
    );

    fireEvent.click(screen.getByTestId('home'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('asChild merges the link onto a custom element with the icon/label inside', () => {
    render(
      <BottomNavigation>
        <BottomNavigation.Link asChild label="Home" icon={<span>ICON</span>}>
          <div data-testid="custom" />
        </BottomNavigation.Link>
      </BottomNavigation>,
    );

    const custom = screen.getByTestId('custom');
    expect(custom.tagName).toBe('DIV');
    expect(custom).toHaveTextContent('ICON');
    expect(custom).toHaveTextContent('Home');
  });

  test('renderFunc still overrides the rendered element', () => {
    render(
      <BottomNavigation>
        <BottomNavigation.Link
          label="Home"
          icon={<span />}
          renderFunc={(ref, props) => (
            <button
              ref={ref as React.Ref<HTMLButtonElement>}
              className={props.className}
              data-testid="rf"
            >
              {props.label}
            </button>
          )}
        />
      </BottomNavigation>,
    );

    expect(screen.getByTestId('rf').tagName).toBe('BUTTON');
  });
});
