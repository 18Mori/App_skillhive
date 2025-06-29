// src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Home = ({ currentUser }) => {
  const navigate = useNavigate();
  const [featuredMentors, setFeaturedMentors] = useState([]);
  const [popularSkills, setPopularSkills] = useState([]);
  const [stats, setStats] = useState({ mentors: 0, mentees: 0, sessions: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      // Load users from localStorage
      const users = JSON.parse(localStorage.getItem('users')) || [];
      
      // Filter featured mentors
      const mentors = users.filter(user => user.role === 'mentor').slice(0, 4);
      setFeaturedMentors(mentors);
      
      // Mock popular skills
      setPopularSkills([
        { name: 'Web Development', sessions: 128 },
        { name: 'Data Science', sessions: 95 },
        { name: 'UX Design', sessions: 87 },
        { name: 'Digital Marketing', sessions: 76 },
        { name: 'Project Management', sessions: 64 }
      ]);
      
      // Mock platform statistics
      const sessions = JSON.parse(localStorage.getItem('sessions')) || [];
      setStats({
        mentors: mentors.length,
        mentees: users.filter(u => u.role === 'mentee').length,
        sessions: sessions.length
      });
      
      setLoading(false);
    }, 800);
  }, []);

  const handleGetStarted = () => {
    if (currentUser) {
      navigate(currentUser.role === 'mentor' ? '/mentor-dashboard' : '/mentee-dashboard');
    } else {
      navigate('/signup');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-12 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Connect, Learn & Grow with Expert Mentors
              </h1>
              <p className="text-xl mb-8 opacity-90">
                SkillHive bridges the gap between learners and experts. Accelerate your career with personalized mentorship.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleGetStarted}
                  className="bg-white text-indigo-600 hover:bg-indigo-50 px-8 py-4 rounded-lg font-semibold text-lg transition duration-300 shadow-lg"
                >
                  {currentUser ? 'Go to Dashboard' : 'Get Started for Free'}
                </button>
                <Link
                  to="/community"
                  className="bg-transparent border-2 border-white hover:bg-white hover:text-indigo-600 px-8 py-4 rounded-lg font-semibold text-lg transition duration-300 text-center"
                >
                  Explore Community
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-80 h-80 md:w-96 md:h-96 flex items-center justify-center">
                  <span className="text-gray-500">Platform Preview</span>
                </div>
                <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-lg shadow-xl">
                  <div className="flex items-center">
                    <div className="bg-indigo-100 p-3 rounded-full mr-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-gray-800">{stats.sessions}+</p>
                      <p className="text-gray-600">Sessions Completed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-indigo-600 mb-2">{stats.mentors}+</div>
              <h3 className="text-xl font-semibold text-gray-800">Expert Mentors</h3>
              <p className="text-gray-600">Industry professionals ready to share knowledge</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-indigo-600 mb-2">{stats.mentees}+</div>
              <h3 className="text-xl font-semibold text-gray-800">Active Learners</h3>
              <p className="text-gray-600">Mentees developing new skills</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-indigo-600 mb-2">95%</div>
              <h3 className="text-xl font-semibold text-gray-800">Success Rate</h3>
              <p className="text-gray-600">Of learners achieve their goals</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-center mb-16 text-gray-800">How SkillHive Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="bg-indigo-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-indigo-600 text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Create Your Profile</h3>
              <p className="text-gray-600 mb-4">
                Sign up as a mentor or mentee. Share your skills, goals, and availability.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="bg-indigo-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-indigo-600 text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Connect with Experts</h3>
              <p className="text-gray-600 mb-4">
                Find the perfect match based on skills, availability, and learning goals.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow">
              <div className="bg-indigo-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-indigo-600 text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Achieve Your Goals</h3>
              <p className="text-gray-600 mb-4">
                Schedule sessions, track progress, and earn skill badges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Mentors */}
      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800">Featured Mentors</h2>
            <Link to="/community" className="text-indigo-600 hover:underline font-medium">
              View All Mentors →
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredMentors.map(mentor => (
              <div key={mentor.id} className="bg-gray-50 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />
                    <div className="ml-4">
                      <h3 className="font-bold text-lg">{mentor.name}</h3>
                      <div className="flex items-center mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="ml-1 text-gray-600">4.8 (24)</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {mentor.skills?.split(',').slice(0, 3).map((skill, i) => (
                        <span key={i} className="bg-indigo-100 text-indigo-800 text-xs px-3 py-1 rounded-full">
                          {skill.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-6 line-clamp-3">
                    {mentor.bio || 'Experienced professional passionate about sharing knowledge and helping others grow.'}
                  </p>
                  
                  <button 
                    onClick={() => navigate(currentUser ? `/mentee-dashboard?mentor=${mentor.id}` : '/login')}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg transition duration-300"
                  >
                    Request Session
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Skills */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Popular Learning Paths</h2>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="p-8">
                <h3 className="text-xl font-bold mb-6">Top Skills in Demand</h3>
                
                <div className="space-y-5">
                  {popularSkills.map((skill, index) => (
                    <div key={index} className="flex items-center">
                      <div className="text-lg font-bold text-indigo-600 w-10">{index + 1}</div>
                      <div className="flex-1">
                        <h4 className="font-medium">{skill.name}</h4>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                          <div 
                            className="bg-indigo-600 h-2 rounded-full" 
                            style={{ width: `${Math.min(100, skill.sessions)}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="text-gray-600">{skill.sessions} sessions</div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-8 text-white flex flex-col justify-center">
                <h3 className="text-2xl font-bold mb-4">Ready to Accelerate Your Learning?</h3>
                <p className="mb-6 opacity-90">
                  Join thousands of learners who are developing in-demand skills with personalized mentorship.
                </p>
                <div>
                  <button 
                    onClick={handleGetStarted}
                    className="bg-white text-indigo-600 hover:bg-indigo-50 px-6 py-3 rounded-lg font-semibold transition duration-300"
                  >
                    {currentUser ? 'Continue Learning' : 'Start Your Journey'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">What Our Users Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-gray-50 p-8 rounded-lg">
                <div className="flex items-center mb-4">
                  <div className="bg-gray-200 border-2 border-dashed rounded-xl w-12 h-12" />
                  <div className="ml-4">
                    <h4 className="font-bold">Alex Johnson</h4>
                    <p className="text-sm text-gray-600">Software Developer</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700">
                  "SkillHive transformed my career. My mentor helped me transition into UX design in just 3 months with personalized guidance."
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Skills?</h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
            Join SkillHive today and start your journey towards mastering new skills with expert guidance.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={handleGetStarted}
              className="bg-white text-indigo-600 hover:bg-indigo-50 px-8 py-4 rounded-lg font-semibold text-lg transition duration-300 shadow-lg"
            >
              {currentUser ? 'Go to Dashboard' : 'Get Started for Free'}
            </button>
            <Link
              to="/community"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-indigo-600 px-8 py-4 rounded-lg font-semibold text-lg transition duration-300"
            >
              Explore Community
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;