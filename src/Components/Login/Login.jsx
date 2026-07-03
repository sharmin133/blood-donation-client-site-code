import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { FaEye, FaEyeSlash, FaTint, FaEnvelope, FaLock } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Montenegrin+Gothic+One&display=swap';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const emailRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { userLogin } = useContext(AuthContext);
  const loginNavigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const handleLogIn = (email, password) => {
    setSuccessMessage('');
    setErrorMessage('');

    const passwordRegExp = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
    if (passwordRegExp.test(password) === false) {
      setErrorMessage(
        'Password must have one lowercase, one uppercase and be at least 6 characters long.'
      );
      return;
    }

    setSubmitting(true);
    userLogin(email, password)
      .then((result) => {
        console.log(result);
        setSuccessMessage(true);
        toast.success('User login successful.', {
          onClose: () => loginNavigate(from, { replace: true }),
        });
      })
      .catch((error) => {
        setErrorMessage(error.message);
        toast.error(error.message);
      })
      .finally(() => setSubmitting(false));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    handleLogIn(email, password);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-red-50 to-white px-4 py-16 overflow-hidden">
      <ToastContainer position="top-center" autoClose={3000} />

      {/* decorative background glow */}
      <div className="absolute -top-10 -right-10 w-72 h-72 bg-red-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-200/30 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        data-aos="zoom-in"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-sm bg-white rounded-3xl shadow-2xl border border-red-100 overflow-hidden"
      >
        {/* Header strip */}
        <div className="relative bg-gradient-to-r from-red-600 to-red-800 px-8 pt-8 pb-10 text-center overflow-hidden">
          <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <div className="relative w-14 h-14 mx-auto rounded-2xl bg-white/15 flex items-center justify-center text-white text-2xl mb-3 shadow-md">
            <FaTint />
          </div>
          <h1
            className="relative text-3xl text-white uppercase leading-none"
            style={{ fontFamily: "'Montenegrin Gothic One', serif" }}
          >
            Welcome Back
          </h1>
          <p className="relative text-red-100 text-sm mt-2">Log in to continue saving lives</p>
        </div>

        <div className="px-8 pt-8 pb-8 -mt-6 bg-white rounded-t-3xl relative">
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-red-400 text-sm" />
                <input
                  ref={emailRef}
                  type="email"
                  name="email"
                  className="w-full pl-11 pr-4 py-2.5 rounded-lg border border-red-100 bg-white text-gray-800
                             focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-400 transition"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-red-400 text-sm" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  autoComplete="current-password"
                  className="w-full pl-11 pr-11 py-2.5 rounded-lg border border-red-100 bg-white text-gray-800
                             focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-400 transition"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-600
                             transition-colors cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={submitting}
              whileHover={{ scale: submitting ? 1 : 1.02 }}
              whileTap={{ scale: submitting ? 1 : 0.98 }}
              className="w-full bg-red-700 hover:bg-red-800 text-white font-semibold py-3 rounded-full
                         shadow-lg transition-colors cursor-pointer disabled:opacity-60"
            >
              {submitting ? 'Logging in...' : 'Login'}
            </motion.button>
          </form>

          {errorMessage && (
            <p className="mt-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {errorMessage}
            </p>
          )}
          {successMessage && (
            <p className="mt-4 text-sm text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2">
              Login successful — redirecting...
            </p>
          )}

          <p className="mt-6 text-sm text-center text-gray-600">
            New to this site?{' '}
            <Link to="/register" className="text-red-700 font-semibold hover:text-red-800 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default Login;