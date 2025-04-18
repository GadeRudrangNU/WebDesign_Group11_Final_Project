// frontend/src/services/apiService.js
 
const API_BASE_URL = "http://localhost:5000/api"; // adjust if your backend URL is different
 
// ─────────────────────────────────────────────────────────────
// Token helper
// ─────────────────────────────────────────────────────────────
 
/**
 * Simple JWT getter from localStorage.
 * Call this in all protected requests.
 */
export function getToken() {
  return localStorage.getItem("token");
}
 
// ─────────────────────────────────────────────────────────────
// AUTH
// ─────────────────────────────────────────────────────────────
 
/**
 * Register a new user
 * POST /api/auth/register
 */
export async function registerUser(userData) {
  const res = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });
  if (!res.ok) throw new Error(`Register failed: ${res.status}`);
  return res.json();
}
 
/**
 * Log in an existing user
 * POST /api/auth/login
 * On success, save the token to localStorage yourself:
 *   const { token } = await loginUser(...)
 *   localStorage.setItem("token", token);
 */
export async function loginUser(credentials) {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });
  if (!res.ok) throw new Error(`Login failed: ${res.status}`);
  return res.json();
}
 
/**
 * Fetch the logged‑in user’s profile
 * GET /api/users/profile
 */
export async function getProfile(token = getToken()) {
  const res = await fetch(`${API_BASE_URL}/users/profile`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error(`Fetch profile failed: ${res.status}`);
  return res.json();
}
 
// ─────────────────────────────────────────────────────────────
// TRIPS & BOOKINGS
// ─────────────────────────────────────────────────────────────
 
/**
 * Fetch all available trips
 * GET /api/trips
 */
export async function fetchTrips() {
  const res = await fetch(`${API_BASE_URL}/trips`);
  if (!res.ok) throw new Error(`Fetch trips failed: ${res.status}`);
  return res.json();
}
 
/**
 * Fetch details for a single trip by its slug
 * GET /api/trips/:slug
 */
export async function fetchTrip(slug) {
  const res = await fetch(`${API_BASE_URL}/trips/${slug}`);
  if (!res.ok) throw new Error(`Fetch trip '${slug}' failed: ${res.status}`);
  return res.json();
}
 
/**
 * Book a trip (must be logged in)
 * POST /api/bookings
 */
export async function bookTrip(tripId, passengers = 1) {
  const token = getToken();
  const res = await fetch(`${API_BASE_URL}/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ tripId, passengers }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || `Booking failed: ${res.status}`);
  }
  return res.json();
}
//admin
export async function fetchAllUsers(token = getToken()) {
  const res = await fetch(`${API_BASE_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error(`Fetch users failed: ${res.status}`);
  return res.json();
}
 
/**
 * Fetch all bookings for the current user
 * GET /api/bookings
 */
export async function fetchMyBookings() {
  const token = getToken();
  const res = await fetch(`${API_BASE_URL}/bookings`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error(`Fetch bookings failed: ${res.status}`);
  return res.json();
}
 
/**
 * Post a review for a trip
 * POST /api/trips/:tripId/reviews
 */
export async function postReview(tripId, reviewData) {
  const token = getToken();
  const res = await fetch(`${API_BASE_URL}/trips/${tripId}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(reviewData),
  });
  if (!res.ok) throw new Error(`Post review failed: ${res.status}`);
  return res.json();
}
/**
 * Update a user by ID (Admin only)
 * PUT /api/users/admin/users/:id
 */
export async function updateUser(id, data, token = getToken()) {
  const res = await fetch(`${API_BASE_URL}/users/admin/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Update user failed: ${res.status}`);
  return res.json();
}
 
/**
 * Delete a user by ID (Admin only)
 * DELETE /api/users/admin/users/:id
 */
export async function deleteUser(id, token = getToken()) {
  const res = await fetch(`${API_BASE_URL}/users/admin/users/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Delete user failed: ${res.status}`);
  return res.json();
}
/**
 * Create a new user (Admin only)
 * POST /api/users/admin/users
 */
export async function createUser(userData, token = getToken()) {
  const res = await fetch(`${API_BASE_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });
  if (!res.ok) throw new Error(`Create user failed: ${res.status}`);
  return res.json();
}
// ─────────────────────────────────────────────────────────────
// ADMIN – TRIPS (NEW)
// ─────────────────────────────────────────────────────────────
 
/**
 * Create a new trip (Admin only)
 * POST /api/trips
 */
export async function createTrip(tripData, token = getToken()) {
  const res = await fetch(`${API_BASE_URL}/trips`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(tripData),
  });
  if (!res.ok) throw new Error(`Create trip failed: ${res.status}`);
  return res.json();
}
 
/**
 * Update an existing trip (Admin only)
 * PUT /api/trips/:id
 * (Make sure you have a matching backend route.)
 */
export async function updateTrip(id, tripData, token = getToken()) {
  const res = await fetch(`${API_BASE_URL}/trips/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(tripData),
  });
  if (!res.ok) throw new Error(`Update trip failed: ${res.status}`);
  return res.json();
}
 
/**
 * Delete a trip (Admin only)
 * DELETE /api/trips/:id
 * (Make sure you have a matching backend route.)
 */
export async function deleteTrip(id, token = getToken()) {
  const res = await fetch(`${API_BASE_URL}/trips/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) throw new Error(`Delete trip failed: ${res.status}`);
  return res.json();
}