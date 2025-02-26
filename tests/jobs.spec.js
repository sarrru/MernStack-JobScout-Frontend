import { test, expect } from '@playwright/test';

const BASE_URL = "http://localhost:5173"; // ✅ Ensure correct frontend URL
const API_URL = "http://localhost:5000/api/v1"; // ✅ Ensure correct backend API URL
let authToken; // ✅ Store authentication token globally

test.describe('Jobs Page Tests', () => {

  // ✅ Step 1: Log in to get authentication token
  test.beforeAll(async ({ request }) => {
    console.log("🔹 Logging in to get authentication token...");

    const loginResponse = await request.post(`${API_URL}/user/login`, {
      data: {
        email: "adarsha@gmail.com",
        password: "Adarsha@123",
        role: "student"
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

  // ✅ Step 2: Test Jobs Page Rendering
  test.beforeEach(async ({ page }) => {
    console.log("🔹 Navigating to Jobs Page...");
    
    // ✅ Set the auth token in localStorage before visiting the jobs page
    await page.addInitScript((token) => {
      localStorage.setItem('authToken', token);
    }, authToken);

    await page.goto(`${BASE_URL}/jobs`);
    await page.waitForLoadState("domcontentloaded"); // ✅ Ensure the page fully loads before interaction
  });

  // ✅ Test 1: Ensure Jobs Page Loads & Displays Jobs
  test('should display job listings', async ({ page }) => {
    console.log("🔹 Checking if jobs are displayed...");

    await page.waitForTimeout(2000); // ✅ Wait before assertion (ensure React fully renders)
    await expect(page.locator('h1:text("Jobs")')).toBeVisible(); // ✅ Select "Jobs" heading explicitly
    await expect(page.locator('div.grid')).toBeVisible(); // ✅ Ensure job grid is visible
  });

//   //✅ Test 2: Ensure Job Filtering Works
//   test('should filter jobs when searched', async ({ page }) => {
//     console.log("🔹 Testing job filtering...");

//     const searchBox = page.locator('input[type="text"]'); 
//     await page.waitForSelector('input[type="text"]', { timeout: 15000 }); // ✅ Ensure search box exists

//     await searchBox.fill("Frontend Developer");
//     await page.keyboard.press("Enter"); // ✅ Simulate pressing enter
//     await page.waitForTimeout(2000); // ✅ Wait for filtering to apply

//     // ✅ Wait for filtered results
//     await expect(page.locator('text=Frontend Developer')).toBeVisible();
//     await expect(page.locator('text=Backend Developer')).toBeHidden(); // ✅ Backend job should be filtered out
//   });

//   // ✅ Test 3: Ensure "Job not found" Appears If No Match
//   test('should display "Job not found" if no jobs match the search query', async ({ page }) => {
//     console.log("🔹 Searching for a job that doesn't exist...");

//     const searchBox = page.locator('input[type="text"]');
//     await page.waitForSelector('input[type="text"]', { timeout: 15000 });

//     await searchBox.fill("Python Developer"); // ✅ Searching for a job that doesn't exist
//     await page.keyboard.press("Enter");

//     await page.waitForTimeout(2000); // ✅ Give time for UI to update

//     // ✅ Ensure "Job not found" message appears
//     await expect(page.locator('text=Job not found')).toBeVisible();
//   });

});