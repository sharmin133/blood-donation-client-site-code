import { Outlet, NavLink } from "react-router";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const DashboardLayouts = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { userData } = useContext(AuthContext);
  const role = userData?.role;

  return (
    <div className="min-h-screen md:flex">
      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-64 bg-red-100 p-4 shadow-md z-40
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:flex-shrink-0
        `}
      >
        <NavLink
  to="/dashboard"
  className="text-2xl font-bold text-center text-red-600 mb-6 block hover:underline"
  onClick={() => setSidebarOpen(false)}
>
  RedHope Dashboard
</NavLink>

        <nav className="flex flex-col space-y-2">
          <NavLink
            to="/dashboard/profile"
            className={({ isActive }) =>
              `px-3 py-2 rounded text-sm font-medium ${
                isActive
                  ? "bg-red-500 text-white"
                  : "text-red-700 hover:bg-red-200"
              }`
            }
            onClick={() => setSidebarOpen(false)}
          >
            My Profile
          </NavLink>

          {role === "admin" && (
            <>
              <NavLink
                to="/dashboard/all-users"
                className={({ isActive }) =>
                  `px-3 py-2 rounded text-sm font-medium ${
                    isActive
                      ? "bg-red-500 text-white"
                      : "text-red-700 hover:bg-red-200"
                  }`
                }
                onClick={() => setSidebarOpen(false)}
              >
                All Users
              </NavLink>
              <NavLink
                to="/dashboard/all-requests"
                className={({ isActive }) =>
                  `px-3 py-2 rounded text-sm font-medium ${
                    isActive
                      ? "bg-red-500 text-white"
                      : "text-red-700 hover:bg-red-200"
                  }`
                }
                onClick={() => setSidebarOpen(false)}
              >
                All Requests
              </NavLink>

               <NavLink
                to="/dashboard/content-management"
                className={({ isActive }) =>
                  `px-3 py-2 rounded text-sm font-medium ${
                    isActive
                      ? "bg-red-500 text-white"
                      : "text-red-700 hover:bg-red-200"
                  }`
                }
                onClick={() => setSidebarOpen(false)}
              >
               Content Management
              </NavLink>

              <NavLink
  to="/dashboard/users-fund-donation"
  className={({ isActive }) =>
    `px-3 py-2 rounded text-sm font-medium ${
      isActive
        ? "bg-red-500 text-white"
        : "text-red-700 hover:bg-red-200"
    }`
  }
  onClick={() => setSidebarOpen(false)}
>
  All Funds
</NavLink>


            </>
          )}

          {role === "volunteer" && (
            <>
              <NavLink
                to="/dashboard/all-blood-donation-request"
                className={({ isActive }) =>
                  `px-3 py-2 rounded text-sm font-medium ${
                    isActive
                      ? "bg-red-500 text-white"
                      : "text-red-700 hover:bg-red-200"
                  }`
                }
                onClick={() => setSidebarOpen(false)}
              >
                All Request
              </NavLink>
              <NavLink
                to="/dashboard/my-requests"
                className={({ isActive }) =>
                  `px-3 py-2 rounded text-sm font-medium ${
                    isActive
                      ? "bg-red-500 text-white"
                      : "text-red-700 hover:bg-red-200"
                  }`
                }
                onClick={() => setSidebarOpen(false)}
              >
                My Requests
              </NavLink>

               <NavLink
                to="/dashboard/content-management"
                className={({ isActive }) =>
                  `px-3 py-2 rounded text-sm font-medium ${
                    isActive
                      ? "bg-red-500 text-white"
                      : "text-red-700 hover:bg-red-200"
                  }`
                }
                onClick={() => setSidebarOpen(false)}
              >
               Content Management
              </NavLink>

              <NavLink
  to="/dashboard/users-fund-donation"
  className={({ isActive }) =>
    `px-3 py-2 rounded text-sm font-medium ${
      isActive
        ? "bg-red-500 text-white"
        : "text-red-700 hover:bg-red-200"
    }`
  }
  onClick={() => setSidebarOpen(false)}
>
  All Funds
</NavLink>
            </>
          )}

          {role === "donor" && (
            <>
              <NavLink
                to="/dashboard/create-donation-request"
                className={({ isActive }) =>
                  `px-3 py-2 rounded text-sm font-medium ${
                    isActive
                      ? "bg-red-500 text-white"
                      : "text-red-700 hover:bg-red-200"
                  }`
                }
                onClick={() => setSidebarOpen(false)}
              >
              Create Donar Request
              </NavLink>
              <NavLink
                to="/dashboard/my-requests"
                className={({ isActive }) =>
                  `px-3 py-2 rounded text-sm font-medium ${
                    isActive
                      ? "bg-red-500 text-white"
                      : "text-red-700 hover:bg-red-200"
                  }`
                }
                onClick={() => setSidebarOpen(false)}
              >
                My Requests
              </NavLink>
            </>
          )}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 dark:bg-black text-black dark:text-white p-4">
     
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
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayouts;


