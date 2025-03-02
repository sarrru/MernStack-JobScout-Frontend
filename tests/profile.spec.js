import { test, expect } from '@playwright/test';

const BASE_URL = "http://localhost:5173"; // ✅ Ensure this matches your React dev server
let authToken; // ✅ Store authentication token globally

test.describe('Profile Page Tests', () => {

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

  // ✅ Step 2: Test Profile Page Rendering
  test.beforeEach(async ({ page }) => {
    console.log("🔹 Navigating to Profile Page...");
    
    // ✅ Set the auth token in localStorage before visiting the profile page
    await page.addInitScript((token) => {
      localStorage.setItem('authToken', token);
    }, authToken);

    await page.goto(`${BASE_URL}/profile`);
  });

  

  // ✅ Test: Ensure Applied Jobs Table Renders
  test('should display applied jobs table', async ({ page }) => {
    await expect(page.locator('h1.font-bold.text-lg')).toHaveText('Applied Jobs');
    await expect(page.locator('table')).toBeVisible(); // Ensure table exists
  });

});
