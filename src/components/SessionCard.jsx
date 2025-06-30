// src/components/SessionCard.jsx
import React from 'react';
import moment from 'moment';
import { getUsers } from '../services/storageService';

const SessionCard = ({ session, onUpdate, type }) => {
  const users = getUsers();
  
  const getParticipant = (id) => 
    users.find(user => user.id === id) || {};
  
  const mentor = getParticipant(session.mentorId);
  const mentee = getParticipant(session.menteeId);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border-l-4 border-indigo-500">
      <div className="flex justify-between">
        <div>
          <h3 className="font-semibold">{session.topic}</h3>
          <p className="text-gray-600 text-sm">
            {type === 'mentor' ? `With: ${mentee.name || 'Mentee'}` : `Mentor: ${mentor.name || 'Expert'}`}
          </p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs ${
          session.status === 'confirmed' 
            ? 'bg-green-100 text-green-800' 
            : session.status === 'completed'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-yellow-100 text-yellow-800'
        }`}>
          {session.status}
        </span>
      </div>
      
      <div className="mt-4 flex justify-between items-center">
        <div>
          <p className="text-sm text-gray-600">
            {moment(session.date).format('MMM Do, YYYY')} | {session.time}
          </p>
          <p className="text-sm">Duration: {session.duration} mins</p>
        </div>
        
        {onUpdate && session.status === 'pending' && (
          <div className="space-x-2">
            <button 
              onClick={() => onUpdate(session.id, 'confirmed')}
              className="bg-green-600 text-white px-3 py-1 rounded-md text-sm hover:bg-green-700"
            >
              Approve
            </button>
            <button 
              onClick={() => onUpdate(session.id, 'rejected')}
              className="bg-red-600 text-white px-3 py-1 rounded-md text-sm hover:bg-red-700"
            >
              Reject
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionCard;