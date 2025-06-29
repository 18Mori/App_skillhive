// src/components/Header.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = ({ currentUser, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-indigo-600">SkillHive</Link>
        
        <nav className="flex items-center space-x-6">
          {currentUser ? (
            <>
              <Link to="/community" className="text-gray-600 hover:text-indigo-600">Community</Link>
              {currentUser.role === 'mentor' && (
                <Link to="/mentor-dashboard" className="text-gray-600 hover:text-indigo-600">Dashboard</Link>
              )}
              {currentUser.role === 'mentee' && (
                <Link to="/mentee-dashboard" className="text-gray-600 hover:text-indigo-600">Dashboard</Link>
              )}
              <button 
                onClick={handleLogout}
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-indigo-600">Login</Link>
              <Link 
                to="/signup" 
                className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
              >
                Sign Up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;