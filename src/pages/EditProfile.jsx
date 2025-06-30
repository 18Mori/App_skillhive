import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const { currentUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [skills, setSkills] = useState('');
  const [bio, setBio] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState('');

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || '');
      setSkills(currentUser.skills || '');
      setBio(currentUser.bio || '');
      setAvatarPreview(currentUser.avatar || '');
    }
  }, [currentUser]);

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result); 
        setAvatarPreview(reader.result); 
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedData = { name, skills, bio, ...(avatar && { avatar }) };
    if (updateUserProfile(updatedData)) {
      navigate('/mentor-dashboard');
    }
  };

  if (!currentUser) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col items-center mb-6">
          <img 
            src={avatarPreview || 'https://via.placeholder.com/150'} 
            alt="Avatar Preview" 
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
          />
          <label htmlFor="avatar-upload" className="cursor-pointer mt-4 bg-gray-100 px-4 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-200">
            Change Picture
          </label>
          <input id="avatar-upload" type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Full Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border rounded-md" required />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Skills (comma-separated)</label>
          <input type="text" value={skills} onChange={(e) => setSkills(e.target.value)} className="w-full px-3 py-2 border rounded-md" placeholder="e.g., React, Node.js, UI/UX" />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700">Biography</label>
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} className="w-full px-3 py-2 border rounded-md" rows="5" placeholder="Tell mentees a little about yourself..."></textarea>
        </div>
        <div className="flex gap-4">
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700">Save Changes</button>
          <button type="button" onClick={() => navigate('/mentor-dashboard')} className="w-full bg-gray-300 text-gray-800 py-2 rounded-md hover:bg-gray-400">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;