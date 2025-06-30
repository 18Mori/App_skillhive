// src/pages/MenteeDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SessionCard from '../components/SessionCard';
import ProgressBar from '../components/ProgressBar';

const MenteeDashboard = ({ user }) => {
  const navigate = useNavigate();
  const [upcomingSessions, setUpcomingSessions] = useState([]);
  const [completedSessions, setCompletedSessions] = useState([]);
  const [availableMentors, setAvailableMentors] = useState([]);
  const [learningGoals, setLearningGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requestFormData, setRequestFormData] = useState({
    mentorId: '',
    topic: '',
    date: '',
    time: '',
    duration: 60,
    notes: ''
  });
  const [requestError, setRequestError] = useState('');

  // Load data from localStorage
  useEffect(() => {
    // Simulate API loading delay
    setTimeout(() => {
      try {
        // Load sessions
        const sessions = JSON.parse(localStorage.getItem('sessions')) || [];
        const menteeSessions = sessions.filter(session => 
          session.menteeId === user.id
        );
        
        // Separate upcoming and completed sessions
        const now = new Date();
        const upcoming = menteeSessions.filter(s => 
          s.status === 'confirmed' && new Date(s.date) > now
        );
        const completed = menteeSessions.filter(s => 
          s.status === 'completed' || new Date(s.date) <= now
        );
        
        setUpcomingSessions(upcoming);
        setCompletedSessions(completed);
        
        // Load mentors
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const mentors = users.filter(u => u.role === 'mentor');
        setAvailableMentors(mentors);
        
        // Load learning goals
        const goals = JSON.parse(localStorage.getItem('learningGoals')) || [];
        const userGoals = goals.filter(goal => goal.userId === user.id);
        setLearningGoals(userGoals);
        
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    }, 1000);
  }, [user.id]);

  const handleRequestChange = (e) => {
    const { name, value } = e.target;
    setRequestFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitRequest = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!requestFormData.mentorId || !requestFormData.topic || !requestFormData.date || !requestFormData.time) {
      setRequestError('Please fill all required fields');
      return;
    }
    
    // Create new session object
    const newSession = {
      id: Date.now().toString(),
      menteeId: user.id,
      mentorId: requestFormData.mentorId,
      topic: requestFormData.topic,
      date: requestFormData.date,
      time: requestFormData.time,
      duration: requestFormData.duration,
      notes: requestFormData.notes,
      status: 'pending',
      createdAt: new Date().toISOString()
    };
    
    // Update localStorage
    const sessions = JSON.parse(localStorage.getItem('sessions')) || [];
    sessions.push(newSession);
    localStorage.setItem('sessions', JSON.stringify(sessions));
    
    // Update state
    setUpcomingSessions(prev => [newSession, ...prev]);
    
    // Reset form
    setRequestFormData({
      mentorId: '',
      topic: '',
      date: '',
      time: '',
      duration: 60,
      notes: ''
    });
    setRequestError('');
    setShowRequestForm(false);
  };

  const handleAddGoal = () => {
    const newGoal = {
      id: Date.now().toString(),
      userId: user.id,
      title: `New Learning Goal ${learningGoals.length + 1}`,
      targetDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      progress: 0,
      sessionsCompleted: 0
    };
    
    const updatedGoals = [...learningGoals, newGoal];
    setLearningGoals(updatedGoals);
    localStorage.setItem('learningGoals', JSON.stringify(updatedGoals));
  };

  const handleUpdateGoalProgress = (goalId, progress) => {
    const updatedGoals = learningGoals.map(goal => 
      goal.id === goalId ? { ...goal, progress: Math.min(100, Math.max(0, progress)) } : goal
    );
    
    setLearningGoals(updatedGoals);
    localStorage.setItem('learningGoals', JSON.stringify(updatedGoals));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Welcome back, {user.name}</h1>
              <p className="text-gray-600 mt-2">Track your progress and manage your learning journey</p>
            </div>
            <button
              onClick={() => setShowRequestForm(true)}
              className="mt-4 md:mt-0 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg flex items-center transition duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Request New Session
            </button>
          </div>
          
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <div className="bg-indigo-100 p-3 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold">{upcomingSessions.length}</p>
                  <p className="text-gray-600">Upcoming Sessions</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <div className="bg-indigo-100 p-3 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold">{completedSessions.length}</p>
                  <p className="text-gray-600">Completed Sessions</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center">
                <div className="bg-indigo-100 p-3 rounded-full mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div>
                  <p className="text-2xl font-bold">{learningGoals.length}</p>
                  <p className="text-gray-600">Learning Goals</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Session Request Modal */}
        {showRequestForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Request New Session</h3>
                  <button 
                    onClick={() => {
                      setShowRequestForm(false);
                      setRequestError('');
                    }}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                
                {requestError && (
                  <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                    {requestError}
                  </div>
                )}
                
                <form onSubmit={handleSubmitRequest}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Select Mentor *</label>
                      <select
                        name="mentorId"
                        value={requestFormData.mentorId}
                        onChange={handleRequestChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      >
                        <option value="">Choose a mentor</option>
                        {availableMentors.map(mentor => (
                          <option key={mentor.id} value={mentor.id}>
                            {mentor.name} - {mentor.skills?.split(',')[0]}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2">Session Topic *</label>
                      <input
                        type="text"
                        name="topic"
                        value={requestFormData.topic}
                        onChange={handleRequestChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        placeholder="What do you want to learn?"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-gray-700 mb-2">Date *</label>
                      <input
                        type="date"
                        name="date"
                        value={requestFormData.date}
                        onChange={handleRequestChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2">Time *</label>
                      <input
                        type="time"
                        name="time"
                        value={requestFormData.time}
                        onChange={handleRequestChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-gray-700 mb-2">Duration (minutes)</label>
                      <select
                        name="duration"
                        value={requestFormData.duration}
                        onChange={handleRequestChange}
                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="30">30 mins</option>
                        <option value="60">60 mins</option>
                        <option value="90">90 mins</option>
                        <option value="120">120 mins</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-gray-700 mb-2">Notes for Mentor</label>
                    <textarea
                      name="notes"
                      value={requestFormData.notes}
                      onChange={handleRequestChange}
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      rows="3"
                      placeholder="Share what you'd like to focus on during this session..."
                    ></textarea>
                  </div>
                  
                  <div className="flex justify-end space-x-3">
                    <button
                      type="button"
                      onClick={() => setShowRequestForm(false)}
                      className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    >
                      Request Session
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
        
        {/* Upcoming Sessions */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Upcoming Sessions</h2>
          
          {upcomingSessions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcomingSessions.map(session => (
                <SessionCard 
                  key={session.id} 
                  session={session} 
                  type="mentee" 
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h3 className="text-xl font-medium mt-4 text-gray-800">No upcoming sessions</h3>
              <p className="text-gray-600 mt-2">Request a session with a mentor to get started</p>
              <button
                onClick={() => setShowRequestForm(true)}
                className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md"
              >
                Request Session
              </button>
            </div>
          )}
        </div>
        
        {/* Learning Goals */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Learning Goals</h2>
            <button
              onClick={handleAddGoal}
              className="flex items-center text-indigo-600 hover:text-indigo-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Goal
            </button>
          </div>
          
          {learningGoals.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {learningGoals.map(goal => (
                <div key={goal.id} className="bg-white rounded-lg shadow-md p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-800">{goal.title}</h3>
                    <div className="text-sm text-gray-500">
                      Target: {new Date(goal.targetDate).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <ProgressBar progress={goal.progress} />
                  
                  <div className="flex justify-between mt-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleUpdateGoalProgress(goal.id, goal.progress - 10)}
                        className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                        disabled={goal.progress <= 0}
                      >
                        -10%
                      </button>
                      <button
                        onClick={() => handleUpdateGoalProgress(goal.id, goal.progress + 10)}
                        className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-md hover:bg-indigo-200"
                        disabled={goal.progress >= 100}
                      >
                        +10%
                      </button>
                    </div>
                    
                    <button className="text-red-600 hover:text-red-800">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
              </svg>
              <h3 className="text-xl font-medium mt-4 text-gray-800">No learning goals yet</h3>
              <p className="text-gray-600 mt-2">Set your first learning goal to track your progress</p>
              <button
                onClick={handleAddGoal}
                className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-md"
              >
                Add Goal
              </button>
            </div>
          )}
        </div>
        
        {/* Available Mentors */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-800">Available Mentors</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableMentors.map(mentor => (
              <div key={mentor.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                    <div className="ml-4">
                      <h3 className="font-bold text-lg">{mentor.name}</h3>
                      <div className="flex items-center mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="ml-1 text-gray-600">4.8 (24)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {mentor.skills?.split(',').slice(0, 3).map((skill, i) => (
                        <span key={i} className="bg-indigo-100 text-indigo-800 text-xs px-3 py-1 rounded-full">
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                    {mentor.bio || 'Experienced professional passionate about sharing knowledge and helping others grow.'}
                  </p>
                  
                  <button 
                    onClick={() => {
                      setRequestFormData(prev => ({
                        ...prev,
                        mentorId: mentor.id
                      }));
                      setShowRequestForm(true);
                    }}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition duration-300"
                  >
                    Request Session
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenteeDashboard;