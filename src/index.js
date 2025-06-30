// src/index.js (add before ReactDOM.render)
if (!localStorage.getItem('users')) {
  const initialUsers = [
    {
      id: '1',
      name: 'Alex Johnson',
      email: 'alex@example.com',
      password: 'password123',
      role: 'mentee',
      joinedDate: new Date().toISOString()
    },
    {
      id: '2',
      name: 'Sarah Miller',
      email: 'sarah@example.com',
      password: 'password123',
      role: 'mentor',
      skills: 'React, JavaScript, UI/UX',
      bio: 'Senior frontend developer with 8+ years of experience',
      joinedDate: new Date().toISOString()
    }
  ];
  localStorage.setItem('users', JSON.stringify(initialUsers));
}

if (!localStorage.getItem('sessions')) {
  const initialSessions = [
    {
      id: '101',
      menteeId: '1',
      mentorId: '2',
      topic: 'React Fundamentals',
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      time: '14:00',
      duration: 60,
      status: 'confirmed',
      notes: 'Focus on hooks and component lifecycle'
    }
  ];
  localStorage.setItem('sessions', JSON.stringify(initialSessions));
}

if (!localStorage.getItem('learningGoals')) {
  localStorage.setItem('learningGoals', JSON.stringify([]));
}

if (!localStorage.getItem('communityPosts')) {
  localStorage.setItem('communityPosts', JSON.stringify([]));
}