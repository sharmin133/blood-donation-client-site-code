import { useContext, useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import {
  FaUser,
  FaEnvelope,
  FaMapMarkerAlt,
  FaTint,
  FaImage,
  FaEdit,
  FaSave,
  FaTimes,
} from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inputClass =
  'w-full pl-11 pr-4 py-2.5 rounded-lg border border-red-100 bg-white text-gray-800 ' +
  'focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-400 transition ' +
  'disabled:bg-red-50 disabled:text-gray-500 disabled:cursor-not-allowed';

const labelClass = 'block text-sm font-semibold text-gray-700 mb-1.5';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState({});

  const { data: userData, isLoading } = useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => {
      const res = await axios.get(`https://blood-donation-vert.vercel.app/users`);
      return res.data.find((u) => u.email === user?.email);
    },
    enabled: !!user?.email,
  });

  const mutation = useMutation({
    mutationFn: async (updatedData) => {
      const userId = updatedData._id;

      if (!userId) {
        throw new Error('User ID (_id) is missing.');
      }

      const updateFields = { ...updatedData };
      delete updateFields._id;
      delete updateFields.email;

      return axios.put(`https://blood-donation-vert.vercel.app/users/${userId}`, updateFields);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['userProfile']);
      setEditable(false);
      toast.success('Profile updated successfully!');
    },
    onError: (error) => {
      toast.error('Failed to update profile');
      console.error(error);
    },
  });

  useEffect(() => {
    if (userData) setFormData(userData);
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const handleCancel = () => {
    setFormData(userData);
    setEditable(false);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto py-10">
        <div className="bg-white rounded-3xl shadow-xl border border-red-100 p-8 animate-pulse">
          <div className="w-24 h-24 rounded-full bg-red-100 mx-auto mb-6" />
          <div className="h-6 bg-red-100 rounded w-1/2 mx-auto mb-8" />
          <div className="space-y-4">
            <div className="h-11 bg-red-100 rounded-lg" />
            <div className="h-11 bg-red-100 rounded-lg" />
            <div className="h-11 bg-red-100 rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  const fields = [
    { name: 'name', icon: <FaUser />, placeholder: 'Name', type: 'text', fullWidth: true },
    { name: 'email', icon: <FaEnvelope />, placeholder: 'Email', type: 'email', alwaysDisabled: true, fullWidth: true },
    { name: 'district', icon: <FaMapMarkerAlt />, placeholder: 'District', type: 'text' },
    { name: 'upazila', icon: <FaMapMarkerAlt />, placeholder: 'Upazila', type: 'text' },
    { name: 'bloodGroup', icon: <FaTint />, placeholder: 'Blood Group', type: 'text' },
    { name: 'photoURL', icon: <FaImage />, placeholder: 'Avatar URL', type: 'text', fullWidth: true },
  ];

  return (
    <div className="max-w-2xl mx-auto py-6">
      <ToastContainer position="top-center" autoClose={3000} />

      <div className="relative bg-white rounded-3xl shadow-xl border border-red-100 overflow-hidden">

        {/* Header strip */}
        <div className="relative bg-gradient-to-r from-red-600 to-red-800 px-8 pt-8 pb-14 text-center overflow-hidden">
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <h2
            className="relative text-2xl font-bold text-white"
          >
            My Profile
          </h2>
        </div>

        {/* Avatar — overlapping the header/body seam */}
        <div className="relative flex justify-center -mt-12 mb-2">
          <img
            src={formData.photoURL || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(formData.name || 'User')}
            alt={formData.name}
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg bg-red-50"
          />
        </div>

        <div className="px-8 pb-8 pt-2">
          {/* Edit / Save / Cancel controls */}
          <div className="flex justify-end gap-2 mb-6">
            {!editable ? (
              <button
                onClick={() => setEditable(true)}
                className="inline-flex items-center gap-2 bg-red-700 hover:bg-red-800 text-white
                           font-semibold px-5 py-2 rounded-full shadow-md transition-colors cursor-pointer text-sm"
              >
                <FaEdit className="text-xs" /> Edit
              </button>
            ) : (
              <>
                <button
                  onClick={handleCancel}
                  type="button"
                  className="inline-flex items-center gap-2 bg-white border-2 border-gray-200 text-gray-700
                             font-semibold px-5 py-2 rounded-full hover:border-red-300 hover:text-red-700
                             transition-colors cursor-pointer text-sm"
                >
                  <FaTimes className="text-xs" /> Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={mutation.isPending}
                  className="inline-flex items-center gap-2 bg-red-700 hover:bg-red-800 text-white
                             font-semibold px-5 py-2 rounded-full shadow-md transition-colors cursor-pointer
                             text-sm disabled:opacity-60"
                >
                  <FaSave className="text-xs" /> {mutation.isPending ? 'Saving...' : 'Save'}
                </button>
              </>
            )}
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {fields.map(({ name, icon, placeholder, type, alwaysDisabled, fullWidth }) => (
                <div key={name} className={fullWidth ? 'sm:col-span-2' : ''}>
                  <label className={labelClass}>{placeholder}</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-red-400 text-sm">
                      {icon}
                    </span>
                    <input
                      type={type}
                      name={name}
                      value={formData[name] || ''}
                      disabled={alwaysDisabled || !editable}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder={placeholder}
                    />
                  </div>
                </div>
              ))}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;