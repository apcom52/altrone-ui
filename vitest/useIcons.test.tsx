import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { Application } from '../src/components';
import { useIcons } from '../src/components/application';

const Probe = () => {
  const icons = useIcons();
  return (
    <>
      <div data-testid="prev">{icons.prev}</div>
      <div data-testid="next">{icons.next}</div>
    </>
  );
};

describe('useIcons', () => {
  test('resolves the default icon set without an Application ancestor', () => {
    render(<Probe />);
    expect(
      screen.getByTestId('prev').querySelector('svg.lucide-chevron-left'),
    ).not.toBeNull();
  });

  test('a full override on Application.icons replaces the default element', () => {
    render(
      <Application
        icons={{
          prev: <span data-testid="custom-prev" />,
          next: <span data-testid="custom-next" />,
        }}
      >
        <Probe />
      </Application>,
    );

    expect(screen.getByTestId('custom-prev')).not.toBeNull();
    expect(screen.getByTestId('custom-next')).not.toBeNull();
  });

  test('a partial override leaves the other roles at their default', () => {
    render(
      <Application icons={{ prev: <span data-testid="custom-prev" /> }}>
        <Probe />
      </Application>,
    );

    expect(screen.getByTestId('custom-prev')).not.toBeNull();
    expect(
      screen.getByTestId('next').querySelector('svg.lucide-chevron-right'),
    ).not.toBeNull();
  });
});
