// src/pages/MenteeDashboard.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getSessions } from '../services/storageService';
import { Link } from 'react-router-dom';
import SessionCard from '../components/SessionCard';

const MenteeDashboard = () => {
  const { currentUser } = useAuth();
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const allSessions = getSessions();
      const menteeSessions = allSessions.filter(session => session.menteeId === currentUser.id);
      setSessions(menteeSessions);
    }
  }, [currentUser]);

  if (!currentUser) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold ml-5">Mentee Dashboard</h1>
          <p className="mt-2 ml-5">Welcome, {currentUser.name}!</p>
        </div>
        <Link to="/edit-profile" className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 mr-5">
          Edit Profile
        </Link>
      </div>

      <div>
        <h2 className="text-2xl font-semibold mb-4 ml-5">Your Sessions</h2>
        {sessions.length > 0 ? (
          <div className="space-y-4">
            {sessions.map(session => <SessionCard key={session.id} session={session} type="mentee" />)}
          </div>
        ) : (
          <p>You have no scheduled sessions.</p>
        )}
      </div>
    </div>
  );
};

export default MenteeDashboard;