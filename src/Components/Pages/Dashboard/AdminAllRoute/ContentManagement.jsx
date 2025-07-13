import React from 'react';
import { useNavigate } from 'react-router';
import { FaPlus } from 'react-icons/fa';

const ContentManagement = () => {
  const navigate = useNavigate();

  const handleAddBlog = () => {
    navigate('/dashboard/content-management/add-blog');
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Page Heading */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-red-700 dark:text-red-500">Content Management 📝</h1>
        <button
          onClick={handleAddBlog}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg shadow"
        >
          <FaPlus /> Add Blog
        </button>
      </div>

      {/* Optional: Display list of blogs (if you want to show them here too) */}
      <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow text-gray-700 dark:text-white">
        <p>This is your content management dashboard. You can add or manage blog posts from here.</p>
      </div>
    </div>
  );
};

export default ContentManagement;