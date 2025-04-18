// src/App.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Login from './pages/login';
import Home from './components/Home';
import Profile from './pages/profile';
import CoordinatorDashboard from './pages/CoordinatorDashboard';
import GuideDashboard from './pages/guideDashboard';
import TripList from './components/TripList';
import TripDetail from './components/TripDetail';
import Unauthorized from './pages/Unauthorized';
import ProtectedRoute from './components/ProtectedRoute';
import ManageTrips from './pages/ManageTrips';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Traveler Home */}
      <Route
        path="/home"
        element={
          <ProtectedRoute allowedRoles={['Traveler']}>
            <Home />
          </ProtectedRoute>
        }
      />

      {/* Coordinator Dashboard */}
      <Route
        path="/coordinator/manage-trips"
        element={
          <ProtectedRoute allowedRoles={['TripCoordinator']}>
            <ManageTrips /> {/* Make sure this component exists */}
          </ProtectedRoute>
        }
      />

      {/* Certified Space Guide Dashboard */}
      <Route
        path="/guide"
        element={
          <ProtectedRoute allowedRoles={['CertifiedSpaceGuide']}>
            <GuideDashboard />
          </ProtectedRoute>
        }
      />

      {/* Traveler Trips */}
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

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/login" replace />} />

      <Route
  path="/coordinator/trips"
  element={
    <ProtectedRoute allowedRoles={['TripCoordinator']}>
      <ManageTrips />
    </ProtectedRoute>
      }
    />

      <Route
        path="/coordinator"
        element={
          <ProtectedRoute allowedRoles={['TripCoordinator']}>
            <CoordinatorDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}