// --- Data Initialization ---

const initializeMockData = () => {
  // Initialize users if not present
  if (!localStorage.getItem('users')) {
    const initialUsers = [
      { id: '1', name: 'Alex Johnson', email: 'alex@example.com', password: 'password123', role: 'mentee', joinedDate: new Date().toISOString() },
      { id: '2', name: 'Sarah Miller', email: 'sarah@example.com', password: 'password123', role: 'mentor', skills: 'React, JavaScript, UI/UX', bio: 'Senior frontend developer with 8+ years of experience', joinedDate: new Date().toISOString() }
    ];
    localStorage.setItem('users', JSON.stringify(initialUsers));
  }

  // Initialize sessions if not present
  if (!localStorage.getItem('sessions')) {
    const initialSessions = [
      { id: '101', menteeId: '1', mentorId: '2', topic: 'React Fundamentals', date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], time: '14:00', duration: 60, status: 'confirmed', notes: 'Focus on hooks and component lifecycle' }
    ];
    localStorage.setItem('sessions', JSON.stringify(initialSessions));
  }
};

// --- Data Access Functions ---

const getItem = (key) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Failed to parse ${key} from localStorage`, error);
    localStorage.removeItem(key); // Clear corrupted data
    return null;
  }
};

const setItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Failed to set ${key} in localStorage`, error);
  }
};

export const initStorage = () => initializeMockData();

export const getUsers = () => getItem('users') || [];
export const getSessions = () => getItem('sessions') || [];
export const getCurrentUser = () => getItem('currentUser');
export const setCurrentUser = (user) => setItem('currentUser', user);
export const removeCurrentUser = () => localStorage.removeItem('currentUser');
export const addUser = (newUser) => {
  const users = getUsers();
  users.push(newUser);
  setItem('users', users);
};
export const addSession = (newSession) => {
  const sessions = getSessions() || [];
  sessions.push(newSession);
  setItem('sessions', sessions);
};
export const updateUser = (userId, updatedData) => {
  const users = getUsers();
  const userIndex = users.findIndex(u => u.id === userId);
  if (userIndex !== -1) {
    users[userIndex] = { ...users[userIndex], ...updatedData };
    setItem('users', users);
    const currentUser = getCurrentUser();
    if (currentUser && currentUser.id === userId) {
      setCurrentUser(users[userIndex]);
    }
    return users[userIndex];
  }
  return null;
};
export const updateSessionStatus = (sessionId, status) => {
  const sessions = getSessions() || [];
  const sessionIndex = sessions.findIndex(s => s.id === sessionId);
  if (sessionIndex !== -1) {
    sessions[sessionIndex].status = status;
    setItem('sessions', sessions);
    return true;
  }
  return false;
};