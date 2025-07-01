import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getUsers } from '../services/storageService';

const Home = () => {
  const { currentUser } = useAuth();
  const [featuredMentors, setFeaturedMentors] = useState([]);

  useEffect(() => {
    const allUsers = getUsers();
    const mentors = allUsers.filter(user => user.role === 'mentor');
    // Feature up to 3 mentors
    setFeaturedMentors(mentors.slice(0, 3));
  }, []);

  return (
    <div className="container mx-auto mt-10 p-4">
      <div className="text-center">
        <h1 className="text-[#121516] text-3xl md:text-5xl font-bold leading-tight tracking-[-0.03em] mb-4">
          Unlock Your Potential with Expert Mentorship
        </h1>
        <p className="text-[#121516] text-3xl md:text-xl leading-tight tracking-[-0.03em] mb-20">
          Connect with industry leaders, gain personalized guidance, and accelerate your career growth.
        </p>
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

      {featuredMentors.length > 0 && (
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Featured Mentors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredMentors.map(mentor => (
              <div key={mentor.id} className="bg-white p-6 rounded-lg shadow-lg text-left transform hover:-translate-y-2 transition-transform duration-300">
                <img 
                  src={mentor.avatar || 'https://via.placeholder.com/150'} 
                  alt={mentor.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-md"
                />
                <h3 className="text-xl font-bold text-center text-gray-800">{mentor.name}</h3>
                <p className="text-indigo-500 text-center mt-1 mb-4 font-semibold">{mentor.skills || 'Diverse Skillset'}</p>
                <p className="text-gray-600 mt-2 text-sm line-clamp-3 h-16">{mentor.bio || 'A passionate mentor ready to help you grow.'}</p>
                <div className="text-center mt-6">
                  <Link
                    to={`/mentor/${mentor.id}`}
                    className="bg-indigo-100 text-indigo-700 px-5 py-2 rounded-full hover:bg-indigo-200 font-semibold text-sm"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;