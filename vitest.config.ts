import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineConfig } from 'vitest/config';
import storybookTest from '@storybook/addon-vitest/vitest-plugin';
import type { PluginOption } from 'vite';

const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    projects: [
      {
        extends: true,
        plugins: [storybookTest() as unknown as PluginOption],
        test: {
          name: 'storybook',
          browser: {
            enabled: true,
            headless: true,
            provider: 'playwright',
            instances: [{ browser: 'chromium' }],
          },
          // setupFiles는 경로가 vitest 기준 루트!
          setupFiles: [path.join(dirname, '.storybook/vitest.setup.ts')],
        },
      },
    ],
  },
});
