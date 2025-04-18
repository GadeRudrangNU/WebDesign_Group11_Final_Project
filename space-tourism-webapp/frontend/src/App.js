// src/App.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Home from './components/Home';
import Profile from './pages/profile';
import CoordinatorDashboard from './pages/CoordinatorDashboard';
import TripList from './components/TripList'
import TripDetail from './components/TripDetail'
import ProtectedRoute from './components/ProtectedRoute';
import Unauthorized from './pages/Unauthorized';
import AdminPage from './pages/AdminPage';
import PaymentPage from './pages/PaymentPage';
import BookingSuccess from './pages/BookingSuccess'
import CreateUser from './pages/CreateUser'
import CreateTrip from './pages/CreateTrip';
import GuideDashboard from './pages/guideDashboard';

// …import any other role‑based pages here…

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/unauthorized" element={<Unauthorized />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute allowedRoles={['Traveler']}>
            <Home />
          </ProtectedRoute>
        }
      />
      {/* Coordinator Dashboard (TripCoordinators only) */}

      <Route
        path="/coordinator"
        element={
          <ProtectedRoute allowedRoles={['TripCoordinator']}>
            <CoordinatorDashboard />
          </ProtectedRoute>
        }
      />
      {/* only logged‑in Travelers */}
      <Route
        path="/trips"
        element={
          <ProtectedRoute allowedRoles={['Traveler']}>
            <TripList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/trips/:slug"
        element={
          <ProtectedRoute allowedRoles={['Traveler']}>
            <TripDetail />
          </ProtectedRoute>
        }
      />
      <Route
        path="/payment"
        element={
          <ProtectedRoute allowedRoles={['Traveler']}>
            <PaymentPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/guide"
        element={
          <ProtectedRoute allowedRoles={['CertifiedSpaceGuide']}>
            <GuideDashboard />
          </ProtectedRoute>
        }
      />


      {/* 👉 Added new dynamic Payment Route for Stripe Checkout */}
      <Route
        path="/payment/:tripId"
        element={
          <ProtectedRoute allowedRoles={['Traveler']}>
            <PaymentPage />
          </ProtectedRoute>
        }
      />
      {/* ✅ Added without changing any existing code */}

      <Route
        path="/booking-success"
        element={
          <ProtectedRoute allowedRoles={['Traveler']}>
            <BookingSuccess />
          </ProtectedRoute>
        }
      />
      {/* Admin Dashboard (Admins only) */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['Admin']}>
            <AdminPage />
          </ProtectedRoute>
        }
      />
      {/* Create User page */}
      <Route
        path="/admin/users/create"
        element={
          <ProtectedRoute allowedRoles={['Admin']}>
            <CreateUser />
          </ProtectedRoute>
        }
      />
      {/* ← NEW: Create Trips page */}
      <Route
        path="/admin/trips/create"
        element={
          <ProtectedRoute allowedRoles={['Admin']}>
            <CreateTrip />
          </ProtectedRoute>
        }
      />
      {/* e.g. <Route path="/admin" element={<Admin />} /> */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}