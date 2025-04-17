import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 5000,
});

// fetch all trips
export const fetchTrips = () => api.get('/trips');

// book a trip
export const bookTrip = (tripId, userId) => api.post(`/trips/${tripId}/book`, { userId });

// fetch user’s bookings
export const fetchBookings = (userId) => api.get(`/users/${userId}/bookings`);

// post a review
export const postReview = (tripId, userId, review) =>
  api.post(`/trips/${tripId}/reviews`, { userId, ...review });

export default api;
