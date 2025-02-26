import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  expect: { timeout: 5000 },
  use: {
    headless: true,  // Run tests in headless mode
    baseURL: 'http://localhost:5173',  // Ensure this matches your frontend
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});
