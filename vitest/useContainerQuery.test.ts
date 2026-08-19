import { expect, test, describe } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useRef } from 'react';
import { useElementSize, useContainerQuery } from '../src/utils';

describe('useElementSize', () => {
  test('reports zero size before the element is measured (SSR-safe default)', () => {
    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(null);
      return useElementSize(ref);
    });

    expect(result.current).toEqual({ width: 0, height: 0 });
  });
});

describe('useContainerQuery', () => {
  test('does not match when the element has not been measured yet', () => {
    const { result } = renderHook(() => {
      const ref = useRef<HTMLDivElement>(null);
      return useContainerQuery(ref, { minWidth: 0 });
    });

    expect(result.current).toBe(false);
  });
});
