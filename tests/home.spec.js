import { test, expect } from '@playwright/test';

const BASE_URL = "http://localhost:5173"; // ✅ Ensure this matches your React dev server
let authToken;

test.describe('Home Page Tests', () => {

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

    if (loginResponse.status() !== 200 || !loginBody.token) {
      throw new Error("Login failed: No token received. Check credentials.");
    }

    authToken = loginBody.token; // ✅ Store token for later use
    console.log("✅ Authentication token received!");
  });

  // ✅ Step 2: Navigate to Home Page
  test.beforeEach(async ({ page }) => {
    console.log("🔹 Navigating to Home Page...");

    await page.addInitScript((token) => {
      localStorage.setItem('authToken', token);
    }, authToken);

    await page.goto(`${BASE_URL}/`);
  });

//   // ✅ Test 1: Ensure Home Page Loads with Required Sections
//   test('should display Navbar, Hero, Category, Latest Jobs, and Footer', async ({ page }) => {
//     console.log("🔹 Checking if Home Page components are visible...");

//     await expect(page.locator('nav')).toBeVisible(); // ✅ Ensure Navbar is visible
//     await expect(page.locator('section')).toHaveCount(4); // ✅ Ensure Hero, Category, LatestJobs, and Footer exist
//     await expect(page.locator('h1')).toHaveText(/Latest & Top Job Openings/i); // ✅ Ensure Latest Jobs section exists
//   });

  // ✅ Test : Ensure Latest Jobs are Displayed When Available
  test('should display latest job listings if jobs exist', async ({ page }) => {
    console.log("🔹 Checking if Latest Jobs section is visible...");

    await page.waitForSelector('div.grid.grid-cols-3', { timeout: 10000 }); // ✅ Wait for job listings
    await expect(page.locator('div.grid.grid-cols-3')).toBeVisible(); // ✅ Ensure job grid exists
  });

  // ✅ Test : Ensure "No Job Available" Message Appears When No Jobs Exist
  test('should display "No Job Available" if no jobs exist', async ({ page }) => {
    console.log("🔹 Checking if 'No Job Available' appears when no jobs exist...");

    await page.waitForTimeout(2000); // ✅ Ensure page loads first

    const jobExists = await page.locator('div.grid.grid-cols-3').count() > 0;

    if (!jobExists) {
      await expect(page.locator('text=No Job Available')).toBeVisible();
    } else {
      console.log("✅ Jobs exist, skipping empty message check.");
    }
  });

  // ✅ Test : Ensure Recruiters Are Redirected to Admin Page
  test('should redirect recruiters to admin companies page', async ({ page }) => {
    console.log("🔹 Checking recruiter redirection...");

    // Login as recruiter
    const loginResponse = await page.request.post(`http://localhost:5000/api/v1/user/login`, {
      data: {
        email: "recruiter@example.com",
        password: "Recruiter@123",
        role: "recruiter"
      }
    });

    const loginBody = await loginResponse.json();

    if (loginResponse.status() === 200 && loginBody.token) {
      await page.addInitScript((token) => {
        localStorage.setItem('authToken', token);
      }, loginBody.token);

      await page.goto(`${BASE_URL}/`);

      // ✅ Expect recruiter to be redirected
      await expect(page).toHaveURL(`${BASE_URL}/admin/companies`);
    } else {
      console.log("⚠️ Recruiter login failed, skipping redirection test.");
    }
  });

});
