import React, { createContext, useState, useContext, useEffect } from 'react';
import * as storage from '../services/storageService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(storage.getCurrentUser());
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ text: '', type: '' });
      }, 3000); 
      return () => clearTimeout(timer);
    }
  }, [message]);

  const login = (email, password) => {
    const users = storage.getUsers();
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
      storage.setCurrentUser(user);
      setCurrentUser(user);
      setMessage({ text: 'Login successful!', type: 'success' });
      return user; 
    } else {
      setMessage({ text: 'Invalid email or password.', type: 'error' });
      return null; 
    }
  };

  const logout = () => {
    storage.removeCurrentUser();
    setCurrentUser(null);
  };

  const signup = (newUser) => {
    const users = storage.getUsers();
    if (users.some(u => u.email === newUser.email)) {
      setMessage({ text: 'An account with this email already exists.', type: 'error' });
      return false;
    }

    storage.addUser(newUser);
    setMessage({ text: 'Account created successfully! Please log in.', type: 'success' });
    return true;
  };

  const updateUserProfile = (updatedData) => {
    if (!currentUser) return null;

    const updatedUser = storage.updateUser(currentUser.id, updatedData);
    if (updatedUser) {
      setCurrentUser(updatedUser); 
      setMessage({ text: 'Profile updated successfully!', type: 'success' });
      return updatedUser;
    } else {
      setMessage({ text: 'Failed to update profile.', type: 'error' });
      return null;
    }
  };

  const value = { currentUser, login, logout, signup, message, updateUserProfile };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};