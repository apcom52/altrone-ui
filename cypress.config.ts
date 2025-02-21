import { defineConfig } from 'cypress';
import { configureVisualRegression } from 'cypress-visual-regression';

export default defineConfig({
  env: {
    type: 'regression',
    visualRegressionType: 'regression',
    visualRegressionBaseDirectory: './cypress/snapshots/base',
    visualRegressionDiffDirectory: './cypress/snapshots/diff',
    visualRegressionActualDirectory: './cypress/snapshots/actual',
  },
  component: {
    env: {
      visualRegressionType: 'regression',
      visualRegressionBaseDirectory: './cypress/snapshots/base',
      visualRegressionDiffDirectory: './cypress/snapshots/diff',
      visualRegressionActualDirectory: './cypress/snapshots/actual',
      visualRegressionGenerateDiff: 'always',
      visualRegressionFailSilently: true,
    },
    devServer: {
      framework: 'react',
      bundler: 'vite',
    },
    setupNodeEvents(on, config) {
      configureVisualRegression(on);
    },
  },
  e2e: {
    env: {
      visualRegressionType: 'regression',
    },
    screenshotsFolder: './cypress/snapshots/actual',
    setupNodeEvents(on, config) {
      configureVisualRegression(on);
    },
  },
});
