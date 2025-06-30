import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { addSession } from '../services/storageService';

const RequestSession = () => {
  const { mentorId } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const [topic, setTopic] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState({});

  const today = new Date().toISOString().split('T')[0];

  const validateForm = () => {
    const newErrors = {};
    if (!topic.trim()) newErrors.topic = 'Topic is required.';
    if (!date) {
      newErrors.date = 'Please select a date.';
    } else if (date < today) {
      newErrors.date = 'The session date cannot be in the past.';
    }
    if (!time) newErrors.time = 'Please select a time.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm() || !currentUser) return;

    const newSession = {
      id: Date.now().toString(),
      menteeId: currentUser.id,
      mentorId,
      topic,
      date,
      time,
      duration: 60, 
      status: 'pending',
      notes,
    };

    addSession(newSession);
    navigate('/mentee-dashboard'); 
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Request a Session</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Topic</label>
          <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} className={`w-full px-3 py-2 border rounded-md ${errors.topic ? 'border-red-500' : ''}`} required />
          {errors.topic && <p className="text-red-500 text-xs mt-1">{errors.topic}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Preferred Date</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} min={today} className={`w-full px-3 py-2 border rounded-md ${errors.date ? 'border-red-500' : ''}`} required />
          {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Preferred Time</label>
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className={`w-full px-3 py-2 border rounded-md ${errors.time ? 'border-red-500' : ''}`} required />
          {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700">Notes for the Mentor (optional)</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} className="w-full px-3 py-2 border rounded-md" rows="3"></textarea>
        </div>
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700">Send Request</button>
      </form>
    </div>
  );
};

export default RequestSession;