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
  const res = await fetch(`${API_BASE_URL}/users/admin/users`, {
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
