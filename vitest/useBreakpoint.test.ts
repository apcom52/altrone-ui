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

  test('reports false on the first render even when the viewport matches', () => {
    vi.spyOn(window, 'matchMedia').mockImplementation(
      (query) =>
        ({
          matches: true,
          media: query,
          addEventListener: vi.fn(),
          removeEventListener: vi.fn(),
        }) as unknown as MediaQueryList,
    );

    const seen: boolean[] = [];
    renderHook(() => {
      const value = useBreakpoint();
      seen.push(value.isMd);
      return value;
    });
    expect(seen[0]).toBe(false);
    expect(seen[seen.length - 1]).toBe(true);
  });
});
