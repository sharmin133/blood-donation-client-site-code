import React, { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, NavLink } from "react-router";
import { FaChevronDown, FaUserShield, FaHandsHelping, FaUser } from "react-icons/fa";
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

// Demo login roles — wired to AuthContext's quickLoginAdmin / quickLoginVolunteer / quickLoginUser
const DEMO_ROLES = [
  { key: "admin", label: "Login as Admin", icon: <FaUserShield /> },
  { key: "volunteer", label: "Login as Volunteer", icon: <FaHandsHelping /> },
  { key: "user", label: "Login as User", icon: <FaUser /> },
];

const Navbar = () => {
  const {
    user,
    signOutUser,
    quickLoginAdmin,
    quickLoginVolunteer,
    quickLoginUser,
  } = useContext(AuthContext);

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [demoDropdownOpen, setDemoDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const demoDropdownRef = useRef();

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
    setDemoDropdownOpen(false);
  };

  const handleDemoLogin = (roleKey) => {
    if (roleKey === "admin") quickLoginAdmin?.();
    if (roleKey === "volunteer") quickLoginVolunteer?.();
    if (roleKey === "user") quickLoginUser?.();
    setDemoDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (demoDropdownRef.current && !demoDropdownRef.current.contains(event.target)) {
        setDemoDropdownOpen(false);
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
        <div className="hidden lg:flex items-center gap-3">
          {/* Demo login dropdown — only visible when logged out */}
          {!user && (
            <div className="relative" ref={demoDropdownRef}>
              <button
                onClick={() => setDemoDropdownOpen(!demoDropdownOpen)}
                className="flex items-center gap-2 px-4 py-2 rounded-full
                bg-transparent border border-red-100 text-white
                hover:bg-white/10 transition-all duration-300 cursor-pointer text-sm font-semibold"
              >
                Demo Login
                <FaChevronDown
                  className={`text-white text-xs transition-transform duration-300 ${
                    demoDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {demoDropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 rounded-xl bg-white border border-red-100 shadow-xl overflow-hidden z-50">
                  <div className="px-4 py-2.5 border-b border-red-100 bg-red-50">
                    <span className="text-xs font-semibold text-red-700 uppercase tracking-wide">
                      Try the platform as
                    </span>
                  </div>
                  {DEMO_ROLES.map((role) => (
                    <button
                      key={role.key}
                      onClick={() => handleDemoLogin(role.key)}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700
                                 hover:bg-red-50 hover:text-red-700 transition cursor-pointer
                                 border-b border-red-50 last:border-0"
                    >
                      <span className="w-8 h-8 rounded-full bg-red-100 text-red-600
                                       flex items-center justify-center text-sm shrink-0">
                        {role.icon}
                      </span>
                      {role.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}

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
            <div className="mt-4 pt-4 border-t border-white/10 space-y-4">
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

              {/* Demo login (mobile) — only visible when logged out */}
              {!user && (
                <div className="rounded-xl border border-white/20 overflow-hidden">
                  <div className="px-4 py-2.5 bg-white/10">
                    <span className="text-xs font-semibold text-red-100 uppercase tracking-wide">
                      Try the platform as
                    </span>
                  </div>
                  {DEMO_ROLES.map((role) => (
                    <button
                      key={role.key}
                      onClick={() => handleDemoLogin(role.key)}
                      className="w-full flex items-center gap-3 px-4 py-3 text-left text-white
                                 hover:bg-white/10 transition cursor-pointer border-t border-white/10"
                    >
                      <span className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center text-sm shrink-0">
                        {role.icon}
                      </span>
                      {role.label}
                    </button>
                  ))}
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