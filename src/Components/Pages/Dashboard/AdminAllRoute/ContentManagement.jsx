import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaPlus, FaTrash, FaEdit, FaUpload, FaUndo } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

const ContentManagement = () => {
  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  const fetchBlogs = async () => {
    try {
      const res = await axios.get('http://localhost:3000/blogs');
      setBlogs(res.data);
    } catch (err) {
      console.log(err)
      toast.error('Failed to fetch blogs');
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#e3342f',
    cancelButtonColor: '#6c757d',
    confirmButtonText: 'Yes, delete it!'
  });

  if (result.isConfirmed) {
    try {
      await axios.delete(`http://localhost:3000/blogs/${id}`);
      await fetchBlogs();
      Swal.fire('Deleted!', 'Blog has been deleted.', 'success');
    } catch (err) {
      console.log(err);
      Swal.fire('Error!', 'Failed to delete blog.', 'error');
    }
  }
};

  const handleStatusToggle = async (id, currentStatus) => {
  const newStatus = currentStatus === 'draft' ? 'published' : 'draft';

  const result = await Swal.fire({
    title: `Are you sure you want to ${newStatus} this blog?`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#38a169',
    cancelButtonColor: '#6c757d',
    confirmButtonText: `Yes, ${newStatus}`
  });

  if (result.isConfirmed) {
    try {
      await axios.patch(`http://localhost:3000/blogs/${id}`, { status: newStatus });
      await fetchBlogs();
      Swal.fire('Success!', `Blog ${newStatus} successfully.`, 'success');
    } catch (err) {
      console.log(err);
      Swal.fire('Error!', 'Failed to update blog status.', 'error');
    }
  }
};

  const filteredBlogs =
    filter === 'all' ? blogs : blogs.filter((blog) => blog.status === filter);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-red-700 dark:text-red-500">
          Content Management 📝
        </h1>
        <button
          onClick={() => navigate('/dashboard/content-management/add-blog')}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg shadow"
        >
          <FaPlus /> Add Blog
        </button>
      </div>

      <div className="mb-4">
        <label className="font-medium text-gray-700 dark:text-white mr-2">
          Filter by status:
        </label>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="select select-bordered"
        >
          <option value="all">All</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr className="text-red-700 dark:text-red-400">
              <th>Thumbnail</th>
              <th>Title</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBlogs.map((blog) => (
              <tr key={blog._id}>
                <td>
                  <img
                    src={blog.thumbnail}
                    alt="thumb"
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td>{blog.title}</td>
                <td>
                  <span className={`badge ${blog.status === 'published' ? 'badge-success' : 'badge-warning'}`}>
                    {blog.status}
                  </span>
                </td>
                <td>{new Date(blog.createdAt).toLocaleDateString()}</td>
                <td className="flex gap-2">
                  <button
                    onClick={() => handleStatusToggle(blog._id, blog.status)}
                    className={`btn btn-sm ${blog.status === 'draft' ? 'btn-success' : 'btn-warning'}`}
                  >
                    {blog.status === 'draft' ? <FaUpload /> : <FaUndo />}
                  </button>
                  <button
                    onClick={() => navigate(`/dashboard/content-management/edit-blog/${blog._id}`)}
                    className="btn btn-sm btn-info"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    className="btn btn-sm btn-error"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContentManagement;