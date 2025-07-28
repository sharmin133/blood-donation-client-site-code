import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router';

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get('http://localhost:3000/blogs');
        const publishedBlogs = res.data.filter(blog => blog.status === 'published');
        setBlogs(publishedBlogs);
      } catch (error) {
        console.error('Failed to fetch blogs', error);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 min-h-screen py-8">
            <h1 className="text-3xl font-bold  mb-6 text-center">
        Explore Blood Donation Stories 🩸
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogs.map(blog => (
          <div key={blog._id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
            <img src={blog.thumbnail} alt="thumbnail" className="rounded-md h-48 w-full object-cover mb-4" />
            <h2 className="text-xl font-semibold text-red-600 mb-2">{blog.title}</h2>
            <p className="text-black dark:text-white  mb-4">
              {blog.content.replace(/<[^>]+>/g, '').slice(0, 100)}...
            </p>
            <Link
              to={`/blogs/${blog._id}`}
              className="text-white bg-red-600 px-3 py-1 rounded hover:bg-red-700"
            >
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};




export default BlogsPage;