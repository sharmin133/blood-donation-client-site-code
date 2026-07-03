import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FaUsers, FaEllipsisV } from 'react-icons/fa';
import Pagination from '../../../Pagination/Pagination';


const STATUS_STYLES = {
  active: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  blocked: 'bg-gray-200 text-gray-600 border-gray-300',
};

const ROLE_STYLES = {
  admin: 'bg-red-100 text-red-700 border-red-200',
  volunteer: 'bg-blue-100 text-blue-700 border-blue-200',
  donor: 'bg-amber-100 text-amber-700 border-amber-200',
};

const ActionMenu = ({ user, onStatusToggle, onRoleChange }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const runAndClose = (fn) => {
    fn();
    setOpen(false);
  };

  return (
    <div className="relative inline-block" ref={ref}>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-8 h-8 flex items-center justify-center rounded-full border border-red-100
                   text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
        aria-label="Actions"
      >
        <FaEllipsisV className="text-xs" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-44 rounded-xl bg-white border border-red-100 shadow-xl z-20 overflow-hidden">
          <button
            onClick={() => runAndClose(() => onStatusToggle(user._id, user.status))}
            className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition cursor-pointer"
          >
            {user.status === 'active' ? 'Block User' : 'Unblock User'}
          </button>

          {user.role !== 'volunteer' && (
            <button
              onClick={() => runAndClose(() => onRoleChange(user._id, 'volunteer'))}
              className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition cursor-pointer border-t border-red-50"
            >
              Make Volunteer
            </button>
          )}

          {user.role !== 'admin' && (
            <button
              onClick={() => runAndClose(() => onRoleChange(user._id, 'admin'))}
              className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition cursor-pointer border-t border-red-50"
            >
              Make Admin
            </button>
          )}
        </div>
      )}
    </div>
  );
};

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState('all');
  const [visibleCount, setVisibleCount] = useState(7);
  const batchSize = 7;

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
      console.log(err);
      toast.error('Status update failed');
    }
  };

  const handleRoleChange = async (id, role) => {
    try {
      await axios.patch(`https://blood-donation-vert.vercel.app/users/${id}`, { role });
      toast.success(`Role changed to ${role}`);
      fetchUsers();
    } catch (err) {
      console.log(err);
      toast.error('Role update failed');
    }
  };

  const filteredUsers = filter === 'all' ? users : users.filter((user) => user.status === filter);
  const currentUsers = filteredUsers.slice(0, visibleCount);

  return (
    <div className="max-w-7xl mx-auto">
      {/* Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
        <div>
          <span className="inline-flex items-center gap-2 bg-red-50 text-red-700 text-xs font-semibold
                            tracking-widest uppercase px-4 py-1.5 rounded-full mb-2 border border-red-200">
            <FaUsers className="text-red-500" /> User Management
          </span>
          <h2 className="text-3xl font-bold text-gray-900">All Users</h2>
        </div>

        {/* Filter */}
        <select
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setVisibleCount(batchSize);
          }}
          className="px-4 py-2.5 rounded-lg border border-red-100 bg-white text-gray-800 font-medium
                     focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-400 transition cursor-pointer"
        >
          <option value="all">All Users</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      {/* Table */}
      {currentUsers.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-red-100">
          <p className="text-gray-500">No users match this filter.</p>
        </div>
      ) : (
        // Outer card: fixed rounded/shadow shell, no scroll here.
        <div className="rounded-2xl border border-red-100 shadow-md bg-white overflow-hidden">
          {/* Inner scroll area: THIS scrolls (both x and y), table itself stays fixed layout */}
          <div className="overflow-auto max-h-[520px]">
            <table className="w-full text-sm table-fixed min-w-[760px]">
              <thead className="sticky top-0 z-10">
                <tr className="bg-gradient-to-r from-red-600 to-red-800 text-white">
                  <th className="px-4 py-3.5 text-left font-semibold w-12">#</th>
                  <th className="px-4 py-3.5 text-left font-semibold w-16">Avatar</th>
                  <th className="px-4 py-3.5 text-left font-semibold w-1/6">Name</th>
                  <th className="px-4 py-3.5 text-left font-semibold w-1/4">Email</th>
                  <th className="px-4 py-3.5 text-left font-semibold w-28">Role</th>
                  <th className="px-4 py-3.5 text-left font-semibold w-28">Status</th>
                  <th className="px-4 py-3.5 text-right font-semibold w-20">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user, idx) => (
                  <tr
                    key={user._id}
                    className={`border-t border-red-50 ${idx % 2 === 1 ? 'bg-red-50/40' : 'bg-white'} hover:bg-red-50 transition-colors`}
                  >
                    <td className="px-4 py-3 text-gray-500">{idx + 1}</td>
                    <td className="px-4 py-3">
                      <img
                        src={user?.photoURL || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(user.name || user.displayName || 'U')}
                        alt="avatar"
                        className="w-10 h-10 rounded-full object-cover border border-red-100"
                      />
                    </td>
                    <td className="px-4 py-3 font-medium text-gray-900 truncate">
                      {user.name || user.displayName}
                    </td>
                    <td className="px-4 py-3 text-gray-600 truncate">{user.email}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block text-xs font-semibold uppercase px-2.5 py-1 rounded-full border capitalize ${
                        ROLE_STYLES[user.role] || 'bg-gray-100 text-gray-600 border-gray-200'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block text-xs font-semibold uppercase px-2.5 py-1 rounded-full border capitalize ${
                        STATUS_STYLES[user.status] || 'bg-gray-100 text-gray-600 border-gray-200'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <ActionMenu user={user} onStatusToggle={handleStatusToggle} onRoleChange={handleRoleChange} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* See More — hides itself if there are 8 or fewer users in the current filter */}
      <Pagination
        total={filteredUsers.length}
        visible={visibleCount}
        onSeeMore={() => setVisibleCount((c) => c + batchSize)}
        batchSize={batchSize}
      />
    </div>
  );
};

export default AllUsers;