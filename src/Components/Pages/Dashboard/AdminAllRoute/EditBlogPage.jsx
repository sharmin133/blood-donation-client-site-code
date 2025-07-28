import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';
import JoditEditor from 'jodit-react';
import { toast, ToastContainer } from 'react-toastify';

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
      setThumbnailFile(files[0]);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    let updatedThumbnailUrl = formData.thumbnail;

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

    try {
      await axios.patch(`https://blood-donation-vert.vercel.app/blogs/${id}`, updatedBlog);
      toast.success("Blog updated!");
      setTimeout(() => navigate("/dashboard/content-management"), 1000);
    } catch (err) {
        console.log(err)
      toast.error("Failed to update blog.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 my-10 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      <ToastContainer />
      <h2 className="text-3xl font-bold mb-6 text-red-700 dark:text-red-500 text-center">
        Edit Blog ✏️
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-white">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="input input-bordered w-full"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-white">Thumbnail</label>
          <input
            type="file"
            name="thumbnail"
            accept="image/*"
            onChange={handleChange}
            className="w-full"
          />
          <div className="mt-2">
            <img src={formData.thumbnail} alt="Current Thumbnail" className="w-32 h-20 object-cover rounded" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-white">Content</label>
          {/* <JoditEditor
            ref={editor}
            value={formData.content}
            onChange={newContent => setFormData({ ...formData, content: newContent })}
            config={{ height: 300 }}
          /> */}

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

        <div className="text-center">
          <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg">
            Update Blog
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBlogPage;
