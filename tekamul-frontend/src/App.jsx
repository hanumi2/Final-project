import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import ClientDashboard from './pages/ClientDashboard';
import ManagerDashboard from './pages/ManagerDashboard';
import ArchitectDashboard from './pages/ArchitectDashboard';
import EngineerDashboard from './pages/EngineerDashboard';
import MessengerDashboard from './pages/MessengerDashboard';
import AdminDashboard from './pages/AdminDashboard';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/" />;
  return children;
};

const DashboardPlaceholder = ({ title }) => (
  <div className="pt-24 px-8">
    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{title}</h1>
    <p className="mt-4 text-slate-600 dark:text-slate-400">Welcome to your dashboard. We are setting things up for you.</p>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
          <Navbar />
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Role Specific Dashboards */}
            <Route path="/client/dashboard" element={
              <ProtectedRoute allowedRoles={['CLIENT']}>
                <ClientDashboard />
              </ProtectedRoute>
            } />
            <Route path="/project_manager/dashboard" element={
              <ProtectedRoute allowedRoles={['PROJECT_MANAGER']}>
                <ManagerDashboard />
              </ProtectedRoute>
            } />
            <Route path="/architect/dashboard" element={
              <ProtectedRoute allowedRoles={['ARCHITECT']}>
                <ArchitectDashboard />
              </ProtectedRoute>
            } />
            <Route path="/structural_engineer/dashboard" element={
              <ProtectedRoute allowedRoles={['STRUCTURAL_ENGINEER']}>
                <EngineerDashboard />
              </ProtectedRoute>
            } />
            <Route path="/electrical_engineer/dashboard" element={
              <ProtectedRoute allowedRoles={['ELECTRICAL_ENGINEER']}>
                <EngineerDashboard />
              </ProtectedRoute>
            } />
            <Route path="/hydraulic_engineer/dashboard" element={
              <ProtectedRoute allowedRoles={['HYDRAULIC_ENGINEER']}>
                <EngineerDashboard />
              </ProtectedRoute>
            } />
            <Route path="/messenger/dashboard" element={
              <ProtectedRoute allowedRoles={['MESSENGER']}>
                <MessengerDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/dashboard" element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/dashboard" element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <DashboardPlaceholder title="Admin Dashboard" />
              </ProtectedRoute>
            } />

            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
