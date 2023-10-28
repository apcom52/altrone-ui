export const TEST_MATCH_MEDIA_FN = () =>
  ({
    matches: [],
    addListener: jest.fn(),
    removeListener: jest.fn()
  } as unknown as MediaQueryList);
