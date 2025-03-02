import { test, expect } from '@playwright/test';

const BASE_URL = "http://localhost:5173"; // ✅ Ensure this matches your React dev server
let authToken; // ✅ Store authentication token globally

test.describe('Browse Page Tests', () => {

  // ✅ Step 1: Log in first to get a valid authentication token
  test.beforeAll(async ({ request }) => {
    console.log("🔹 Logging in to get authentication token...");

    const loginResponse = await request.post(`http://localhost:5000/api/v1/user/login`, {
      data: {
        email: "iris@gmail.com",  // ✅ Ensure this user exists in the database
        password: "iris123@",       // ✅ Ensure correct password
        role: "student"                 // ✅ Ensure correct role (Update if needed)
      }
    });

    const loginBody = await loginResponse.json();
    console.log("🔹 Login Response:", loginBody);

    // ✅ Ensure login succeeded and token is received
    if (loginResponse.status() !== 200 || !loginBody.token) {
      throw new Error("Login failed: No token received. Check credentials.");
    }

    authToken = loginBody.token; // ✅ Store token for later use
    console.log("✅ Authentication token received!");
  });

  // ✅ Step 2: Test Browse Page Rendering
  test.beforeEach(async ({ page }) => {
    console.log("🔹 Navigating to Browse Page...");
    
    // ✅ Set the auth token in localStorage before visiting the browse page
    await page.addInitScript((token) => {
      localStorage.setItem('authToken', token);
    }, authToken);

    await page.goto(`${BASE_URL}/browse`);
  });

  // ✅ Test: Ensure Browse Page Loads & Displays Job Listings
  test('should display job listings', async ({ page }) => {
    console.log("🔹 Checking if jobs are displayed...");
    await expect(page.locator('h1.font-bold.text-xl')).toHaveText(/Search Results/i); // ✅ Check for search results heading
    await expect(page.locator('div.grid.grid-cols-3')).toBeVisible(); // ✅ Ensure job grid is visible
  });

 
});
