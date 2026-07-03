import { Outlet, NavLink, Link, useNavigate } from "react-router";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  FaTint,
  FaTachometerAlt,
  FaUser,
  FaUsers,
  FaClipboardList,
  FaNewspaper,
  FaStar,
  FaHandHoldingUsd,
  FaPlusCircle,
  FaListUl,
  FaSignOutAlt,
  FaUserShield,
  FaHandsHelping,
  FaBars,
  FaTimes,
} from "react-icons/fa";

const ROLE_META = {
  admin: { label: "Admin", icon: <FaUserShield /> },
  volunteer: { label: "Volunteer", icon: <FaHandsHelping /> },
  donor: { label: "Donor", icon: <FaUser /> },
};

const DashboardLayouts = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { userData, signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const role = userData?.role;
  const roleMeta = ROLE_META[role] || { label: "Member", icon: <FaUser /> };

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        navigate("/");
      })
      .catch((err) => console.error(err));
  };

  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all ${
      isActive
        ? "bg-red-700 text-white shadow-md"
        : "text-gray-600 hover:bg-red-50 hover:text-red-700"
    }`;

  return (
    <div className="h-screen bg-gradient-to-b from-white via-red-50 to-white md:flex max-w-[1920px] mx-auto overflow-hidden">

      {/* Mobile toggle */}
      <button
        className="md:hidden fixed top-4 right-4 z-50 p-3 rounded-full bg-red-700 text-white shadow-lg cursor-pointer"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle sidebar"
      >
        {sidebarOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-72 bg-white border-r border-red-100 shadow-xl z-40
          flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:sticky md:top-0 md:h-screen md:flex-shrink-0
        `}
      >
        <Link
          to="/"
          onClick={() => setSidebarOpen(false)}
          className="flex items-center gap-3 px-6 py-6 bg-gradient-to-r from-red-600 to-red-800"
        >
          <span className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center text-white text-lg shrink-0">
            <FaTint />
          </span>
          <span className="text-white text-xl font-bold tracking-wide">RedHope</span>
        </Link>

        <div className="px-6 pt-5 pb-3">
          <span className="inline-flex items-center gap-2 bg-red-50 text-red-700 text-xs font-semibold
                           uppercase tracking-wide px-3 py-1.5 rounded-full border border-red-200">
            {roleMeta.icon} {roleMeta.label} Dashboard
          </span>
        </div>

        <nav className="flex-1 flex flex-col gap-1.5 px-4 overflow-y-auto">
          <NavLink to="/dashboard" end className={linkClass} onClick={() => setSidebarOpen(false)}>
            <FaTachometerAlt className="text-xs" /> Dashboard
          </NavLink>

          <NavLink to="/dashboard/profile" className={linkClass} onClick={() => setSidebarOpen(false)}>
            <FaUser className="text-xs" /> My Profile
          </NavLink>

          {role === "admin" && (
            <>
              <NavLink to="/dashboard/all-users" className={linkClass} onClick={() => setSidebarOpen(false)}>
                <FaUsers className="text-xs" /> All Users
              </NavLink>
              <NavLink to="/dashboard/all-requests" className={linkClass} onClick={() => setSidebarOpen(false)}>
                <FaClipboardList className="text-xs" /> All Requests
              </NavLink>
              <NavLink to="/dashboard/content-management" className={linkClass} onClick={() => setSidebarOpen(false)}>
                <FaNewspaper className="text-xs" /> Content Management
              </NavLink>
              <NavLink to="/dashboard/users-all-review" className={linkClass} onClick={() => setSidebarOpen(false)}>
                <FaStar className="text-xs" /> All Reviews
              </NavLink>
              <NavLink to="/dashboard/users-fund-donation" className={linkClass} onClick={() => setSidebarOpen(false)}>
                <FaHandHoldingUsd className="text-xs" /> All Funds
              </NavLink>
            </>
          )}

          {role === "volunteer" && (
            <>
              <NavLink to="/dashboard/all-blood-donation-request" className={linkClass} onClick={() => setSidebarOpen(false)}>
                <FaClipboardList className="text-xs" /> All Requests
              </NavLink>
              <NavLink to="/dashboard/content-management" className={linkClass} onClick={() => setSidebarOpen(false)}>
                <FaNewspaper className="text-xs" /> Content Management
              </NavLink>
              <NavLink to="/dashboard/users-fund-donation" className={linkClass} onClick={() => setSidebarOpen(false)}>
                <FaHandHoldingUsd className="text-xs" /> All Funds
              </NavLink>
            </>
          )}

          {role === "donor" && (
            <>
              <NavLink to="/dashboard/create-donation-request" className={linkClass} onClick={() => setSidebarOpen(false)}>
                <FaPlusCircle className="text-xs" /> Create Donation Request
              </NavLink>
              <NavLink to="/dashboard/my-requests" className={linkClass} onClick={() => setSidebarOpen(false)}>
                <FaListUl className="text-xs" /> My Requests
              </NavLink>
            </>
          )}
        </nav>

        {/* Sign out — pinned to bottom */}
        <div className="p-4 border-t border-red-100">
          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-2 bg-red-700 hover:bg-red-800
                       text-white font-semibold px-4 py-3 rounded-xl shadow-md transition-colors cursor-pointer"
          >
            <FaSignOutAlt /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-y-auto p-4 md:p-8 pt-20 md:pt-8">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayouts;