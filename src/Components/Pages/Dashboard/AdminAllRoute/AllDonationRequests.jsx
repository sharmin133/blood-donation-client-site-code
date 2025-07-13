import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllDonationRequests= () => {
  const [donationRequests, setDonationRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    axios.get('http://localhost:3000/donation-requests')
      .then(res => setDonationRequests(res.data))
      .catch(() => toast.error("Failed to load donation requests"));
  }, []);

  const filteredRequests = donationRequests.filter(req => 
    statusFilter === 'all' ? true : req.status === statusFilter
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <ToastContainer position="top-center" autoClose={3000} />
      <h2 className="text-3xl font-bold text-red-700 dark:text-red-500 mb-6 text-center">
        All Blood Donation Requests
      </h2>

      {/* Filter buttons */}
      <div className="mb-4 flex gap-4 justify-center">
        {['all', 'pending', 'inprogress', 'done', 'canceled'].map(status => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 rounded-lg border ${
              statusFilter === status ? 'bg-red-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-black dark:text-white'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead className="bg-red-100 dark:bg-red-800 text-black dark:text-white">
            <tr>
              <th>#</th>
              <th>Requester</th>
              <th>Recipient</th>
              <th>Location</th>
              <th>Blood Group</th>
              <th>Date</th>
              <th>Status</th>
             
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((req, i) => (
              <tr key={req._id}>
                <td>{i + 1}</td>
                <td>{req.requesterName}<br /><span className="text-xs">{req.requesterEmail}</span></td>
                <td>{req.recipientName}</td>
                <td>{req.recipientDistrict}, {req.recipientUpazila}</td>
                <td className="font-bold">{req.bloodGroup}</td>
                <td>{req.donationDate} <br />{req.donationTime}</td>
                <td>
                  <span className={`px-2 py-1 rounded text-xs ${
                    req.status === 'pending' ? 'bg-yellow-200 text-yellow-800' :
                    req.status === 'inprogress' ? 'bg-blue-200 text-blue-800' :
                    req.status === 'done' ? 'bg-green-200 text-green-800' :
                    req.status === 'canceled' ? 'bg-red-200 text-red-800' :
                    ''
                  }`}>
                    {req.status}
                  </span>
                </td>
                
              </tr>
            ))}
            {filteredRequests.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">No requests found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};



export default AllDonationRequests;