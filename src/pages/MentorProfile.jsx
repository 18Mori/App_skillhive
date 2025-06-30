// src/pages/MentorProfile.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getUsers } from '../services/storageService'; // We'll use getUsers for simplicity

const MentorProfile = () => {
  const { mentorId } = useParams();
  const [mentor, setMentor] = useState(null);

  useEffect(() => {
    // In a real app, you might have a getUserById function.
    // For now, we can find the user from the full list.
    const mentorData = getUsers().find(user => user.id === mentorId);
    setMentor(mentorData);
  }, [mentorId]);

  if (!mentor) {
    return (
      <div className="container mx-auto mt-10 text-center">
        <h1 className="text-2xl">Mentor not found.</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-10 p-4 md:p-6">
      <div className="bg-white rounded-lg shadow-xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <img 
            src={mentor.avatar || 'https://via.placeholder.com/150'} 
            alt={`${mentor.name}'s avatar`}
            className="w-36 h-36 rounded-full object-cover border-4 border-indigo-100"
          />
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-gray-800">{mentor.name}</h1>
            <p className="text-lg text-indigo-600 font-semibold mt-2">{mentor.skills || 'Skills not specified'}</p>
          </div>
        </div>
        
        <div className="mt-6 border-t pt-6">
          <h2 className="text-2xl font-semibold text-gray-700">About Me</h2>
          <p className="text-gray-600 mt-2 whitespace-pre-wrap">{mentor.bio || 'No biography provided.'}</p>
        </div>

        <div className="mt-8 text-center">
          <Link to={`/request-session/${mentor.id}`} className="bg-indigo-600 text-white px-8 py-3 rounded-md text-lg hover:bg-indigo-700 transition-colors">
            Request a Session with {mentor.name.split(' ')[0]}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MentorProfile;