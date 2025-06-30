// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MentorDashboard from './pages/MentorDashboard';
import MenteeDashboard from './pages/MenteeDashboard';
import CommunityHub from './pages/CommunityHub';
import FindMentor from './pages/FindMentor';
import RequestSession from './pages/RequestSession';
import MentorProfile from './pages/MentorProfile';
import EditProfile from './pages/EditProfile';
import ProtectedRoute from './components/ProtectedRoute';
import { useAuth } from './context/AuthContext';

function App() {
  const { currentUser, message } = useAuth();

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        {message.text && (
          <div className={`fixed top-4 right-4 p-4 rounded-md ${
            message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {message.text}
          </div>
        )}
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={currentUser ? <Navigate to="/" /> : <Login />} />
          <Route path="/signup" element={currentUser ? <Navigate to="/" /> : <Signup />} />
          <Route 
            path="/mentor-dashboard" 
            element={<ProtectedRoute role="mentor"><MentorDashboard /></ProtectedRoute>} 
          />
          <Route 
            path="/mentee-dashboard" 
            element={<ProtectedRoute role="mentee"><MenteeDashboard /></ProtectedRoute>} 
          />
          <Route 
            path="/find-mentor" 
            element={<ProtectedRoute role="mentee"><FindMentor /></ProtectedRoute>} 
          />
          <Route 
            path="/request-session/:mentorId" 
            element={<ProtectedRoute role="mentee"><RequestSession /></ProtectedRoute>} 
          />
          <Route 
            path="/mentor/:mentorId" 
            element={<ProtectedRoute role="mentee"><MentorProfile /></ProtectedRoute>} 
          />
          <Route 
            path="/edit-profile" 
            element={<ProtectedRoute role="mentor"><EditProfile /></ProtectedRoute>} 
          />
          <Route path="/community" element={<CommunityHub />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;