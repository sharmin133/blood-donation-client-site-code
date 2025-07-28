import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../../context/AuthContext';

const DonationRequestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [request, setRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    axios
      .get(`https://blood-donation-vert.vercel.app/donation-requests/${id}`)
      .then(res => setRequest(res.data))
      .catch(err => console.error('Failed to load request details:', err));
  }, [id]);

  const handleDonate = async () => {
    try {
      await axios.patch(`https://blood-donation-vert.vercel.app/donation-requests/${id}`, {
        status: 'inprogress',
        donorName: user.displayName,
        donorEmail: user.email,
      });

      toast.success('Donation confirmed!');
      setRequest(prev => ({ ...prev, status: 'inprogress' }));
      setShowModal(false);
    } catch (err) {
      toast.error('Failed to confirm donation');
      console.error(err);
    }
  };

  if (!request) return <div className="p-10">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto min-h-screen p-6 pt-20">
      <h2 className="text-3xl font-bold text-red-700 mb-6">Donation Request Details 🩸</h2>

      <div className="border p-6 rounded shadow">
        <p><strong>Recipient Name:</strong> {request.recipientName}</p>
        <p><strong>Blood Group:</strong> {request.bloodGroup}</p>
        <p><strong>District:</strong> {request.recipientDistrict}</p>
        <p><strong>Upazila:</strong> {request.recipientUpazila}</p>
        <p><strong>Hospital:</strong> {request.hospitalName}</p>
        <p><strong>Donation Date:</strong> {request.donationDate}</p>
        <p><strong>Donation Time:</strong> {request.donationTime}</p>
        <p><strong>Status:</strong> <span className="capitalize">{request.status}</span></p>
        <p><strong>Requester Email:</strong> {request.requesterEmail}</p>

        {request.status === 'pending' && (
          <button
            onClick={() => setShowModal(true)}
            className="mt-6 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Donate Now
          </button>
        )}
      </div>

      {/* Donate Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-red-600">Confirm Your Donation</h3>
            <form onSubmit={e => {
              e.preventDefault();
              handleDonate();
            }}>
              <div className="mb-4">
                <label className="block font-medium">Donor Name</label>
                <input
                  type="text"
                  value={user.displayName}
                  disabled
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium">Donor Email</label>
                <input
                  type="text"
                  value={user.email}
                  disabled
                  className="input input-bordered w-full"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  className="btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn bg-red-600 text-white hover:bg-red-700"
                >
                  Confirm Donation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationRequestDetails;
