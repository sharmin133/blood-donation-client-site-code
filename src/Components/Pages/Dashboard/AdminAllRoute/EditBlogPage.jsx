import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';
import JoditEditor from 'jodit-react';
import { toast } from 'react-toastify';
import { FaEdit, FaImage } from 'react-icons/fa';

const EditBlogPage = () => {
  const { id } = useParams();
  const editor = useRef(null);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    thumbnail: '',
  });

  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    axios.get(`https://blood-donation-vert.vercel.app/blogs`)
      .then(res => {
        const blog = res.data.find(item => item._id === id);
        if (blog) {
          setFormData({
            title: blog.title,
            content: blog.content,
            thumbnail: blog.thumbnail
          });
        }
      });
  }, [id]);

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'thumbnail') {
      const file = files[0];
      setThumbnailFile(file);
      if (file) setPreviewUrl(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setSubmitting(true);

    let updatedThumbnailUrl = formData.thumbnail;

    try {
      if (thumbnailFile) {
        const imageData = new FormData();
        imageData.append('image', thumbnailFile);

        const imgbbRes = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`,
          imageData
        );

        updatedThumbnailUrl = imgbbRes.data.data.display_url;
      }

      const updatedBlog = {
        title: formData.title,
        content: formData.content,
        thumbnail: updatedThumbnailUrl,
      };

      await axios.patch(`https://blood-donation-vert.vercel.app/blogs/${id}`, updatedBlog);
      toast.success("Blog updated!");
      setTimeout(() => navigate("/dashboard/content-management"), 1000);
    } catch (err) {
      console.log(err);
      toast.error("Failed to update blog.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto">
      {/* Heading */}
      <div className="mb-6">
        <span className="inline-flex items-center gap-2 bg-red-50 text-red-700 text-xs font-semibold
                          tracking-widest uppercase px-4 py-1.5 rounded-full mb-2 border border-red-200">
          <FaEdit className="text-red-500" /> Content Management
        </span>
        <h2 className="text-3xl font-bold text-gray-900">Edit Blog</h2>
      </div>

      {/* Card */}
      <div className="rounded-2xl border border-red-100 shadow-md bg-white p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-1.5 text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-red-100 bg-white text-gray-800
                         focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-400 transition"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1.5 text-gray-700">Thumbnail</label>
            <label
              htmlFor="thumbnail-upload"
              className="flex items-center gap-2 w-fit px-4 py-2.5 rounded-lg border border-red-100
                         bg-white text-red-700 font-medium hover:bg-red-50 transition cursor-pointer"
            >
              <FaImage className="text-xs" /> Choose Image
            </label>
            <input
              id="thumbnail-upload"
              type="file"
              name="thumbnail"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
            />
            <div className="mt-3">
              <img
                src={previewUrl || formData.thumbnail}
                alt="Current Thumbnail"
                className="w-32 h-20 object-cover rounded-lg border border-red-100"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1.5 text-gray-700">Content</label>
            <div className="rounded-lg border border-red-100 overflow-hidden">
              <JoditEditor
                ref={editor}
                value={formData.content}
                onChange={newContent => setFormData({ ...formData, content: newContent })}
                config={{
                  style: {
                    color: 'black',
                    backgroundColor: 'white',
                  },
                  theme: 'default',
                  height: 300
                }}
              />
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-60
                         disabled:cursor-not-allowed text-white font-semibold px-6 py-2.5 rounded-lg
                         shadow-sm transition-colors cursor-pointer"
            >
              {submitting ? 'Updating...' : 'Update Blog'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBlogPage;