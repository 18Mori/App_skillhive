// src/pages/EditProfile.jsx
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const { currentUser, updateUserProfile, setMessage, deleteAccount } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [skills, setSkills] = useState('');
  const [bio, setBio] = useState('');
  const [avatarPreview, setAvatarPreview] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || '');
      setAvatarPreview(currentUser.avatar || '');
      if (currentUser.role === 'mentor') {
        setSkills(currentUser.skills || '');
        setBio(currentUser.bio || '');
      }
    }
  }, [currentUser]);

  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      reader.onloadend = async () => {
        const newAvatar = reader.result;
        setAvatarPreview(newAvatar); // Show preview immediately

        if (await updateUserProfile({ avatar: newAvatar })) {
          setMessage({ text: 'Avatar updated successfully!', type: 'success' });
        }
        // Error message is handled by updateUserProfile in AuthContext
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = {
      name,
      // Conditionally add mentor-specific fields
      ...(currentUser.role === 'mentor' && { skills, bio }),
    };
    if (await updateUserProfile(updatedData)) {
      setMessage({ text: 'Profile details saved successfully!', type: 'success' });
      const dashboardPath = currentUser.role === 'mentor' ? '/mentor-dashboard' : '/mentee-dashboard';
      navigate(dashboardPath);
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action is irreversible and will remove all your data.')) {
      if (deleteAccount()) {
        // The AuthContext sets currentUser to null, effectively logging out.
        // The user will be redirected from protected routes.
        navigate('/'); // Navigate to home page for a clean exit.
      }
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
          <div className="relative">
            <img 
              src={avatarPreview || 'https://via.placeholder.com/150'} 
              alt="Avatar Preview" 
              className={`w-32 h-32 rounded-full object-cover border-4 border-gray-200 transition-opacity ${isUploading ? 'opacity-50' : ''}`}
            />
            {isUploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-full">
                <div className="text-white text-sm font-bold">Uploading...</div>
              </div>
            )}
          </div>
          <label htmlFor="avatar-upload" className={`cursor-pointer mt-4 bg-gray-100 px-4 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-200 ${isUploading ? 'pointer-events-none bg-gray-300' : ''}`}>
            {isUploading ? 'Please wait...' : 'Change Picture'}
          </label>
          <input id="avatar-upload" type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Full Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 border rounded-md" required />
        </div>
        {currentUser.role === 'mentor' && (
          <>
            <div className="mb-4">
              <label className="block text-gray-700">Skills (comma-separated)</label>
              <input type="text" value={skills} onChange={(e) => setSkills(e.target.value)} className="w-full px-3 py-2 border rounded-md" placeholder="e.g., React, Node.js, UI/UX" />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700">Biography</label>
              <textarea value={bio} onChange={(e) => setBio(e.target.value)} className="w-full px-3 py-2 border rounded-md" rows="5" placeholder="Tell mentees a little about yourself..."></textarea>
            </div>
          </>
        )}
        <div className="flex gap-4">
          <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700">Save Changes</button>
          <button type="button" onClick={() => navigate(currentUser.role === 'mentor' ? '/mentor-dashboard' : '/mentee-dashboard')} className="w-full bg-gray-300 text-gray-800 py-2 rounded-md hover:bg-gray-400">Cancel</button>
        </div>
      </form>

      <div className="mt-8 border-t-2 border-red-200 pt-6">
        <h3 className="text-lg font-bold text-red-700">Danger Zone</h3>
        <p className="text-gray-600 mt-2">
          Deleting your account is a permanent action. All your data, including sessions and profile information, will be removed. This cannot be undone.
        </p>
        <button
          onClick={handleDeleteAccount}
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
        >
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default EditProfile;