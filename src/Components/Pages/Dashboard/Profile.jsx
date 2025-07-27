import { useContext, useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const [editable, setEditable] = useState(false);
  const [formData, setFormData] = useState({});

  const { data: userData, isLoading } = useQuery({
    queryKey: ['userProfile'],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3000/users`);
      return res.data.find(u => u.email === user?.email);
    },
    enabled: !!user?.email,
  });

  const mutation = useMutation({
  mutationFn: async updatedData => {
    const userId = updatedData._id;  // safely get _id

    if (!userId) {
      throw new Error('User ID (_id) is missing.');
    }

    const updateFields = { ...updatedData };
    delete updateFields._id;
    delete updateFields.email;  // keep email read-only

    return axios.put(`http://localhost:3000/users/${userId}`, updateFields);
  },
  onSuccess: () => {
    queryClient.invalidateQueries(['userProfile']);
    setEditable(false);
  },
  onError: (error) => {
    alert('Failed to update profile');
    console.error(error);
  }
});


  useEffect(() => {
    if (userData) setFormData(userData);
  }, [userData]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    mutation.mutate(formData); 
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="max-w-xl mx-auto p-4 shadow-md bg-white rounded">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl text-red-500 font-semibold">My Profile</h2>
        {!editable ? (
          <button onClick={() => setEditable(true)} className="btn btn-primary bg-blue-600 ">Edit</button>
        ) : (
          <button onClick={handleSubmit} className="btn btn-success bg-green-600">Save</button>
        )}
      </div>
      <form className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name || ''}
          disabled={!editable}
          onChange={handleChange}
          className="input input-bordered w-full"
          placeholder="Name"
        />
        <input
          type="email"
          value={formData.email || ''}
          disabled
          className="input input-bordered w-full"
          placeholder="Email"
        />
        <input
          type="text"
          name="district"
          value={formData.district || ''}
          disabled={!editable}
          onChange={handleChange}
          className="input input-bordered w-full"
          placeholder="District"
        />
        <input
          type="text"
          name="upazila"
          value={formData.upazila || ''}
          disabled={!editable}
          onChange={handleChange}
          className="input input-bordered w-full"
          placeholder="Upazila"
        />
        <input
          type="text"
          name="bloodGroup"
          value={formData.bloodGroup || ''}
          disabled={!editable}
          onChange={handleChange}
          className="input input-bordered w-full"
          placeholder="Blood Group"
        />
        <input
  type="text"
  name="photoURL"
  value={formData.photoURL || ''}
  disabled={!editable}
  onChange={handleChange}
  className="input input-bordered w-full"
  placeholder="Avatar URL"
/>
      </form>
    </div>
  );
};

export default Profile;
