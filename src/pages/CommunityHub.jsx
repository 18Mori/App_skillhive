// src/pages/CommunityHub.jsx
import React, { useState, useEffect } from 'react';

const CommunityHub = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem('communityPosts')) || [];
    setPosts(storedPosts);
    setLoading(false);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;
    
    const post = {
      id: Date.now().toString(),
      content: newPost,
      timestamp: new Date().toISOString(),
      author: 'Current User' // Would be replaced with actual user
    };
    
    const updatedPosts = [post, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem('communityPosts', JSON.stringify(updatedPosts));
    setNewPost('');
  };

  if (loading) return <div className="text-center py-12">Loading community posts...</div>;

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Community Hub</h1>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="Ask a question or share something with the community..."
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-3"
          rows="3"
        ></textarea>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700"
        >
          Post to Community
        </button>
      </form>
      
      <div className="space-y-6">
        {posts.length > 0 ? (
          posts.map(post => (
            <div key={post.id} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-start mb-4">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12" />
                <div className="ml-4">
                  <p className="font-semibold">{post.author}</p>
                  <p className="text-gray-500 text-sm">
                    {new Date(post.timestamp).toLocaleString()}
                  </p>
                </div>
              </div>
              <p className="text-gray-700">{post.content}</p>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <p className="text-gray-500">No posts yet. Be the first to share!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CommunityHub;