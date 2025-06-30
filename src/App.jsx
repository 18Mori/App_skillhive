// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MentorDashboard from './pages/MentorDashboard';
import MenteeDashboard from './pages/MenteeDashboard';
import CommunityHub from './pages/CommunityHub';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    try {
      const userJSON = localStorage.getItem('currentUser');
      if (userJSON) {
        setCurrentUser(JSON.parse(userJSON));
      }
    } catch (error) {
      console.error("Failed to parse currentUser from localStorage", error);
      localStorage.removeItem('currentUser'); // Clear corrupted data
    }

  }, []);

  const handleLogin = (user) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
    setMessage({ text: 'Login successful!', type: 'success' });
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    setMessage({ text: 'Logged out successfully', type: 'success' });
  };

  const handleSignup = (newUser) => {
    try {
      const usersJSON = localStorage.getItem('users');
      const users = usersJSON ? JSON.parse(usersJSON) : [];
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      setMessage({ text: 'Account created successfully!', type: 'success' });
    } catch (error) {
      console.error("Failed to update users in localStorage", error);
      setMessage({ text: 'An error occurred during signup.', type: 'error' });
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header currentUser={currentUser} onLogout={handleLogout} />
        {message.text && (
          <div className={`fixed top-4 right-4 p-4 rounded-md ${
            message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {message.text}
          </div>
        )}
        
        <Routes>
          <Route path="/" element={<Home currentUser={currentUser} />} />
          <Route path="/login" element={currentUser ? <Navigate to="/" /> : <Login onLogin={handleLogin} />} />
          <Route path="/signup" element={currentUser ? <Navigate to="/" /> : <Signup onSignup={handleSignup} />} />
          <Route path="/mentor-dashboard" element={currentUser?.role === 'mentor' ? <MentorDashboard user={currentUser} /> : <Navigate to="/" />} />
          <Route path="/mentee-dashboard" element={currentUser?.role === 'mentee' ? <MenteeDashboard user={currentUser} /> : <Navigate to="/" />} />
          <Route path="/community" element={<CommunityHub />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;