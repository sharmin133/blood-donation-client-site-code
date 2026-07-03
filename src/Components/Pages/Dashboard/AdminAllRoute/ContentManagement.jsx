import React, { useEffect, useRef, useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaPlus, FaTrash, FaEdit, FaUpload, FaUndo, FaNewspaper, FaEllipsisV } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { AuthContext } from '../../../context/AuthContext';
import Pagination from '../../../Pagination/Pagination';

const STATUS_STYLES = {
  published: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  draft: 'bg-amber-100 text-amber-700 border-amber-200',
};

const ActionMenu = ({ blog, userRole, onStatusToggle, onEdit, onDelete }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const runAndClose = (fn) => {
    fn();
    setOpen(false);
  };

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-8 h-8 flex items-center justify-center rounded-full border border-red-100
                   text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
        aria-label="Actions"
      >
        <FaEllipsisV className="text-xs" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white border border-red-100 shadow-xl z-20 overflow-hidden">
          <button
            onClick={() => runAndClose(() => onEdit(blog._id))}
            className="w-full flex items-center gap-2 text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition cursor-pointer"
          >
            <FaEdit className="text-xs" /> Edit Blog
          </button>

          {userRole === 'admin' && (
            <button
              onClick={() => runAndClose(() => onStatusToggle(blog._id, blog.status))}
              className="w-full flex items-center gap-2 text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition cursor-pointer border-t border-red-50"
            >
              {blog.status === 'draft' ? <FaUpload className="text-xs" /> : <FaUndo className="text-xs" />}
              {blog.status === 'draft' ? 'Publish' : 'Unpublish'}
            </button>
          )}

          {userRole === 'admin' && (
            <button
              onClick={() => runAndClose(() => onDelete(blog._id))}
              className="w-full flex items-center gap-2 text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition cursor-pointer border-t border-red-50"
            >
              <FaTrash className="text-xs" /> Delete Blog
            </button>
          )}
        </div>
      )}
    </div>
  );
};

const ContentManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState('all');
  const [userRole, setUserRole] = useState('');
  const [visibleCount, setVisibleCount] = useState(7);
  const batchSize = 7;

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserRole = async () => {
      if (user?.email) {
        try {
          const res = await axios.get(`https://blood-donation-vert.vercel.app/users/email/${user.email}`);
          setUserRole(res.data.role);
        } catch (error) {
          console.log(error);
          toast.error('Failed to fetch user role');
        }
      }
    };
    fetchUserRole();
  }, [user?.email]);

  const fetchBlogs = async () => {
    try {
      const res = await axios.get('https://blood-donation-vert.vercel.app/blogs');
      setBlogs(res.data);
    } catch (err) {
      console.log(err);
      toast.error('Failed to fetch blogs');
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
    if (userRole !== 'admin') return;
    try {
      await axios.delete(`https://blood-donation-vert.vercel.app/blogs/${id}`);
      toast.success('Blog deleted');
      fetchBlogs();
    } catch (err) {
      console.log(err);
      toast.error('Failed to delete blog');
    }
  };

  const handleStatusToggle = async (id, currentStatus) => {
    if (userRole !== 'admin') return;
    const newStatus = currentStatus === 'draft' ? 'published' : 'draft';
    try {
      await axios.patch(`https://blood-donation-vert.vercel.app/blogs/${id}`, { status: newStatus });
      toast.success(`Blog ${newStatus}`);
      fetchBlogs();
    } catch (err) {
      console.log(err);
      toast.error('Failed to update status');
    }
  };

  const filteredBlogs = filter === 'all' ? blogs : blogs.filter((blog) => blog.status === filter);
  const currentBlogs = filteredBlogs.slice(0, visibleCount);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
        <div>
          <span className="inline-flex items-center gap-2 bg-red-50 text-red-700 text-xs font-semibold
                            tracking-widest uppercase px-4 py-1.5 rounded-full mb-2 border border-red-200">
            <FaNewspaper className="text-red-500" /> Content Management
          </span>
          <h2 className="text-3xl font-bold text-gray-900">All Blogs</h2>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setVisibleCount(batchSize);
            }}
            className="px-4 py-2.5 rounded-lg border border-red-100 bg-white text-gray-800 font-medium
                       focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-400 transition cursor-pointer"
          >
            <option value="all">All Blogs</option>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>

          <button
            onClick={() => navigate('/dashboard/content-management/add-blog')}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold
                       px-4 py-2.5 rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            <FaPlus className="text-xs" /> Add Blog
          </button>
        </div>
      </div>

      {/* Table */}
      {currentBlogs.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-red-100">
          <p className="text-gray-500">No blogs found.</p>
        </div>
      ) : (
        <div className="rounded-2xl border border-red-100 shadow-md bg-white overflow-hidden">
          <div className="overflow-auto max-h-[520px]">
            <table className="w-full text-sm table-fixed min-w-[760px]">
              <thead className="sticky top-0 z-10">
                <tr className="bg-gradient-to-r from-red-600 to-red-800 text-white">
                  <th className="px-4 py-3.5 text-left font-semibold w-20">Image</th>
                  <th className="px-4 py-3.5 text-left font-semibold w-1/3">Title</th>
                  <th className="px-4 py-3.5 text-left font-semibold w-28">Status</th>
                  <th className="px-4 py-3.5 text-left font-semibold w-32">Created At</th>
                  <th className="px-4 py-3.5 text-right font-semibold w-20">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentBlogs.map((blog, idx) => (
                  <tr
                    key={blog._id}
                    className={`border-t border-red-50 h-[65px] ${idx % 2 === 1 ? 'bg-red-50/40' : 'bg-white'} hover:bg-red-50 transition-colors`}
                  >
                    <td className="px-4 py-3">
                      <img
                        src={blog.thumbnail}
                        alt="thumb"
                        className="w-10 h-10 rounded-full object-cover border border-red-100"
                      />
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900 truncate">{blog.title}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block text-xs font-semibold uppercase px-2.5 py-1 rounded-full border capitalize ${
                        STATUS_STYLES[blog.status] || 'bg-gray-100 text-gray-600 border-gray-200'
                      }`}>
                        {blog.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-600 truncate">
                      {new Date(blog.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <ActionMenu
                        blog={blog}
                        userRole={userRole}
                        onStatusToggle={handleStatusToggle}
                        onEdit={(id) => navigate(`/dashboard/content-management/edit-blog/${id}`)}
                        onDelete={handleDelete}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* See More */}
      <Pagination
        total={filteredBlogs.length}
        visible={visibleCount}
        onSeeMore={() => setVisibleCount((c) => c + batchSize)}
        batchSize={batchSize}
      />
    </div>
  );
};

export default ContentManagement;