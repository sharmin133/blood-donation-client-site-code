import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router'; 
import axios from 'axios';

const BlogsDetailsPage = () => {
  const { id } = useParams(); 
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    // Fetch blog by ID
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`https://blood-donation-vert.vercel.app/blogs/${id}`);
        // Check if it's published
        if (res.data.status === 'published') {
          setBlog(res.data);
        } else {
          setBlog(null); 
        }
      } catch (err) {
        console.log(err)
        console.error('Failed to load blog');
        setBlog(null);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) return <div className="text-center py-10 text-gray-600">Blog not found or unpublished.</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 min-h-screen py-10">
      <img src={blog.thumbnail} alt="Thumbnail" className="w-full h-80 object-cover rounded-md mb-6" />
      <h1 className="text-3xl font-bold text-red-600 m-4">{blog.title}</h1>
      <div
        className="prose dark:prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </div>
  );
};

export default BlogsDetailsPage;
