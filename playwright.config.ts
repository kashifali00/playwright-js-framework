import type { PlaywrightTestConfig } from '@playwright/test';


const config: PlaywrightTestConfig = {
  testDir: './tests',
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
  
    timeout: 5000
  },

  reporter: [
    ['html', {open:'never'}],
    ['list'],
    ['junit', { outputFile: 'results.xml' }],
    ['json', {  outputFile: 'test-results.json' }]
  ],


  projects: [
    {
      name: "e2e",
      use:{
        browserName : 'chromium',
        headless: true,
        screenshot : 'only-on-failure',
        trace: 'retain-on-failure',
        baseURL:"https://sec.penguinin.com:9090",
        launchOptions: {
          slowMo:50
        }

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
