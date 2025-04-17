// src/App.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/login';
import Home from './components/Home';
import Profile from './pages/profile';
import GuideDashboard from './pages/guideDashboard';
import ProtectedRoute from './components/ProtectedRoute';
// …import any other role‑based pages here…

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      {/* e.g. <Route path="/admin" element={<Admin />} /> */}
      <Route path="*" element={<Navigate to="/login" replace />} />
      <Route path="/guide" element={<ProtectedRoute allowedRoles={['CertifiedSpaceGuide']}><GuideDashboard /></ProtectedRoute>} />
    </Routes>
  );
}
