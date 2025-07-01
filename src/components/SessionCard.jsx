// src/components/SessionCard.jsx
import React from 'react';

const SessionCard = ({ session, type, onUpdate }) => {
  const { topic, date, time, status } = session;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md border-l-4 border-indigo-500">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold">{topic}</h3>
          <p className="text-sm text-gray-600">Date: {new Date(date).toLocaleDateString()}</p>
          <p className="text-sm text-gray-600">Time: {time}</p>
        </div>
        <span className={`capitalize px-3 py-1 text-xs font-semibold rounded-full ${
          status === 'confirmed' ? 'bg-green-100 text-green-800' :
          status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {status}
        </span>
      </div>
      {type === 'mentor' && status === 'pending' && (
        <div className="mt-4 flex gap-2">
          <button onClick={() => onUpdate(session.id, 'confirmed')} className="bg-green-500 text-white px-3 py-1 rounded-md text-sm hover:bg-green-600">Confirm</button>
          <button onClick={() => onUpdate(session.id, 'declined')} className="bg-red-500 text-white px-3 py-1 rounded-md text-sm hover:bg-red-600">Decline</button>
        </div>
      )}
    </div>
  );
};

export default SessionCard;