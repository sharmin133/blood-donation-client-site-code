import React, { useRef, useState } from 'react';
import JoditEditor from 'jodit-react';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { FaNewspaper, FaImage } from 'react-icons/fa';

const AddBlogPage = () => {
  const editor = useRef(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    thumbnailFile: null,
  });

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'thumbnail') {
      const file = files[0];
      setFormData({ ...formData, thumbnailFile: file });
      if (file) setPreviewUrl(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    if (!formData.title || !formData.content || !formData.thumbnailFile) {
      toast.error('Please fill in all fields.');
      return;
    }

    setIsLoading(true);

    try {
      const imageData = new FormData();
      imageData.append('image', formData.thumbnailFile);

      const imgbbRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`,
        imageData
      );

      const thumbnailUrl = imgbbRes.data.data.display_url;

      const blogData = {
        title: formData.title,
        content: formData.content,
        thumbnail: thumbnailUrl,
        status: 'draft',
        createdAt: new Date(),
      };

      await axios.post('https://blood-donation-vert.vercel.app/blogs', blogData);

      toast.success('Blog created successfully!');

      setTimeout(() => {
        navigate('/dashboard/content-management');
      }, 1000);
    } catch (error) {
      console.error(error);
      toast.error('Failed to create blog.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Heading */}
      <div className="mb-6">
        <span className="inline-flex items-center gap-2 bg-red-50 text-red-700 text-xs font-semibold
                          tracking-widest uppercase px-4 py-1.5 rounded-full mb-2 border border-red-200">
          <FaNewspaper className="text-red-500" /> Content Management
        </span>
        <h2 className="text-3xl font-bold text-gray-900">Add Blog</h2>
      </div>

      {/* Card */}
      <div className="rounded-2xl border border-red-100 shadow-md bg-white p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold mb-1.5 text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-lg border border-red-100 bg-white text-gray-800
                         focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-400 transition"
              placeholder="Blog Title"
              required
            />
          </div>

          {/* Thumbnail Image */}
          <div>
            <label className="block text-sm font-semibold mb-1.5 text-gray-700">Thumbnail Image</label>
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
              required
            />
            {previewUrl && (
              <div className="mt-3">
                <img
                  src={previewUrl}
                  alt="Thumbnail preview"
                  className="w-32 h-20 object-cover rounded-lg border border-red-100"
                />
              </div>
            )}
          </div>

          {/* Rich Text Editor */}
          <div>
            <label className="block text-sm font-semibold mb-1.5 text-gray-700">Blog Content</label>
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
              disabled={isLoading}
              className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-60
                         disabled:cursor-not-allowed text-white font-semibold px-6 py-2.5 rounded-lg
                         shadow-sm transition-colors cursor-pointer"
            >
              {isLoading ? 'Creating...' : 'Create Blog'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBlogPage;