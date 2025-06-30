import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { currentUser } = useAuth();

  return (
    <div className="container mx-auto mt-10 text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to MentorshipApp</h1>
      {currentUser ? (
        <div>
          <p className="text-xl mb-4">Hello, {currentUser.name}! Ready to continue your journey?</p>
          <Link 
            to={currentUser.role === 'mentor' ? '/mentor-dashboard' : '/mentee-dashboard'}
            className="bg-indigo-600 text-white px-6 py-3 rounded-md text-lg hover:bg-indigo-700"
          >
            Go to Your Dashboard
          </Link>
        </div>
      ) : (
        <p className="text-xl">Your platform for connecting mentors and mentees. <Link to="/signup" className="text-indigo-600 hover:underline">Get started today!</Link></p>
      )}
    </div>
  );
};

export default Home;