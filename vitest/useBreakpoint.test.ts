import { expect, test, describe, vi, afterEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useBreakpoint } from '../src/utils';

describe('useBreakpoint', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('reports a breakpoint as matched when the viewport is at least that wide', () => {
    vi.spyOn(window, 'matchMedia').mockImplementation(
      (query) =>
        ({
          matches: query.includes('768px'),
          media: query,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
        }) as unknown as MediaQueryList,
    );

    const { result } = renderHook(() => useBreakpoint());
    expect(result.current.isSm).toBe(true);
    expect(result.current.isMd).toBe(false);
  });
});
