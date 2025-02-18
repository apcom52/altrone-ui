import React from 'react';
import { expect, test, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AltroneApplication, Tags } from '../src/components';

class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

beforeAll(() => {
  // @ts-ignore
  window.ResizeObserver = ResizeObserver;
});

describe('Tags', () => {
  test('Tags has to apply custom className and id', () => {
    render(
      <Tags
        data-testid="tags"
        className="cls"
        style={{ color: 'rgb(255, 0, 0)' }}
      >
        <Tags.Item
          data-testid="tagsItem"
          label="Test"
          className="cls1"
          style={{ color: 'rgb(255, 255, 0)' }}
        />
      </Tags>,
    );

    expect(screen.getByTestId('tags')).toHaveClass('cls');
    expect(screen.getByTestId('tags')).toHaveStyle('color: rgb(255, 0, 0)');
    expect(screen.getByTestId('tagsItem')).toHaveClass('cls1');
    expect(screen.getByTestId('tagsItem')).toHaveStyle(
      'color: rgb(255, 255, 0)',
    );
  });

  test('check that Tags configuration works correctly', () => {
    render(
      <AltroneApplication
        config={{
          tags: {
            className: 'cls',
            style: { color: 'rgb(0, 0, 255)' },
          },
        }}
      >
        <Tags data-testid="tags">
          <Tags.Item data-testid="tagsItem" label="Test" />
        </Tags>
      </AltroneApplication>,
    );

    expect(screen.getByTestId('tags')).toHaveClass('cls');
    expect(screen.getByTestId('tags')).toHaveStyle('color: rgb(0, 0, 255)');
  });
});
