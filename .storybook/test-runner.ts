import type { TestRunnerConfig } from '@storybook/test-runner';
import { expect } from '@playwright/test';

const config: TestRunnerConfig = {
  async postVisit(page, context) {
    // the #storybook-root element wraps the story. In Storybook 6.x, the selector is #root
    const elementHandler = await page.$('#storybook-root');
  },
};

export default config;
