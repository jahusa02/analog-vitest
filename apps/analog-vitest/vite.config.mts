/// <reference types="vitest" />

import { defineConfig } from 'vite';

import angular from '@analogjs/vite-plugin-angular';


// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    root: __dirname,
    cacheDir: '../../node_modules/.vite/apps/analog-vitest',
    plugins: [angular()],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['src/test-setup.ts'],
      include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
      reporters: ['default', ['junit', { suiteName: 'analog-vitest' }]],
      outputFile: {
        junit: '../../test-reports/apps/analog-vitest/test-report.xml',
      },
      coverage: {
        enabled: true,
        reportsDirectory: '../../coverage/apps/analog-vitest',
        reporter: ['text', 'lcov'],
        provider: 'istanbul',
      },
      fakeTimers: {
        now: 1588550400000,
        toFake: ['Date'],
      },
    },
    define: {
      'import.meta.vitest': mode !== 'production',
    },
  };
});
