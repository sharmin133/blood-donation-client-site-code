import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;

  const fetchUsers = async () => {
    try {
      const res = await axios.get('https://blood-donation-vert.vercel.app/users');
      setUsers(res.data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch users');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleStatusToggle = async (id, currentStatus) => {
    try {
      const updatedStatus = currentStatus === 'active' ? 'blocked' : 'active';
      await axios.patch(`https://blood-donation-vert.vercel.app/users/${id}`, { status: updatedStatus });
      toast.success(`User ${updatedStatus}`);
      fetchUsers();
    } catch (err) {
         console.log(err)
      toast.error('Status update failed');
    }
  };

  const handleRoleChange = async (id, role) => {
    try {
      await axios.patch(`https://blood-donation-vert.vercel.app/users/${id}`, { role });
      toast.success(`Role changed to ${role}`);
      fetchUsers();
    } catch (err) {
        console.log(err)
      toast.error('Role update failed');
    }
  };

  const filteredUsers = filter === 'all'
    ? users
    : users.filter(user => user.status === filter);

  const indexOfLast = currentPage * usersPerPage;
  const indexOfFirst = indexOfLast - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirst, indexOfLast);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  return (
    <div className="p-6">
      <h2 className="text-4xl font-bold text-red-600 mb-4 text-center">All Users</h2>

      {/* Filter */}
      <div className="mb-4 flex gap-2">
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="select select-bordered">
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr className="bg-red-600 text-white">
              <th>#</th>
              <th>Avatar</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user, idx) => (
              <tr key={user._id}>
                <td>{indexOfFirst + idx + 1}</td>
                <td>
                  <img src={user?.photoURL} alt="avatar" className="w-10 h-10 rounded-full" />
                </td>
                <td>{user.name || user.displayName}</td>
                <td>{user.email}</td>
                <td className="capitalize">{user.role}</td>
                <td className="capitalize">{user.status}</td>
                <td>
  <div className="dropdown dropdown-left">
    <div tabIndex={0} role="button" className="btn btn-xs btn-outline">
      •••
    </div>
    <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-40">
      {user.status === 'active' ? (
        <li>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handleStatusToggle(user._id, user.status);
            }}
          >
            Block
          </button>
        </li>
      ) : (
        <li>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handleStatusToggle(user._id, user.status);
            }}
          >
            Unblock
          </button>
        </li>
      )}
      {user.role !== 'volunteer' && (
        <li>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handleRoleChange(user._id, 'volunteer');
            }}
          >
            Make Volunteer
          </button>
        </li>
      )}
      {user.role !== 'admin' && (
        <li>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              handleRoleChange(user._id, 'admin');
            }}
          >
            Make Admin
          </button>
        </li>
      )}
    </ul>
  </div>
</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex justify-center gap-2">
        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`btn btn-sm ${currentPage === i + 1 ? 'btn-active' : ''}`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
