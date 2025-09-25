import React, { useState } from 'react';
import { motion } from 'framer-motion';
import CommunityHeader from '../components/community/CommunityHeader';
import CommunityGlobalBackground from '../components/community/CommunityGlobalBackground';
import CommunityScrollProgress from '../components/community/CommunityScrollProgress';

function WritePostPage() {
  const [postContent, setPostContent] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  const availableTags = [
    'LinkedIn Tips', 'Content Creation', 'Personal Branding', 'Networking',
    'Career Growth', 'Entrepreneurship', 'Marketing', 'Leadership'
  ];

  const handleTagToggle = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the post data to your backend
    console.log('Post submitted:', { postTitle, postContent, selectedTags });
    alert('Post created successfully! (This is a demo)');
  };

  return (
    <div className="relative min-h-screen bg-black text-white">
      <CommunityScrollProgress />
      <CommunityGlobalBackground />
      <CommunityHeader />
      
      <div className="relative z-10 pt-24 pb-16">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6">
              Write Your <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">Post</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
              Share your insights with the LinkedOut community and help fellow creators grow.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={handleSubmit}
            className="bg-white/5 backdrop-blur-xl border border-yellow-400/20 rounded-3xl p-8 shadow-2xl"
          >
            {/* Post Title */}
            <div className="mb-8">
              <label htmlFor="title" className="block text-lg font-semibold mb-3 text-yellow-400">
                Post Title
              </label>
              <input
                type="text"
                id="title"
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
                placeholder="Enter your post title..."
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/50 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300"
                required
              />
            </div>

            {/* Post Content */}
            <div className="mb-8">
              <label htmlFor="content" className="block text-lg font-semibold mb-3 text-yellow-400">
                Post Content
              </label>
              <textarea
                id="content"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                placeholder="Share your thoughts, insights, or tips with the community..."
                rows={12}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-yellow-400/50 focus:ring-2 focus:ring-yellow-400/20 transition-all duration-300 resize-none"
                required
              />
              <div className="mt-2 text-sm text-gray-400">
                {postContent.length}/3000 characters
              </div>
            </div>

            {/* Tags */}
            <div className="mb-8">
              <label className="block text-lg font-semibold mb-3 text-yellow-400">
                Tags (Select up to 3)
              </label>
              <div className="flex flex-wrap gap-3">
                {availableTags.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleTagToggle(tag)}
                    disabled={selectedTags.length >= 3 && !selectedTags.includes(tag)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      selectedTags.includes(tag)
                        ? 'bg-yellow-400 text-black'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-end">
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 bg-white/10 text-gray-300 rounded-2xl font-semibold hover:bg-white/20 transition-all duration-300"
              >
                Save as Draft
              </motion.button>
              
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(250,204,21,0.3)" }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black rounded-2xl font-bold hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 shadow-lg"
              >
                Publish Post
              </motion.button>
            </div>
          </motion.form>

          {/* Writing Tips */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8"
          >
            <h3 className="text-2xl font-bold mb-6 text-yellow-400">
              💡 Writing Tips for LinkedIn Success
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-2 text-white">Hook Your Audience</h4>
                <p className="text-gray-300 text-sm">Start with a compelling first line that grabs attention and makes people want to read more.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-white">Add Value</h4>
                <p className="text-gray-300 text-sm">Share actionable insights, personal experiences, or industry knowledge that helps your audience.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-white">Use Stories</h4>
                <p className="text-gray-300 text-sm">Personal anecdotes and case studies make your content more relatable and memorable.</p>
              </div>
              <div>
                <h4 className="font-semibold mb-2 text-white">Call to Action</h4>
                <p className="text-gray-300 text-sm">End with a question or prompt that encourages engagement and discussion.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default WritePostPage;
