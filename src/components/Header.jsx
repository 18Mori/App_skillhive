import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { currentUser, logout } = useAuth();

  const getDashboardLink = () => {
    if (!currentUser) return null;
    return currentUser.role === 'mentor' ? '/mentor-dashboard' : '/mentee-dashboard';
  };

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-indigo-600">Skillhive</Link>
        <div className="flex items-center space-x-4">
          <NavLink to="/" className={({ isActive }) => isActive ? "text-indigo-600" : "text-gray-600"}>Home</NavLink>
          {currentUser && (
            <>
              <NavLink to={getDashboardLink()} className={({ isActive }) => isActive ? "text-indigo-600" : "text-gray-600"}>Dashboard</NavLink>
              {currentUser.role === 'mentee' && (
                <NavLink to="/find-mentor" className={({ isActive }) => isActive ? "text-indigo-600" : "text-gray-600"}>Find a Mentor</NavLink>
              )}

              <div className="flex items-center gap-3">
                <button onClick={logout} className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md text-sm hover:bg-gray-300">Logout</button>
                <img 
                  src={currentUser.avatar || 'https://via.placeholder.com/40'} 
                  alt="User Avatar" 
                  className="w-10 h-10 rounded-full object-cover"
                />
              </div>
            </>
          )}
          {!currentUser && (
            <>
              <NavLink to="/login" className="text-gray-600 hover:text-indigo-600">Login</NavLink>
              <NavLink to="/signup" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Sign Up</NavLink>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;