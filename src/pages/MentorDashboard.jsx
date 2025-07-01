// src/pages/MentorDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getSessions, updateSessionStatus } from '../services/storageService';
import { Link } from 'react-router-dom';
import SessionCard from '../components/SessionCard';

const MentorDashboard = () => {
  const { currentUser } = useAuth();
  const [sessions, setSessions] = useState([]);

  const fetchSessions = () => {
    if (currentUser) {
      const allSessions = getSessions();
      const mentorSessions = allSessions.filter(session => session.mentorId === currentUser.id);
      setSessions(mentorSessions);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, [currentUser]);

  const handleUpdateSession = (sessionId, status) => {
    if (updateSessionStatus(sessionId, status)) {
      fetchSessions(); 
    }
  };

  return (
    <div className="container mx-auto mt-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Mentor Dashboard</h1>
          <p className="mt-2">Welcome, {currentUser.name}!</p>
        </div>
        <Link to="/edit-profile" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
          Edit Profile
        </Link>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4">Your Sessions</h2>
        {sessions.length > 0 ? (
          <div className="space-y-4">
            {sessions.map(session => (
              <SessionCard
                key={session.id}
                session={session}
                type="mentor"
                onUpdate={handleUpdateSession}
              />
            ))}
          </div>
        ) : (
          <p>You have no scheduled sessions.</p>
        )}
      </div>
    </div>
  );
};
export default MentorDashboard;