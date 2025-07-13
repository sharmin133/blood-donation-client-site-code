import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../context/AuthContext';

const STATUS_FILTERS = ['all', 'pending', 'inprogress', 'done', 'canceled'];

const MyRequestAllDonar = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:3000/donation-requests/requester/${user.email}`)
        .then(res => setRequests(res.data))
        .catch(err => console.error(err));
    }
  }, [user]);

  const filteredRequests =
    statusFilter === 'all'
      ? requests
      : requests.filter(r => r.status === statusFilter);

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-red-700 mb-4">My Donation Requests 🩸</h2>

      {/* Filter */}
      <div className="mb-4">
        <label className="font-semibold mr-2">Filter by Status:</label>
        <select
          value={statusFilter}
          onChange={e => {
            setStatusFilter(e.target.value);
            setCurrentPage(1);
          }}
          className="input input-bordered"
        >
          {STATUS_FILTERS.map(status => (
            <option key={status} value={status}>
              {status[0].toUpperCase() + status.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table w-full border">
          <thead>
            <tr className="bg-red-600 text-white">
              <th>#</th>
              <th>Recipient</th>
              <th>District</th>
              <th>Upazila</th>
              <th>Hospital</th>
              <th>Blood</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedRequests.map((req, index) => (
              <tr key={req._id}>
                <td>{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td>{req.recipientName}</td>
                <td>{req.recipientDistrict}</td>
                <td>{req.recipientUpazila}</td>
                <td>{req.hospitalName}</td>
                <td>{req.bloodGroup}</td>
                <td>{req.donationDate}</td>
                <td className="capitalize">{req.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* No Data */}
        {paginatedRequests.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No requests found.</p>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center space-x-2">
          {[...Array(totalPages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`px-3 py-1 border rounded ${
                currentPage === idx + 1
                  ? 'bg-red-600 text-white'
                  : 'bg-white text-red-600 border-red-600'
              }`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyRequestAllDonar;

