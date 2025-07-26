import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router'; // Use react-router-dom (latest)

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        console.log('signout successfully');
        setIsMobileMenuOpen(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="bg-white border-b dark:bg-gray-900 sticky w-full z-50">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/Image/blood logo.png" className="h-12 w-12 rounded-full" alt="redHope Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-red-600 dark:text-red-500">
            RedHope
          </span>
        </Link>

        {/* Hamburger Icon for Mobile */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-controls="navbar-user"
          aria-expanded={isMobileMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Navigation Links */}
        <div
          className={`w-full md:flex md:w-auto ${isMobileMenuOpen ? 'block' : 'hidden'}`}
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg 
              bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white 
              dark:bg-gray-800 md:dark:bg-gray-900">

            <li>
              <Link
                to="/"
                onClick={handleLinkClick}
                className="block py-2 px-3 text-gray-900 md:text-red-600 dark:text-white hover:underline"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/search"
                onClick={handleLinkClick}
                className="block py-2 px-3 text-gray-900 dark:text-white hover:underline"
              >
               Search
              </Link>
            </li>


              <li>
              <Link
                to="/donation-requests"
                onClick={handleLinkClick}
                className="block py-2 px-3 text-gray-900 dark:text-white hover:underline"
              >
                Donation Request 
              </Link>
            </li>


            <li>
              <Link
                to="/blogs"
                onClick={handleLinkClick}
                className="block py-2 px-3 text-gray-900 dark:text-white hover:underline"
              >
                Blog
              </Link>
            </li>

             <li>
                  <Link
                    to="/fund"
                    onClick={handleLinkClick}
                    className="block py-2 px-3 text-gray-900 dark:text-white hover:underline"
                  >
                    Funding
                  </Link>
                </li>

            {user && (
              <>
               

                

                <li>
                  <Link
                    to="/dashboard"
                    onClick={handleLinkClick}
                    className="block py-2 px-3 text-gray-900 dark:text-white md:hidden hover:underline"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleSignOut();
                    }}
                    className="block w-full text-left py-2 px-3 text-gray-900 md:hidden dark:text-white hover:underline"
                  >
                    Log Out
                  </button>
                </li>
              </>
            )}

            {!user && (
              <>
                <li className="md:hidden">
                  <Link
                    to="/login"
                    onClick={handleLinkClick}
                    className="block py-2 px-3 text-gray-900 dark:text-white hover:underline"
                  >
                    Log In
                  </Link>
                </li>
                <li className="md:hidden">
                  <Link
                    to="/register"
                    onClick={handleLinkClick}
                    className="block py-2 px-3 text-gray-900 dark:text-white hover:underline"
                  >
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Desktop right side: avatar dropdown or login/signup */}
        <div className="hidden md:flex items-center space-x-3">
          {user ? (
            <div className="relative group">
              <img
                key={user?.photoURL}
                className="md:w-12 md:h-12 w-8 h-8 rounded-full border-2 border-red-500 cursor-pointer"
                src={user?.photoURL }
                alt={user?.displayName}
                title={user?.displayName}
              />

              {/* Dropdown menu */}
              <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-opacity">
                <Link
                  to="/dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  className="w-full text-left px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  Log Out
                </button>
              </div>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link to="/register">
                <span className="md:text-lg bg-red-600 text-white rounded-2xl px-4 py-2 font-medium">
                  Sign Up
                </span>
              </Link>
              <Link to="/login">
                <span className="md:text-lg bg-red-600 text-white rounded-2xl px-4 py-2 font-medium">
                  Log In
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
