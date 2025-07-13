import React, { useContext, useState, useEffect } from 'react';

import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../../context/AuthContext';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const CreateDonationRequest = () => {
  const { user, userStatus } = useContext(AuthContext); // userStatus should be 'active' or 'blocked'

  const [districtsData, setDistrictsData] = useState({});
  const [districtsMap, setDistrictsMap] = useState({});
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [upazilas, setUpazilas] = useState([]);
  const [selectedUpazila, setSelectedUpazila] = useState('');

  const [recipientName, setRecipientName] = useState('');
  const [hospitalName, setHospitalName] = useState('');
  const [fullAddress, setFullAddress] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [donationDate, setDonationDate] = useState('');
  const [donationTime, setDonationTime] = useState('');
  const [requestMessage, setRequestMessage] = useState('');

  useEffect(() => {
    fetch('/districtData.json')
      .then(res => res.json())
      .then(jsonData => {
        const tableEntry = jsonData.find(entry => entry.type === 'table' && entry.name === 'districts');
        if (tableEntry && Array.isArray(tableEntry.data)) {
          const districtsObj = {};
          const districtsMapObj = {};
          tableEntry.data.forEach(district => {
            districtsObj[district.name] = [];
            districtsMapObj[district.name] = district.id;
          });
          setDistrictsData(districtsObj);
          setDistrictsMap(districtsMapObj);
        }
      });
  }, []);

  useEffect(() => {
    if (!selectedDistrict) {
      setUpazilas([]);
      setSelectedUpazila('');
      return;
    }

    const districtId = districtsMap[selectedDistrict];

    fetch('/upazilaData.json')
      .then(res => res.json())
      .then(jsonData => {
        const tableEntry = jsonData.find(entry => entry.type === 'table' && entry.name === 'upazilas');
        if (tableEntry && Array.isArray(tableEntry.data)) {
          const filtered = tableEntry.data.filter(u => String(u.district_id) === String(districtId)).map(u => u.name);
          setUpazilas(filtered);
          setSelectedUpazila('');
        }
      });
  }, [selectedDistrict, districtsMap]);

  const handleSubmit = async e => {
    e.preventDefault();

    if (userStatus !== 'active') {
      toast.error('Your account is blocked. You cannot create a donation request.');
      return;
    }

    if (
      !recipientName ||
      !selectedDistrict ||
      !selectedUpazila ||
      !hospitalName ||
      !fullAddress ||
      !bloodGroup ||
      !donationDate ||
      !donationTime ||
      !requestMessage
    ) {
      toast.error('Please fill in all required fields.');
      return;
    }

    try {
      await axios.post('http://localhost:3000/donation-requests', {
        requesterName: user.displayName,
        requesterEmail: user.email,
        recipientName,
        recipientDistrict: selectedDistrict,
        recipientUpazila: selectedUpazila,
        hospitalName,
        fullAddress,
        bloodGroup,
        donationDate,
        donationTime,
        requestMessage,
        status: 'pending', // default status, no input field needed
      });

      toast.success('Donation request created successfully!');

      // reset form
      setRecipientName('');
      setSelectedDistrict('');
      setSelectedUpazila('');
      setHospitalName('');
      setFullAddress('');
      setBloodGroup('');
      setDonationDate('');
      setDonationTime('');
      setRequestMessage('');
      setUpazilas([]);
    } catch (err) {
      console.error(err);
      toast.error('Failed to create donation request. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md my-8">
      <ToastContainer position="top-center" autoClose={3000} />
      <h2 className="text-2xl font-bold mb-4 text-red-700 dark:text-red-500 text-center">Create Donation Request</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Requester Name (readonly) */}
        <div>
          <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">Requester Name</label>
          <input
            type="text"
            value={user?.displayName || ''}
            readOnly
            className="input input-bordered w-full cursor-not-allowed bg-gray-100 dark:bg-gray-700"
          />
        </div>

        {/* Requester Email (readonly) */}
        <div>
          <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">Requester Email</label>
          <input
            type="email"
            value={user?.email || ''}
            readOnly
            className="input input-bordered w-full cursor-not-allowed bg-gray-100 dark:bg-gray-700"
          />
        </div>

        {/* Recipient Name */}
        <div>
          <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">Recipient Name</label>
          <input
            type="text"
            value={recipientName}
            onChange={e => setRecipientName(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Recipient District */}
        <div>
          <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">Recipient District</label>
          <select
            value={selectedDistrict}
            onChange={e => setSelectedDistrict(e.target.value)}
            className="input input-bordered w-full"
            required
          >
            <option value="">Select district</option>
            {Object.keys(districtsData).map(d => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </div>

        {/* Recipient Upazila */}
        <div>
          <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">Recipient Upazila</label>
          <select
            value={selectedUpazila}
            onChange={e => setSelectedUpazila(e.target.value)}
            className="input input-bordered w-full"
            required
            disabled={!selectedDistrict}
          >
            <option value="">Select upazila</option>
            {upazilas.map(u => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </div>

        {/* Hospital Name */}
        <div>
          <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">Hospital Name</label>
          <input
            type="text"
            value={hospitalName}
            onChange={e => setHospitalName(e.target.value)}
            className="input input-bordered w-full"
            placeholder="e.g. Dhaka Medical College Hospital"
            required
          />
        </div>

        {/* Full Address */}
        <div>
          <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">Full Address</label>
          <input
            type="text"
            value={fullAddress}
            onChange={e => setFullAddress(e.target.value)}
            className="input input-bordered w-full"
            placeholder="e.g. Zahir Raihan Rd, Dhaka"
            required
          />
        </div>

        {/* Blood Group */}
        <div>
          <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">Blood Group</label>
          <select
            value={bloodGroup}
            onChange={e => setBloodGroup(e.target.value)}
            className="input input-bordered w-full"
            required
          >
            <option value="">Select blood group</option>
            {BLOOD_GROUPS.map(bg => (
              <option key={bg} value={bg}>
                {bg}
              </option>
            ))}
          </select>
        </div>

        {/* Donation Date */}
        <div>
          <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">Donation Date</label>
          <input
            type="date"
            value={donationDate}
            onChange={e => setDonationDate(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Donation Time */}
        <div>
          <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">Donation Time</label>
          <input
            type="time"
            value={donationTime}
            onChange={e => setDonationTime(e.target.value)}
            className="input input-bordered w-full"
            required
          />
        </div>

        {/* Request Message */}
        <div>
          <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">Request Message</label>
          <textarea
            value={requestMessage}
            onChange={e => setRequestMessage(e.target.value)}
            className="input input-bordered w-full h-24 resize-none"
            placeholder="Explain why you need blood in detail..."
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg"
        >
          Request
        </button>
      </form>
    </div>
  );
};

export default CreateDonationRequest;
