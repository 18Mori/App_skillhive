import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUsers } from '../services/storageService';

const FindMentor = () => {
  const [allMentors, setAllMentors] = useState([]);
  const [filteredMentors, setFilteredMentors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkill, setSelectedSkill] = useState('');
  const [uniqueSkills, setUniqueSkills] = useState([]);

  useEffect(() => {
    const allUsers = getUsers();
    const mentors = allUsers.filter(user => user.role === 'mentor');
    setAllMentors(mentors);
    setFilteredMentors(mentors);

    const skillsSet = new Set();
    mentors.forEach(mentor => {
      if (mentor.skills) {
        mentor.skills.split(',').forEach(skill => {
          if (skill.trim()) {
            skillsSet.add(skill.trim());
          }
        });
      }
    });
    setUniqueSkills(Array.from(skillsSet).sort());
  }, []);

  useEffect(() => {
    let results = allMentors;

    if (selectedSkill) {
      results = results.filter(mentor =>
        mentor.skills?.toLowerCase().includes(selectedSkill.toLowerCase())
      );
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(mentor =>
        mentor.name.toLowerCase().includes(term) ||
        mentor.skills?.toLowerCase().includes(term)
      );
    }

    setFilteredMentors(results);
  }, [searchTerm, selectedSkill, allMentors]);

  return (
    <div className="container mx-auto mt-10">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Find a Mentor</h1>
        <div className="flex items-center gap-2 w-full md:w-auto">
          <input type="text" placeholder="Search by name or skill..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="px-4 py-2 border rounded-md w-full md:w-64 mr-11" />
          {/* <select value={selectedSkill} onChange={(e) => setSelectedSkill(e.target.value)} className="px-4 py-2 border rounded-md bg-white">
            <option value="">All Skills</option>
            {uniqueSkills.map(skill => (
              <option key={skill} value={skill}>{skill}</option>
            ))}
          </select> */}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMentors.map(mentor => (
          <div key={mentor.id} className="bg-white p-6 rounded-lg shadow-md flex flex-col">
            <div className="flex-grow mb-4">
              <Link to={`/mentor/${mentor.id}`} className="hover:underline">
                <h2 className="text-xl font-bold text-indigo-700">{mentor.name}</h2>
              </Link>
              <p className="text-gray-600 mt-2">{mentor.skills || 'No skills listed'}</p>
              <p className="text-gray-700 mt-4 line-clamp-3">{mentor.bio || 'No bio available.'}</p>
            </div>
            <Link
              to={`/mentor/${mentor.id}`}
              className="mt-auto inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 text-center"
            >
              View Profile
            </Link>
          </div>
        ))}
      </div>
      {allMentors.length > 0 && filteredMentors.length === 0 && (
        <p className="text-center mt-8 text-gray-500">No mentors found matching your search criteria.</p>
      )}
      {allMentors.length === 0 && (
        <p className="text-center mt-8 text-gray-500">No mentors are available at this time.</p>
      )}
    </div>
  );
};

export default FindMentor;