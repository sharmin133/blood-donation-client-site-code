import React, { useRef, useState } from 'react';
import JoditEditor from 'jodit-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router';

const AddBlogPage = () => {
  const editor = useRef(null);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    thumbnailFile: null,
  });

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'thumbnail') {
      setFormData({ ...formData, thumbnailFile: files[0] });
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

  setIsLoading(true); // ✅ Start loading immediately

  try {
    // Upload image to imgBB
    const imageData = new FormData();
    imageData.append('image', formData.thumbnailFile);

    const imgbbRes = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`,
      imageData
    );

    const thumbnailUrl = imgbbRes.data.data.display_url;

    // Save blog to database
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
    setIsLoading(false); // ✅ Stop loading in both success or failure
  }
};


  return (
    <div className="max-w-4xl mx-auto p-6 my-10 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      <ToastContainer position="top-center" autoClose={3000} />
      <h2 className="text-3xl font-bold mb-6 text-red-700 dark:text-red-500 text-center">
        Add Blog 📝
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-white mb-1">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="input input-bordered w-full"
            placeholder="Blog Title"
            required
          />
        </div>

        {/* Thumbnail Image */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-white mb-1">
            Thumbnail Image
          </label>
          <input
            type="file"
            name="thumbnail"
            accept="image/*"
            onChange={handleChange}
            className="w-full"
            required
          />
        </div>

        {/* Rich Text Editor */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-white mb-1">
            Blog Content
          </label>
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
          <div>

              <button
  type="submit"
  disabled={isLoading}
  className={`bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg ${
    isLoading && 'opacity-50 cursor-not-allowed'
  }`}
>
  {isLoading ? "Creating..." : "Create Blog"}
</button>
        </div>
      </form>
    </div>
  );
};



export default AddBlogPage;