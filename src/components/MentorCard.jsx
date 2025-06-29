import React from 'react';

const MentorCard = ({ mentor }) => {
  return (
    <div className="mentor-card">
      <img src={mentor.img} alt={mentor.name} />
      <h3>{mentor.name}</h3>
      <p>{mentor.skill}</p>
    </div>
  );
};

export default MentorCard;