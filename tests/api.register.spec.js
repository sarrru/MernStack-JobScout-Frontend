import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:5000/api/v1';

test.describe('API Authentication & User Endpoints', () => {

  let authToken = null; // Will store JWT token after login
  let userId = null; // Will store user ID after registration

  // 2️⃣ Test User Login
  test('should log in a user successfully', async ({ request }) => {
    const loginResponse = await request.post(`${BASE_URL}/user/login`, {
      data: {
        email: "iris@gmail.com",
        password: "iris123@",
        role: "student" // Ensure role matches the registered user
      }
    });

    const responseBody = await loginResponse.json();
    console.log('Login Response:', responseBody);
    console.log('Status Code:', loginResponse.status());

    expect(loginResponse.status()).toBe(200);
    expect(responseBody).toHaveProperty('user');
    expect(responseBody).toHaveProperty('message', `Welcome back ${responseBody.user.fullname}`);
    expect(responseBody).toHaveProperty('success', true);
    
    authToken = responseBody.token; // Store token for authenticated requests
    userId = responseBody.user._id; // Store user ID for future tests
  });

  // test('should update user profile', async ({ request }) => {
  //   console.log("🔹 Sending profile update request...");

  //   const updateResponse = await request.post(`${BASE_URL}/user/profile/update`, {
  //     headers: {
  //       Authorization: `Bearer ${authToken}`,  // ✅ Ensure token is included
  //       "Content-Type": "application/json"     // ✅ Ensure correct content type
  //     },
  //     data: {
  //       fullname: "Adarsha",
  //       bio: "Developer",
  //       skills: "HTML CSS JavaScript"
  //     }
  //   });

  //   const responseBody = await updateResponse.json();
  //   console.log("🔹 Update Response:", responseBody);
  //   console.log("🔹 Status Code:", updateResponse.status());

  //   // ✅ Assertions to verify successful profile update
  //   expect(updateResponse.status()).toBe(200);
  //   expect(responseBody).toHaveProperty('message', "Profile updated successfully.");
  //   expect(responseBody).toHaveProperty('success', true);
  // });




  // 4️⃣ Test Logout
  test('should log out the user', async ({ request }) => {
    const logoutResponse = await request.get(`${BASE_URL}/user/logout`, {
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    });

    const responseBody = await logoutResponse.json();
    console.log('Logout Response:', responseBody);
    console.log('Status Code:', logoutResponse.status());

    expect(logoutResponse.status()).toBe(200);
    expect(responseBody).toHaveProperty('message', "Logged out successfully.");
    expect(responseBody).toHaveProperty('success', true);
  });

});
