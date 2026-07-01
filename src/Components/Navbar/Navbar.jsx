import React, { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, NavLink } from "react-router";
import { FaChevronDown } from "react-icons/fa";
import "./navbar.css";

// Centralized nav links
const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/donation-requests", label: "Donation Request" },
  { to: "/blogs", label: "Blog" },
  { to: "about-us", label: "About" },
  { to: "/fund", label: "Funding", protected: true },
  { to: "/dashboard", label: "Dashboard", protected: true, mobileOnly: true },
];

const Navbar = () => {
  const { user, signOutUser } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
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


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const visibleLinks = (mobile) =>
    NAV_LINKS.filter((link) => {
      if (link.protected && !user) return false;
      if (link.mobileOnly && !mobile) return false;
      return true;
    });

  return (
    <nav className="bg-red-700 top-0 sticky w-full z-50 shadow-md relative ">
      <div className=" flex flex-wrap items-center justify-between mx-auto p-4  max-w-7xl">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="/Image/blood logo.png"
            className="h-12 w-12 rounded-full"
            alt="redHope Logo"
          />
          <span className="self-center text-2xl whitespace-nowrap text-red-100 font-bold">
            RedHope
          </span>
        </Link>

        {/* Mobile menu toggle  */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center rounded-lg lg:hidden text-white hover:bg-red-700 cursor-pointer relative z-50"
        >
          <span className="sr-only">Open main menu</span>
          <div className="w-6 h-6 relative">
            <span
              className={`absolute left-0 top-1/2 w-6 h-0.5 bg-white rounded transition-all duration-300 ease-in-out
                ${isMobileMenuOpen ? "rotate-45" : "-translate-y-2"}`}
            />
            <span
              className={`absolute left-0 top-1/2 w-6 h-0.5 bg-white rounded transition-all duration-300 ease-in-out
                ${isMobileMenuOpen ? "opacity-0" : "opacity-100"}`}
            />
            <span
              className={`absolute left-0 top-1/2 w-6 h-0.5 bg-white rounded transition-all duration-300 ease-in-out
                ${isMobileMenuOpen ? "-rotate-45" : "translate-y-2"}`}
            />
          </div>
        </button>

        {/* Desktop Nav links */}
        <div className="hidden lg:flex lg:w-auto" id="navbar-user-desktop">
          <ul className="flex flex-row items-center space-x-8 font-medium  text-white">
            {visibleLinks(false).map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className="nav-link hover:text-red-200 transition-colors"
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Desktop right side  */}
        <div className="hidden lg:flex items-center">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-3 px-4 py-2 rounded-full
                bg-white/10 border border-white/30
                hover:bg-white/20 hover:border-white
                transition-all duration-300 cursor-pointer"
              >
                <img
                  className="w-10 h-10 rounded-full object-cover border-2 border-white/50"
                  src={user?.photoURL}
                  alt={user?.displayName}
                />
                <span className="text-white font-medium max-w-[120px] truncate">
                  {user?.displayName}
                </span>
                <FaChevronDown
                  className={`text-white text-xs transition-transform duration-300 ${
                    dropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-52 rounded-xl bg-red-700 border border-white/20 shadow-xl overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-white/20 text-white bg-red-600">
                    <span className="font-semibold">
                      Hi, {user?.displayName}!
                    </span>
                  </div>

                  <Link
                    to="/dashboard"
                    onClick={handleLinkClick}
                    className="block px-4 py-3 text-white border-b border-white/20 hover:bg-red-600/40 transition"
                  >
                    Dashboard
                  </Link>

                  <button
                    onClick={handleSignOut}
                    className="w-full text-left px-4 py-3 cursor-pointer text-white border-b border-white/20 hover:bg-red-600/40 transition"
                  >
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-3">
              <Link to="/login">
                <button className="bg-red-100 text-red-700 px-5 py-2 rounded-full font-semibold hover:bg-red-50 transition cursor-pointer">
                  Log In
                </button>
              </Link>
              <Link to="/register">
                <button
                  className="bg-transparent text-white border
                 border-red-100 px-5 py-2 rounded-full font-semibold
                  hover:bg-red-100 hover:text-red-700 transition cursor-pointer"
                >
                  Sign Up
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Mobile full dropdown menu  */}
        <div
          className={`lg:hidden absolute left-0 right-0 top-full px-4 transition-all duration-300 ease-in-out
          ${isMobileMenuOpen ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 -translate-y-2 pointer-events-none"}`}
        >
          <div className="bg-red-700 rounded-xl p-4 mt-2 shadow-xl">
            <ul className="flex flex-col font-medium text-lg text-white divide-y divide-white/10">
              {visibleLinks(true).map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    onClick={handleLinkClick}
                    className="block py-3 hover:text-red-200 transition-colors"
                  >
                    {link.label}
                  </NavLink>
                </li>
              ))}
            </ul>

            {/* Mobile bottom section */}
            <div className="mt-4 pt-4 border-t border-white/10">
              {user ? (
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      className="w-10 h-10 rounded-full object-cover border-2 border-white/50"
                      src={user?.photoURL}
                      alt={user?.displayName}
                    />
                    <span className="text-white font-medium max-w-[140px] truncate">
                      {user?.displayName}
                    </span>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="bg-red-100 text-red-700 px-4 py-2 rounded-full font-semibold hover:bg-red-50 transition cursor-pointer"
                  >
                    Log Out
                  </button>
                </div>
              ) : (
                <div className="flex gap-3">
                  <Link
                    to="/login"
                    onClick={handleLinkClick}
                    className="flex-1"
                  >
                    <button className="w-full bg-red-100 text-red-700 px-5 py-2 rounded-full font-semibold hover:bg-red-50 transition cursor-pointer">
                      Log In
                    </button>
                  </Link>
                  <Link
                    to="/register"
                    onClick={handleLinkClick}
                    className="flex-1"
                  >
                    <button className="w-full bg-transparent text-white border border-red-100 px-5 py-2 rounded-full font-semibold hover:bg-red-100 hover:text-red-700 transition cursor-pointer">
                      Sign Up
                    </button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
