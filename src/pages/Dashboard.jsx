import React from 'react';
import { auth } from '../firebase';

const Dashboard = () => {
  const user = auth.currentUser;

  return (
    <div className="page-container">
      <h2>My Dashboard</h2>
      <p>Welcome, {user ? user.email : 'Guest'}!</p>
      <p>This is your personal space. More features coming soon!</p>
    </div>
  );
};

export default Dashboard;