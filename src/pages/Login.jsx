import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = login(email, password);
    if (user) {
      const path = user.role === 'mentor' ? '/mentor-dashboard' : '/mentee-dashboard';
      navigate(path); 
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700">Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 border rounded-md" required />
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700">Login</button>
      </form>
    </div>
  );
};

export default Login;