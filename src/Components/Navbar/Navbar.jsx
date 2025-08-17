import React, { useContext, useState, useRef, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link, NavLink } from 'react-router'; // ✅ FIXED: use react-router-dom, not react-router
import "./navbar.css";

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        console.log('signout successfully');
        setIsMobileMenuOpen(false);
        setDropdownOpen(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
    setDropdownOpen(false);
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-[#FF0000]  sticky w-full z-50">
      <div className="px-20 flex flex-wrap items-center justify-between mx-auto p-4">

        {/* Logo */}
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/Image/blood logo.png" className="h-12 w-12 rounded-full" alt="redHope Logo" />
          <span className="self-center text-2xl  whitespace-nowrap text-black font-bold">
            RedHope
          </span>
        </Link>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm  rounded-lg md:hidden "
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Nav links (responsive) */}
        <div
          className={`w-full md:flex md:w-auto ${isMobileMenuOpen ? 'block' : 'hidden'}`}
          id="navbar-user"
        >
          <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 
               md:flex-row md:space-x-8 md:mt-0 md:border-0  text-lg
               ">

            <li>
              <NavLink to="/" onClick={handleLinkClick} className="nav-link">Home</NavLink>
            </li>

            <li>
              <NavLink to="/donation-requests" onClick={handleLinkClick} className="nav-link">Donation Request</NavLink>
            </li>

            <li>
              <NavLink to="/blogs" onClick={handleLinkClick} className="nav-link">Blog</NavLink>
            </li>

            <li>
              <NavLink to="/fund" onClick={handleLinkClick} className="nav-link">Funding</NavLink>
            </li>

            {user && (
              <>
                <li>
                  <NavLink to="/dashboard" onClick={handleLinkClick} className="nav-link md:hidden">Dashboard</NavLink>
                </li>
                <li>
                  <button onClick={handleSignOut} className="block w-full text-left nav-link md:hidden">Log Out</button>
                </li>
              </>
            )}

            {!user && (
              <>
                <li className="md:hidden">
                  <Link to="/login" onClick={handleLinkClick} className="nav-link ">Log In</Link>
                </li>
                <li className="md:hidden">
                  <Link to="/register" onClick={handleLinkClick} className="nav-link">Sign Up</Link>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Desktop dropdown for logged-in user */}
        <div className="hidden md:flex items-center space-x-3">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <img
                key={user?.photoURL}
                className="md:w-12 md:h-12 w-8 h-8 rounded-full border-2 border-red-500 cursor-pointer"
                src={user?.photoURL}
                alt={user?.displayName}
                title={user?.displayName}
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-md shadow-lg z-50">
                  <Link
                    to="/dashboard"
                    onClick={handleLinkClick}
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
              )}
            </div>
          ) : (
            <div className="flex gap-2">
              <Link to="/register">
                <span className="md:text-lg bg-white text-red-600 rounded-2xl px-4 py-2 font-medium">
                  Sign Up
                </span>
              </Link>
              <Link to="/login">
                <span className="md:text-lg bg-white text-red-600 rounded-2xl px-4 py-2 font-medium">
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
