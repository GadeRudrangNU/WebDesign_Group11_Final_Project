// Correct imports according to actual filenames
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/login';             // ✅ corrected
import Profile from './pages/profile';         // ✅ corrected
import Unauthorized from './pages/Unauthorized';
import Home from './components/Home';
import TripList from './components/TripList';
import TripDetail from './components/TripDetail';
import PaymentPage from './pages/Paymentpage'; // ✅ corrected
import BookingSuccess from './pages/BookingSuccess';
// Commented these because files were missing
// import CoordinatorDashboard from './components/CoordinatorDashboard';
// import AdminPage from './components/AdminPage';

export default function App() {
  return (
    <Routes>
      {/* Default route */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Protected Routes */}

      {/* Traveler Routes */}
      <Route
        path="/home"
        element={
          <ProtectedRoute allowedRoles={['Traveler']}>
            <Home />
          </ProtectedRoute>
        }
      />
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

      {/* Trip Coordinator Routes */}
      {/* Commented out since file missing */}
      {/* 
      <Route
        path="/coordinator"
        element={
          <ProtectedRoute allowedRoles={['TripCoordinator']}>
            <CoordinatorDashboard />
          </ProtectedRoute>
        }
      />
      */}

      {/* Admin Routes */}
      {/* Commented out since file missing */}
      {/* 
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={['Admin']}>
            <AdminPage />
          </ProtectedRoute>
        }
      />
      */}

      {/* Catch-all (unknown routes) */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
