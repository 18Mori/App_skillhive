// src/pages/Signup.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = ({ onSignup }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: '',
    skills: '',
    bio: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.password || !formData.role) {
      setError('All fields are required');
      return;
    }

    // Check if user already exists
    const users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.some(user => user.email === formData.email)) {
      setError('Email already registered');
      return;
    }

    // Create new user object
    const newUser = {
      id: Date.now().toString(),
      ...formData,
      joinedDate: new Date().toISOString(),
      isMentor: formData.role === 'mentor'
    };

    onSignup(newUser);
    navigate('/login');
  };

  return (
    <div className="max-w-md mx-auto my-12 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Create Your Account</h2>
      
      {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">I want to join as a:</label>
          <div className="flex space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="role"
                value="mentee"
                checked={formData.role === 'mentee'}
                onChange={handleChange}
                className="text-indigo-600 focus:ring-indigo-500"
                required
              />
              <span className="ml-2">Mentee</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="role"
                value="mentor"
                checked={formData.role === 'mentor'}
                onChange={handleChange}
                className="text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2">Mentor</span>
            </label>
          </div>
        </div>
        
        {formData.role === 'mentor' && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Skills (comma separated)</label>
              <input
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g., React, Node.js, UX Design"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                rows="3"
                placeholder="Tell us about your experience..."
              ></textarea>
            </div>
          </>
        )}
        
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300"
        >
          Create Account
        </button>
      </form>
      
      <div className="mt-4 text-center">
        <p className="text-gray-600">
          Already have an account? 
          <Link to="/login" className="text-indigo-600 ml-1 hover:underline">Log in</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;