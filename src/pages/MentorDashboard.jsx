// src/pages/MentorDashboard.jsx
import React, { useState, useEffect } from 'react';
import SessionCard from '../components/SessionCard';

const MentorDashboard = ({ user }) => {
  const [sessions, setSessions] = useState([]);
  const [mentees, setMentees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load data from localStorage
    const storedSessions = JSON.parse(localStorage.getItem('sessions')) || [];
    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
    
    // Filter relevant sessions and mentees
    const mentorSessions = storedSessions.filter(session => 
      session.mentorId === user.id
    );
    
    const menteeIds = [...new Set(mentorSessions.map(session => session.menteeId))];
    const mentorMentees = storedUsers.filter(u => 
      menteeIds.includes(u.id) && u.role === 'mentee'
    );
    
    setSessions(mentorSessions);
    setMentees(mentorMentees);
    setLoading(false);
  }, [user.id]);

  const handleSessionUpdate = (sessionId, status) => {
    const updatedSessions = sessions.map(session => 
      session.id === sessionId ? { ...session, status } : session
    );
    
    setSessions(updatedSessions);
    localStorage.setItem('sessions', JSON.stringify(updatedSessions));
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Mentor Dashboard</h1>
        <p className="text-gray-600">Welcome back, {user.name}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Your Mentees</h2>
          {mentees.length > 0 ? (
            <ul className="space-y-3">
              {mentees.map(mentee => (
                <li key={mentee.id} className="flex items-center">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                  <div className="ml-4">
                    <p className="font-medium">{mentee.name}</p>
                    <p className="text-sm text-gray-600">{mentee.email}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No mentees yet</p>
          )}
        </div>

        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-4">Session Requests</h2>
          <div className="space-y-4">
            {sessions.filter(s => s.status === 'pending').length > 0 ? (
              sessions
                .filter(s => s.status === 'pending')
                .map(session => (
                  <SessionCard 
                    key={session.id} 
                    session={session} 
                    onUpdate={handleSessionUpdate} 
                    type="mentor"
                  />
                ))
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <p className="text-gray-500">No pending session requests</p>
              </div>
            )}
          </div>

          <h2 className="text-xl font-semibold mt-8 mb-4">Upcoming Sessions</h2>
          <div className="space-y-4">
            {sessions.filter(s => s.status === 'confirmed').length > 0 ? (
              sessions
                .filter(s => s.status === 'confirmed')
                .map(session => (
                  <SessionCard 
                    key={session.id} 
                    session={session} 
                    type="mentor"
                  />
                ))
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <p className="text-gray-500">No upcoming sessions</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorDashboard;