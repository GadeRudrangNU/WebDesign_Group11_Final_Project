// frontend/src/services/apiService.js

const API_BASE_URL = "http://localhost:5000/api"; // Update if your backend is hosted elsewhere

// Function to register a user
export async function registerUser(userData) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    return await response.json();
  } catch (error) {
    console.error("Error registering user:", error);
    throw error;
  }
}

// Function to log in a user
export async function loginUser(credentials) {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    return await response.json();
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
}

// Function to get a protected profile route using a JWT token
export async function getProfile(token) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
}
