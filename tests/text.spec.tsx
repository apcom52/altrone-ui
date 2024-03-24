import { test, expect } from '@playwright/experimental-ct-react';
import { Text } from '../src/components/text/Text';

test('ScreenName component', async ({ mount }) => {
  const component = await mount(
    <Text.ScreenName className="customClassName" id="test-id">
      ScreenName component
    </Text.ScreenName>,
  );

  expect(component).toContainText('ScreenName component');
  expect(component).toHaveClass('customClassName');
  expect(component).toHaveId('test-id');
  expect(component.evaluate((e) => e.tagName)).toBe('H1');
});
