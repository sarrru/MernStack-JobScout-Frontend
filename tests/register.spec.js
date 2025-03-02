import { test, expect } from '@playwright/test';
const BASE_URL = "http://localhost:5000/api/v1";

test.describe('API Register Endpoint', () => {
  
  test('should register a new user successfully', async ({ request }) => {
    const formData = new FormData();
    formData.append("fullname", "Test User");
    formData.append("email", `testuser${Date.now()}@example.com`);
    formData.append("phoneNumber", "9863234579");
    formData.append("password", "Password@123");
    formData.append("role", "student");

    // If your API requires a file, add a dummy file
    const filePath = "D:/ST6003CEM Web API Development/backend/public/sample.jpg"; // Update with a real file path
    formData.append("profilePhoto", { name: "sample.jpg", mimeType: "image/jpeg", buffer: Buffer.from("dummy-content") });

    const response = await request.post(`${BASE_URL}/user/register`, {
        multipart: formData  // ✅ Ensures the request is sent as multipart/form-data
    });

    let responseBody;
    try {
        responseBody = await response.json();
    } catch (error) {
        console.error("❌ Failed to parse JSON:", error);
        console.log("📌 Raw Response:", await response.text());
        throw error;
    }

    console.log('✅ Response:', responseBody);

    expect([200, 201]).toContain(response.status());
    expect(responseBody).toHaveProperty("success", true);
    expect(responseBody).toHaveProperty("message", "Account created successfully.");
});




  // ✅ Test for error when required fields are missing
  test('should return an error when required fields are missing', async ({ request }) => {
    const response = await request.post('http://localhost:5000/api/v1/user/register', {
      data: {
        fullname: 'Test User',
        password: 'Password@123',
        role: 'student'
      }
    });

    const responseBody = await response.json();
    console.log('Error Response:', responseBody);

    expect(response.status()).toBe(400);
    expect(responseBody).toHaveProperty('message', 'All fields are required.');
  });

  // ✅ Test for strong password validation
  test('should register a user successfully with a strong password', async ({ request }) => {
    const email = `secureuser${Date.now()}@example.com`; // Unique email for each test
    const password = 'SecureP@ssword123!'; // Strong password

    const response = await request.post('http://localhost:5000/api/v1/user/register', {
      data: {
        fullname: 'Secure User',
        email: email,
        phoneNumber: '9856432101',
        password: password,
        role: 'recruiter'
      }
    });

    const responseBody = await response.json();
    console.log('Response:', responseBody); 
    console.log('Status Code:', response.status()); 

    // ✅ Accepts both 200 and 201
    expect([200, 201]).toContain(response.status());

    // ✅ Ensure response contains necessary properties
    expect(responseBody).toHaveProperty('success', true);
    expect(responseBody).toHaveProperty('message', 'Account created successfully.');
  });

  // ✅ Test for duplicate email registration
  test('should return an error for duplicate email', async ({ request }) => {
    const email = `duplicateuser@example.com`; // Fixed email to test duplicate case

    // First registration should pass
    await request.post('http://localhost:5000/api/v1/user/register', {
      data: {
        fullname: 'Adarsha',
        email: email,
        phoneNumber: '9856432101',
        password: 'Adarsha@123',
        role: 'student'
      }
    });

    // Second registration with same email should fail
    const response = await request.post('http://localhost:5000/api/v1/user/register', {
      data: {
        fullname: 'Duplicate User',
        email: email,
        phoneNumber: '9856432101',
        password: 'Password@123',
        role: 'student'
      }
    });

    const responseBody = await response.json();
    console.log('Duplicate Email Error Response:', responseBody);

    expect(response.status()).toBe(400);
    expect(responseBody).toHaveProperty('message', 'User already exists with this email.');

  });

});
