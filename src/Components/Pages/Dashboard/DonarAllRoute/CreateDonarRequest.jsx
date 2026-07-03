import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaTint, FaMapMarkerAlt, FaHospital, FaCalendarAlt } from 'react-icons/fa';
import { AuthContext } from '../../../context/AuthContext';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const inputClass =
  'w-full px-4 py-2.5 rounded-lg border border-red-100 bg-white text-gray-800 ' +
  'focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-400 transition';

const CreateDonationRequest = () => {
  const { user, userStatus } = useContext(AuthContext);

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
  const [submitting, setSubmitting] = useState(false);

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

    setSubmitting(true);
    try {
      await axios.post('https://blood-donation-vert.vercel.app/donation-requests', {
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
        status: 'pending',
      });

      toast.success('Donation request created successfully!');

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
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Heading */}
      <div className="text-center mb-6">
        <span className="inline-flex items-center gap-2 bg-red-50 text-red-700 text-xs font-semibold
                          tracking-widest uppercase px-4 py-1.5 rounded-full mb-3 border border-red-200">
          <FaTint className="text-red-500" /> New Request
        </span>
        <h1 className="text-3xl font-bold text-gray-900">Create Donation Request</h1>
        <p className="text-gray-500 mt-1 text-sm">Fill in the details below to request blood for someone in need.</p>
      </div>

      {/* Card */}
      <div className="rounded-2xl border border-red-100 shadow-md bg-white p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Requester Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold mb-1.5 text-gray-700">Requester Name</label>
              <input
                type="text"
                value={user?.displayName || ''}
                readOnly
                className={`${inputClass} cursor-not-allowed bg-gray-50 text-gray-500`}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5 text-gray-700">Requester Email</label>
              <input
                type="email"
                value={user?.email || ''}
                readOnly
                className={`${inputClass} cursor-not-allowed bg-gray-50 text-gray-500`}
              />
            </div>
          </div>

          {/* Recipient Name */}
          <div>
            <label className="block text-sm font-semibold mb-1.5 text-gray-700">Recipient Name</label>
            <input
              type="text"
              value={recipientName}
              onChange={e => setRecipientName(e.target.value)}
              className={inputClass}
              required
            />
          </div>

          {/* District / Upazila */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="flex items-center gap-1.5 text-sm font-semibold mb-1.5 text-gray-700">
                <FaMapMarkerAlt className="text-red-400 text-xs" /> Recipient District
              </label>
              <select
                value={selectedDistrict}
                onChange={e => setSelectedDistrict(e.target.value)}
                className={`${inputClass} cursor-pointer`}
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

            <div>
              <label className="flex items-center gap-1.5 text-sm font-semibold mb-1.5 text-gray-700">
                <FaMapMarkerAlt className="text-red-400 text-xs" /> Recipient Upazila
              </label>
              <select
                value={selectedUpazila}
                onChange={e => setSelectedUpazila(e.target.value)}
                className={`${inputClass} cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed`}
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
          </div>

          {/* Hospital Name */}
          <div>
            <label className="flex items-center gap-1.5 text-sm font-semibold mb-1.5 text-gray-700">
              <FaHospital className="text-red-400 text-xs" /> Hospital Name
            </label>
            <input
              type="text"
              value={hospitalName}
              onChange={e => setHospitalName(e.target.value)}
              className={inputClass}
              placeholder="e.g. Dhaka Medical College Hospital"
              required
            />
          </div>

          {/* Full Address */}
          <div>
            <label className="block text-sm font-semibold mb-1.5 text-gray-700">Full Address</label>
            <input
              type="text"
              value={fullAddress}
              onChange={e => setFullAddress(e.target.value)}
              className={inputClass}
              placeholder="e.g. Zahir Raihan Rd, Dhaka"
              required
            />
          </div>

          {/* Blood Group / Date / Time */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div>
              <label className="flex items-center gap-1.5 text-sm font-semibold mb-1.5 text-gray-700">
                <FaTint className="text-red-400 text-xs" /> Blood Group
              </label>
              <select
                value={bloodGroup}
                onChange={e => setBloodGroup(e.target.value)}
                className={`${inputClass} cursor-pointer`}
                required
              >
                <option value="">Select</option>
                {BLOOD_GROUPS.map(bg => (
                  <option key={bg} value={bg}>
                    {bg}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="flex items-center gap-1.5 text-sm font-semibold mb-1.5 text-gray-700">
                <FaCalendarAlt className="text-red-400 text-xs" /> Donation Date
              </label>
              <input
                type="date"
                value={donationDate}
                onChange={e => setDonationDate(e.target.value)}
                className={`${inputClass} cursor-pointer`}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1.5 text-gray-700">Donation Time</label>
              <input
                type="time"
                value={donationTime}
                onChange={e => setDonationTime(e.target.value)}
                className={`${inputClass} cursor-pointer`}
                required
              />
            </div>
          </div>

          {/* Request Message */}
          <div>
            <label className="block text-sm font-semibold mb-1.5 text-gray-700">Request Message</label>
            <textarea
              value={requestMessage}
              onChange={e => setRequestMessage(e.target.value)}
              className={`${inputClass} h-28 resize-none`}
              placeholder="Explain why you need blood in detail..."
              required
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-60 disabled:cursor-not-allowed
                       text-white font-semibold py-3 rounded-lg shadow-sm transition-colors cursor-pointer"
          >
            {submitting ? 'Submitting...' : 'Request'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateDonationRequest;