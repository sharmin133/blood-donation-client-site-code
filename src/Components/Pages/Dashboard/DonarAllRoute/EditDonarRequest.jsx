import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const EditDonarRequest = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    recipientName: '',
    recipientDistrict: '',
    recipientUpazila: '',
    hospitalName: '',
    fullAddress: '',
    bloodGroup: '',
    donationDate: '',
    donationTime: '',
    requestMessage: '',
  });

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [districtsMap, setDistrictsMap] = useState({});

  // Fetch existing request
  useEffect(() => {
    axios.get(`http://localhost:3000/donation-requests/${id}`)
      .then(res => {
        const data = res.data;
        setFormData({
          recipientName: data.recipientName,
          recipientDistrict: data.recipientDistrict,
          recipientUpazila: data.recipientUpazila,
          hospitalName: data.hospitalName,
          fullAddress: data.fullAddress,
          bloodGroup: data.bloodGroup,
          donationDate: data.donationDate,
          donationTime: data.donationTime,
          requestMessage: data.requestMessage,
        });
      })
      .catch(err => {
        console.error(err);
        toast.error('Failed to load donation request data.');
      });
  }, [id]);

  // Fetch districts and upazilas
  useEffect(() => {
    fetch('/districtData.json')
      .then(res => res.json())
      .then(jsonData => {
        const tableEntry = jsonData.find(entry => entry.name === 'districts');
        if (tableEntry) {
          setDistricts(tableEntry.data.map(d => d.name));
          const map = {};
          tableEntry.data.forEach(d => map[d.name] = d.id);
          setDistrictsMap(map);
        }
      });
  }, []);

  useEffect(() => {
    const districtId = districtsMap[formData.recipientDistrict];
    if (districtId) {
      fetch('/upazilaData.json')
        .then(res => res.json())
        .then(jsonData => {
          const tableEntry = jsonData.find(entry => entry.name === 'upazilas');
          if (tableEntry) {
            const filtered = tableEntry.data
              .filter(u => String(u.district_id) === String(districtId))
              .map(u => u.name);
            setUpazilas(filtered);
          }
        });
    }
  }, [formData.recipientDistrict, districtsMap]);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async e => {
    e.preventDefault();
    try {
     await axios.patch(`http://localhost:3000/donation-requests/${id}`, formData);
      toast.success('Donation request updated successfully!');
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      toast.error('Failed to update donation request.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md my-8">
      <ToastContainer position="top-center" autoClose={3000} />
      <h2 className="text-2xl font-bold mb-4 text-red-700 dark:text-red-500 text-center">Update Donation Request</h2>

      <form onSubmit={handleUpdate} className="space-y-4">
        {/* Requester Name & Email (read-only) */}
        <input type="text" value={user?.displayName} readOnly className="input input-bordered w-full bg-gray-100 dark:bg-gray-700" />
        <input type="email" value={user?.email} readOnly className="input input-bordered w-full bg-gray-100 dark:bg-gray-700" />

        {/* Dynamic fields */}
        <input name="recipientName" type="text" className="input input-bordered w-full" value={formData.recipientName} onChange={handleChange} required placeholder="Recipient Name" />

        <select name="recipientDistrict" value={formData.recipientDistrict} onChange={handleChange} required className="input input-bordered w-full">
          <option value="">Select District</option>
          {districts.map(d => <option key={d} value={d}>{d}</option>)}
        </select>

        <select name="recipientUpazila" value={formData.recipientUpazila} onChange={handleChange} required className="input input-bordered w-full">
          <option value="">Select Upazila</option>
          {upazilas.map(u => <option key={u} value={u}>{u}</option>)}
        </select>

        <input name="hospitalName" type="text" className="input input-bordered w-full" value={formData.hospitalName} onChange={handleChange} placeholder="Hospital Name" required />
        <input name="fullAddress" type="text" className="input input-bordered w-full" value={formData.fullAddress} onChange={handleChange} placeholder="Full Address" required />

        <select name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} required className="input input-bordered w-full">
          <option value="">Select Blood Group</option>
          {BLOOD_GROUPS.map(bg => <option key={bg} value={bg}>{bg}</option>)}
        </select>

        <input name="donationDate" type="date" value={formData.donationDate} onChange={handleChange} className="input input-bordered w-full" required />
        <input name="donationTime" type="time" value={formData.donationTime} onChange={handleChange} className="input input-bordered w-full" required />
        <textarea name="requestMessage" value={formData.requestMessage} onChange={handleChange} className="input input-bordered w-full" required />

        <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg">Update</button>
      </form>
    </div>
  );
};

export default EditDonarRequest;
