import '@testing-library/jest-dom';
import { vi, expect } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';
import type { TestingLibraryMatchers } from '@testing-library/jest-dom/matchers';

expect.extend(matchers as any);

declare module 'vitest' {
  interface Assertion<T = any> extends TestingLibraryMatchers<T, void> {}
}

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

vi.mock('*.scss', () => ({}));

vi.stubGlobal('__TEST_ENV__', 'true');
