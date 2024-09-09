import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
    },
    setupFiles: ['./loadEnvironment.js', './setup.ts'],
    testTransformMode: {
      web: ['.tsx'],
    },
  },
});