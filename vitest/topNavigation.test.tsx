import React from 'react';
import { expect, test, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AltroneApplication, TopNavigation } from '../src/components';

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

beforeAll(() => {
  // @ts-ignore
  window.ResizeObserver = ResizeObserver;
});

describe('TopNavigation', () => {
  test('TopNavigation has to apply custom className and id', () => {
    render(
      <TopNavigation
        data-testid="list"
        className="cls"
        style={{ color: 'red' }}
      >
        <TopNavigation.Logo
          data-testid="logo"
          className="cls"
          style={{ color: 'green' }}
        >
          <div>Logo</div>
        </TopNavigation.Logo>
        <TopNavigation.Group
          data-testid="group"
          title="Group title"
          className="group"
          style={{ color: 'rgb(0, 0, 255)' }}
        />
        <TopNavigation.Link
          href="#"
          label="Link label"
          data-testid="link"
          className="link"
          style={{ color: 'yellow' }}
        />
      </TopNavigation>,
    );

    expect(screen.getByTestId('list')).toHaveClass('cls');
    expect(screen.getByTestId('list')).toHaveStyle('color: rgb(255, 0, 0)');
    expect(screen.getByTestId('logo')).toHaveClass('cls');
    expect(screen.getByTestId('logo')).toHaveStyle('color: rgb(0, 128, 0)');
    expect(screen.getByTestId('group')).toHaveClass('group');
    expect(screen.getByTestId('group')).toHaveStyle('color: rgb(0, 0, 255)');
    expect(screen.getByTestId('link')).toHaveClass('link');
    expect(screen.getByTestId('link')).toHaveStyle('color: rgb(255, 255, 0)');
  });

  test('check that TopNavigation configuration works correctly', () => {
    render(
      <AltroneApplication
        config={{
          topNavigation: {
            className: 'cls',
            style: { color: 'rgb(0, 0, 255)' },
          },
        }}
      >
        <TopNavigation data-testid="list"></TopNavigation>
      </AltroneApplication>,
    );

    expect(screen.getByTestId('list')).toHaveClass('cls');
    expect(screen.getByTestId('list')).toHaveStyle('color: rgb(0, 0, 255)');
  });
});
