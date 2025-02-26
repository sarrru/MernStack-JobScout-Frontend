import { test, expect } from '@playwright/test';

const BASE_URL = "http://localhost:5173"; // ✅ Ensure this matches your React frontend
let authToken, jobId;

test.describe('Job Description Page Tests', () => {

  // ✅ Step 1: Log in first to get a valid authentication token
  test.beforeAll(async ({ request }) => {
    console.log("🔹 Logging in to get authentication token...");

    const loginResponse = await request.post(`http://localhost:5000/api/v1/user/login`, {
      data: {
        email: "adarsha@gmail.com",  // ✅ Ensure this user exists in the database
        password: "Adarsha@123",     // ✅ Ensure correct password
        role: "student"              // ✅ Ensure correct role (Update if needed)
      }
    });

    const loginBody = await loginResponse.json();
    console.log("🔹 Login Response:", loginBody);

    if (loginResponse.status() !== 200 || !loginBody.token) {
      throw new Error("Login failed: No token received. Check credentials.");
    }

    authToken = loginBody.token; // ✅ Store token for later use
    console.log("✅ Authentication token received!");

    // ✅ Fetch a job ID dynamically to ensure it exists in the DB
    console.log("🔹 Fetching a job ID...");
    const jobsResponse = await request.get(`http://localhost:5000/api/v1/jobs`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });

    const jobsBody = await jobsResponse.json();
    if (jobsBody.success && jobsBody.jobs.length > 0) {
      jobId = jobsBody.jobs[0]._id;
      console.log(`✅ Job ID retrieved: ${jobId}`);
    } else {
      throw new Error("No jobs found in the database.");
    }
  });

  // ✅ Step 2: Navigate to Job Description Page
  test.beforeEach(async ({ page }) => {
    console.log("🔹 Navigating to Job Description Page...");

    await page.addInitScript((token) => {
      localStorage.setItem('authToken', token);
    }, authToken);

    await page.goto(`${BASE_URL}/description/${jobId}`);
  });

  // ✅ Test 1: Ensure Job Details are Displayed Correctly
  test('should display job details correctly', async ({ page }) => {
    console.log("🔹 Checking if job details are visible...");

    await expect(page.locator('h1.font-bold.text-xl')).toBeVisible(); // ✅ Ensure job title is visible
    await expect(page.locator('text=Job Description')).toBeVisible(); // ✅ Ensure job description section exists
    await expect(page.locator('text=Salary:')).toBeVisible(); // ✅ Ensure salary info is present
    await expect(page.locator('text=Experience:')).toBeVisible(); // ✅ Ensure experience is present
  });

  // ✅ Test 2: Ensure "Apply Now" Button Works
  test('should allow applying for the job if not already applied', async ({ page }) => {
    console.log("🔹 Checking 'Apply Now' button...");

    const applyButton = page.locator('button:text("Apply Now")');
    const alreadyApplied = await applyButton.isDisabled();

    if (!alreadyApplied) {
      await applyButton.click();
      await expect(page.locator('button:text("Already Applied")')).toBeVisible(); // ✅ Button should update
      console.log("✅ Successfully applied for the job!");
    } else {
      console.log("⚠️ Already applied, skipping apply test.");
    }
  });

  // ✅ Test 3: Ensure "Already Applied" Button is Disabled
  test('should disable "Apply Now" button if already applied', async ({ page }) => {
    console.log("🔹 Checking if 'Apply Now' button is disabled for applied jobs...");

    const applyButton = page.locator('button:text("Already Applied")');
    await expect(applyButton).toBeDisabled(); // ✅ Button should be disabled
  });

  // ✅ Test 4: Ensure Error Message Appears for Invalid Job ID
  test('should show error message for invalid job ID', async ({ page }) => {
    console.log("🔹 Navigating to an invalid job description...");

    await page.goto(`${BASE_URL}/description/invalidJobID123`);
    await expect(page.locator('text=Job not found')).toBeVisible(); // ✅ Ensure error message is shown
  });

});
