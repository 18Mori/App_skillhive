import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Dashboard from './pages/Dashboard';
import MentorProfile from './pages/MentorProfile';
import MenteeProfile from './pages/MenteeProfile';
import './App.css'; // Import the stylesheet

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/mentor-profile" element={<MentorProfile />} />
          <Route path="/mentee-profile" element={<MenteeProfile />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;