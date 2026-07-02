import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import { FaTint, FaArrowRight, FaNewspaper } from 'react-icons/fa';

const BlogsPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Montenegrin+Gothic+One&display=swap';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get('https://blood-donation-vert.vercel.app/blogs');
        const publishedBlogs = res.data.filter((blog) => blog.status === 'published');
        setBlogs(publishedBlogs);
      } catch (error) {
        console.error('Failed to fetch blogs', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <section className="relative bg-gradient-to-b from-white via-red-50 to-white px-4 md:px-12 py-20 min-h-screen overflow-hidden">

      {/* decorative background glow */}
      <div className="absolute -top-10 -right-10 w-72 h-72 bg-red-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center gap-2 bg-red-50 text-red-700 text-xs font-semibold
                            tracking-widest uppercase px-4 py-1.5 rounded-full mb-5 border border-red-200">
            <FaNewspaper className="text-red-500" /> Stories &amp; Updates
          </span>
          <h1
            className="text-3xl md:text-5xl text-gray-900 uppercase leading-[0.95]"
            style={{ fontFamily: "'Montenegrin Gothic One', serif" }}
          >
            Blood Donation<br className="hidden md:block" />{' '}
            <span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
              Stories
            </span>
          </h1>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-2xl bg-white border border-red-100 shadow-md overflow-hidden">
                <div className="h-48 bg-red-100 animate-pulse" />
                <div className="p-6 space-y-3">
                  <div className="h-5 bg-red-100 rounded animate-pulse w-3/4" />
                  <div className="h-4 bg-red-100 rounded animate-pulse w-full" />
                  <div className="h-4 bg-red-100 rounded animate-pulse w-5/6" />
                  <div className="h-4 bg-red-200 rounded animate-pulse w-24 mt-4" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error / empty state (also shown if the API request fails) */}
        {!loading && blogs.length === 0 && (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto rounded-full bg-red-50 border border-red-200
                            flex items-center justify-center text-red-400 text-2xl mb-4">
              <FaNewspaper />
            </div>
            <p className="text-gray-500">
              No stories to show right now — check back soon, or refresh the page.
            </p>
          </div>
        )}

        {/* Blog grid */}
        {!loading && blogs.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, i) => (
              <div
                key={blog._id}
                className="group relative bg-gradient-to-br from-white via-red-50/50 to-red-100/40
                           rounded-2xl border border-red-100 shadow-md hover:shadow-2xl
                           flex flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1.5"
                data-aos="fade-up"
                data-aos-delay={i * 60}
              >
                {/* Thumbnail */}
                <div className="relative overflow-hidden h-48">
                  <img
                    src={blog.thumbnail}
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 inline-flex items-center gap-1.5 bg-white/90
                                   backdrop-blur-sm text-red-700 text-xs font-semibold px-3 py-1 rounded-full">
                    <FaTint className="text-red-500" /> Blog
                  </span>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-xl font-bold text-gray-900 mb-2 leading-snug group-hover:text-red-700 transition-colors">
                    {blog.title}
                  </h2>
                  <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                    {blog.content.replace(/<[^>]+>/g, '').slice(0, 100)}...
                  </p>
                  <Link
                    to={`/blogs/${blog._id}`}
                    className="inline-flex items-center gap-2 text-red-700 font-semibold
                               hover:text-red-800 hover:gap-3 transition-all w-fit"
                  >
                    Read More <FaArrowRight className="text-sm" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogsPage;