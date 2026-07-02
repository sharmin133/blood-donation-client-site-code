import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router';
import axios from 'axios';
import { FaArrowLeft, FaTint, FaNewspaper } from 'react-icons/fa';

const BlogsDetailsPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Montenegrin+Gothic+One&display=swap';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`https://blood-donation-vert.vercel.app/blogs/${id}`);
        if (res.data.status === 'published') {
          setBlog(res.data);
        } else {
          setBlog(null);
        }
      } catch (err) {
        console.error('Failed to load blog', err);
        setBlog(null);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <section className="relative bg-gradient-to-b from-red-50 via-white to-red-50 px-4 py-16 min-h-screen">
        <div className="max-w-4xl mx-auto animate-pulse">
          <div className="h-5 bg-red-200 rounded w-32 mb-8" />
          <div className="h-80 bg-red-200 rounded-2xl mb-8" />
          <div className="h-8 bg-red-200 rounded w-3/4 mb-4" />
          <div className="space-y-3">
            <div className="h-4 bg-red-200 rounded w-full" />
            <div className="h-4 bg-red-200 rounded w-full" />
            <div className="h-4 bg-red-200 rounded w-5/6" />
          </div>
        </div>
      </section>
    );
  }

  // Not found / unpublished state
  if (!blog) {
    return (
      <section className="relative bg-gradient-to-b from-red-50 via-white to-red-50 px-4 py-24 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto rounded-full bg-red-100 border border-red-200
                          flex items-center justify-center text-red-500 text-2xl mb-4">
            <FaNewspaper />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Blog Not Found</h2>
          <p className="text-gray-500 mb-6">
            This story may be unpublished, removed, or the link is incorrect.
          </p>
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 bg-red-700 text-white font-semibold
                       px-6 py-3 rounded-full shadow-md hover:bg-red-800 transition-colors cursor-pointer"
          >
            <FaArrowLeft className="text-sm" /> Back to Stories
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="relative bg-gradient-to-b from-red-50 via-white to-red-50 px-4 md:px-12 py-16 overflow-hidden">

      {/* decorative background glow */}
      <div className="absolute -top-10 -right-10 w-72 h-72 bg-red-300/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-300/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto">

        {/* Back link */}
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 text-red-700 font-semibold text-sm
                     hover:text-red-800 hover:gap-3 transition-all mb-8"
        >
          <FaArrowLeft className="text-xs" /> Back to Stories
        </Link>

        {/* Hero image */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-8">
          <img
            src={blog.thumbnail}
            alt={blog.title}
            className="w-full h-64 md:h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 bg-white/95
                           backdrop-blur-sm text-red-700 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
            <FaTint className="text-red-500" /> Blog
          </span>

          {/* Title overlaid on image bottom for stronger visual impact */}
          <h1
            className="absolute bottom-0 left-0 right-0 text-white text-2xl md:text-4xl
                       leading-tight p-6 md:p-8"
            style={{ fontFamily: "'Montenegrin Gothic One', serif", textShadow: '0 2px 12px rgba(0,0,0,0.5)' }}
          >
            {blog.title}
          </h1>
        </div>

        {/* Content card — explicit colors, no dependency on a typography plugin */}
        <div className="bg-white border border-red-100 rounded-2xl shadow-md p-6 md:p-10">
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center">
          <Link
            to="/blogs"
            className="inline-flex items-center gap-2 bg-red-700 text-white font-semibold
                       px-8 py-3.5 rounded-full shadow-lg hover:bg-red-800 transition-colors cursor-pointer"
          >
            <FaArrowLeft className="text-sm" /> Explore More Stories
          </Link>
        </div>
      </div>

      {/* Explicit styling for the injected HTML content — doesn't rely on the Tailwind Typography plugin */}
      <style>{`
        .blog-content {
          color: #374151;
          font-size: 1.05rem;
          line-height: 1.85;
        }
        .blog-content p {
          margin-bottom: 1.25rem;
          color: #374151;
        }
        .blog-content h1, .blog-content h2, .blog-content h3, .blog-content h4 {
          color: #111827;
          font-weight: 700;
          margin-top: 1.75rem;
          margin-bottom: 0.75rem;
          line-height: 1.3;
        }
        .blog-content h1 { font-size: 1.75rem; }
        .blog-content h2 { font-size: 1.5rem; }
        .blog-content h3 { font-size: 1.25rem; }
        .blog-content a {
          color: #b91c1c;
          text-decoration: underline;
        }
        .blog-content strong { color: #111827; }
        .blog-content ul, .blog-content ol {
          margin: 1rem 0 1.25rem 1.5rem;
          color: #374151;
        }
        .blog-content li { margin-bottom: 0.5rem; }
        .blog-content ul { list-style: disc; }
        .blog-content ol { list-style: decimal; }
        .blog-content img {
          border-radius: 0.75rem;
          margin: 1.5rem 0;
          width: 100%;
          height: auto;
        }
        .blog-content blockquote {
          border-left: 4px solid #dc2626;
          background: #fef2f2;
          padding: 0.75rem 1.25rem;
          margin: 1.5rem 0;
          color: #7f1d1d;
          font-style: italic;
          border-radius: 0.375rem;
        }
      `}</style>
    </section>
  );
};

export default BlogsDetailsPage;