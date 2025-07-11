import { Outlet, NavLink } from "react-router";
import { useState } from "react";
import Navbar from "../../Navbar/Navbar";

const DashboardLayouts = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
   <div>
{/* <Navbar></Navbar> */}
     <div className="min-h-screen md:flex">
      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full min-h-screen w-64 bg-red-100 p-4 shadow-md z-40
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:flex-shrink-0
        `}
      >
        <h2 className="text-2xl font-bold text-center text-red-600 mb-6">
          RedHope Dashboard
        </h2>
        <nav className="flex flex-col space-y-2">
          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              `px-3 py-2 rounded text-sm font-medium ${
                isActive
                  ? "bg-red-500 text-black"
                  : "text-red-700 hover:bg-red-200"
              }`
            }
            onClick={() => setSidebarOpen(false)} // close sidebar on mobile after link click
          >
            My Profile
          </NavLink>
          {/* Add more nav links here */}
        </nav>
      </aside>

      {/* No overlay */}

      {/* Main content */}
      <main className="flex-1 bg-gray-50 p-6 ">
        {/* Hamburger for mobile */}
        <button
          className="md:hidden mb-4 p-2 rounded bg-red-100 text-red-600 shadow"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle sidebar"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <Outlet />
      </main>
    </div>
   </div>
  );
};

export default DashboardLayouts;


