import { test, expect } from '@playwright/test';

const BASE_URL = "http://localhost:5173"; // ✅ Ensure this matches your React dev server
let authToken; // ✅ Store authentication token globally

test.describe('Latest Jobs Page Tests', () => {

  // ✅ Step 1: Log in first to get a valid authentication token
  test.beforeAll(async ({ request }) => {
    console.log("🔹 Logging in to get authentication token...");

    const loginResponse = await request.post(`http://localhost:5000/api/v1/user/login`, {
      data: {
        email: "adarsha@gmail.com",  
        password: "Adarsha@123",      
        role: "student"               
      }
    });

    const loginBody = await loginResponse.json();
    console.log("🔹 Login Response:", loginBody);

    if (loginResponse.status() !== 200 || !loginBody.token) {
      throw new Error("Login failed: No token received. Check credentials.");
    }

    authToken = loginBody.token; // ✅ Store token for later use
    console.log("✅ Authentication token received!");
  });

  // ✅ Step 2: Navigate to Latest Jobs Page
  test.beforeEach(async ({ page }) => {
    console.log("🔹 Navigating to Latest Jobs Page...");

    await page.addInitScript((token) => {
      localStorage.setItem('authToken', token);
    }, authToken);

    await page.goto(`${BASE_URL}/jobs`);
  });



  // ✅ Test : Ensure Jobs Are Displayed If Available
  test('should display job listings when jobs are available', async ({ page }) => {
    console.log("🔹 Checking if job listings are visible...");

    await page.waitForSelector('div.grid', { timeout: 10000 }); // ✅ Ensures job grid is loaded
    await expect(page.locator('div.grid')).toBeVisible(); 
  });

 

});
