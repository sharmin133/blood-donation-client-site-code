import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import { Link, useNavigate } from 'react-router';
import axios from 'axios';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';


const DonorDashboard = () => {
  const {user, userData } = useContext(AuthContext);
  const [recentRequests, setRecentRequests] = useState([]);
  const navigate = useNavigate();


  useEffect(() => {
    if (userData?.email) {
    axios.get(`/donation-requests/requester/${userData.email}`)
      .then(res => {
        const sorted = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setRecentRequests(sorted.slice(0, 3));
      })
      .catch(err => console.error(err));
  }
}, [userData]);

 const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'Do you really want to delete this donation request?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!'
  });

  if (result.isConfirmed) {
    try {
      await axios.delete(`https://blood-donation-vert.vercel.app/donation-requests/${id}`);
      setRecentRequests(prev => prev.filter(req => req._id !== id));

      Swal.fire('Deleted!', 'Donation request has been deleted.', 'success');
    } catch (err) {
      console.error('Failed to delete request', err);
      toast.error('Failed to delete donation request.');
    }
  }
};

  const handleStatusChange = async (id, status) => {
    try {
      await axios.patch(`https://blood-donation-vert.vercel.app/donation-requests/${id}`, { status });
      setRecentRequests(prev =>
        prev.map(req => req._id === id ? { ...req, status } : req)
      );
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-4xl font-bold text-red-600 text-center mb-6">
        Welcome, {userData?.name}!
      </h2>
      <p className="text-gray-700 dark:text-gray-300 text-2xl mt-2 text-center">Role: {user?.role || 'Donar'}</p>

      {recentRequests.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold mb-4">Recent Donation Requests</h3>

          <div className="overflow-x-auto">
            <table className="table w-full border">
              <thead>
                <tr className="bg-red-600 text-white">
                  <th>#</th>
                  <th>Recipient</th>
                  <th>Location</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Blood</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentRequests.map((req, index) => (
                  <tr key={req._id}>
                    <td>{index + 1}</td>
                    <td>{req.recipientName}</td>
                    <td>{req.recipientDistrict}, {req.recipientUpazila}</td>
                    <td>{req.donationDate}</td>
                    <td>{req.donationTime}</td>
                    <td>{req.bloodGroup}</td>
                    <td className="capitalize">{req.status}</td>
                    <td className="space-x-2">
                      {req.status === 'inprogress' && (
                        <>
                          <button
                            onClick={() => handleStatusChange(req._id, 'done')}
                            className="btn btn-xs btn-success"
                          >
                            Done
                          </button>
                          <button
                            onClick={() => handleStatusChange(req._id, 'canceled')}
                            className="btn btn-xs btn-warning"
                          >
                            Cancel
                          </button>
                        </>
                      )}
                      <button
                        onClick={() => navigate(`/dashboard/edit-donation-request/${req._id}`)}
                        className="btn btn-xs btn-info"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(req._id)}
                        className="btn btn-xs btn-error"
                      >
                        Delete
                      </button>
                      <Link to={`/dashboard/donation-request/${req._id}`} className="btn btn-xs btn-primary">
                        View
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 text-center">
            <Link to="/dashboard/my-requests" className="btn btn-outline btn-red-600">
              View My All Requests
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonorDashboard;
