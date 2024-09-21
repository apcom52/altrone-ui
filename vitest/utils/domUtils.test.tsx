import { DOMUtils } from '../../src';
import { Fragment } from 'react';

describe('DomUtils', () => {
  test('isFragment', async () => {
    expect(DOMUtils.isFragment(<Fragment />)).toBe(true);
    expect(DOMUtils.isFragment(<div />)).toBe(false);
    expect(DOMUtils.isFragment(null)).toBe(false);
  });
});
