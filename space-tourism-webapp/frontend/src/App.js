// src/App.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login   from './pages/login';
import Home    from './components/Home';
import Profile from './pages/profile';
import TripList    from './components/TripList'
  import TripDetail  from './components/TripDetail'
// …import any other role‑based pages here…

export default function App() {
  return (
    <Routes>
      <Route path="/"        element={<Navigate to="/login" replace />} />
      <Route path="/login"   element={<Login />} />
      <Route path="/home"    element={<Home  />} />
      <Route path="/profile" element={<Profile />} />
       {/* Trips: list and detail */}
       <Route path="/trips"       element={<TripList />} />
      <Route path="/trips/:slug" element={<TripDetail />} />
      {/* e.g. <Route path="/admin" element={<Admin />} /> */}
      <Route path="*"        element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
