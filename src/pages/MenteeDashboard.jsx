import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getSessions } from '../services/storageService';
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

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold">Mentee Dashboard</h1>
      <p className="mt-2">Welcome, {currentUser.name}!</p>

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Your Sessions</h2>
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