import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Amplify } from 'aws-amplify'
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito'
import { awsConfig } from './config/aws-config'
import { AuthProvider } from './context/AuthContext'
import './App.css'

// Auth Components
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import ForgotPassword from './components/auth/ForgotPassword'
import ChangePassword from './components/auth/ChangePassword'
import ProtectedRoute from './components/auth/ProtectedRoute'
import PublicRoute from './components/auth/PublicRoute'
// Pages
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import ProfilePage from './pages/ProfilePage'
import SeriesManagerPage from './pages/SeriesManagerPage'
import SeriesDetailPage from './pages/SeriesDetailPage'
import ExplorePage from './pages/ExplorePage'
import LessonPage from './pages/LessonPage'

// Initialize AWS Amplify with v6 configuration
Amplify.configure(awsConfig);

// Configure token signing for Cognito
cognitoUserPoolsTokenProvider.setKeyValueStorage({
  getItem(key) {
    return localStorage.getItem(key);
  },
  setItem(key, value) {
    localStorage.setItem(key, value);
  },
  removeItem(key) {
    localStorage.removeItem(key);
  }
});

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          } />
          <Route path="/register" element={
            <Register />
          } />
          <Route path="/forgot-password" element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          } />

          {/* Protected Routes */}
          <Route path="/dashboard" element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/change-password" element={
            <ProtectedRoute>
              <ChangePassword />
            </ProtectedRoute>
          } />
          <Route path="/profile" element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          } />
          <Route path="/explore" element={
            <ProtectedRoute>
              <ExplorePage />
            </ProtectedRoute>
          } />
          <Route path="/series/manage" element={
            <ProtectedRoute>
              <SeriesManagerPage />
            </ProtectedRoute>
          } />
          <Route path="/series/:seriesId" element={
            <ProtectedRoute>
              <SeriesDetailPage />
            </ProtectedRoute>
          } />
          <Route path="/lessons/:lessonId" element={
            <ProtectedRoute>
              <LessonPage />
            </ProtectedRoute>
          } />
          <Route path="/series/:seriesId/lessons/:lessonId" element={
            <ProtectedRoute>
              <LessonPage />
            </ProtectedRoute>
          } />
          {/* Catch-all route for 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  )
}

export default App
