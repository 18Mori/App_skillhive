import React from 'react';
import MentorCard from '../components/MentorCard';
import mentors from '../data/mentors.json'; // We import the local JSON data

const HomePage = () => {
  return (
    <div className="page-container">
      <h2>Find a Mentor</h2>
      <div className="mentor-list">
        {mentors.map(mentor => (
          <MentorCard key={mentor.id} mentor={mentor} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;