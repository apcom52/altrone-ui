import React from 'react';
import { test, expect } from '@playwright/experimental-ct-react';
import { AltroneApplication, Button } from '../src/';

test.use({ viewport: { width: 500, height: 500 } });

test('Verify the text in React Page ', async ({ mount }) => {
  const component = await mount(
    <AltroneApplication>
      <Button label="test" />
    </AltroneApplication>,
  );
  await expect(component).toBeVisible();
});
