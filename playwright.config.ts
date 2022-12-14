import type { PlaywrightTestConfig } from '@playwright/test';
import { devices } from '@playwright/test';

const config: PlaywrightTestConfig = {
  testDir: './tests',
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
  
    timeout: 5000
  },

  reporter: 'html',

  projects: [
    {
      name: "chromiumbrowser",
      use:{
        browserName : 'chromium',
        headless: false,
        screenshot : 'only-on-failure',
        trace: 'retain-on-failure'

      }
    },
    {
      name: "firefoxbrowser",
      use:{
        browserName : 'firefox',
        headless: true,
        screenshot : 'only-on-failure',
        trace: 'retain-on-failure'

      }
      
    }
  ]
 
};

export default config;
