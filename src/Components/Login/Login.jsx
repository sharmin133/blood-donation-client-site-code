import React, { useContext, useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const emailRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { userLogin } = useContext(AuthContext);
  const loginNavigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  const handleLogIn = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;
    setSuccessMessage('');
    setErrorMessage('');

    const passwordRegExp = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
    if (passwordRegExp.test(password) === false) {
      setErrorMessage(
        'Password must have one lowercase, one uppercase and be at least 6 characters long.'
      );
      return;
    }

    userLogin(email, password)
      .then((result) => {
        console.log(result.data)
        setSuccessMessage(true);
        toast.success('User login successful.', {
          onClose: () => loginNavigate(from, { replace: true }),
        });
      })
      .catch((error) => {
        setErrorMessage(error.message);
        toast.error(error.message);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-black px-4 ">
      <ToastContainer position="top-center" autoClose={3000} />

      <div
        data-aos="zoom-in"
        className="card w-full max-w-sm  shadow-lg  border-1 border-red-600 p-6 rounded-xl"
      >
        <h1 className="text-4xl font-bold text-center mb-6 text-red-600 dark:text-red-500">
          Login Now
        </h1>

        <form onSubmit={handleLogIn} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black dark:text-white">
              Email
            </label>
            <input
              ref={emailRef}
              type="email"
              name="email"
              className="mt-1 input w-full bg-gray-100 dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-700 rounded px-3 py-2"
              placeholder="Enter your email"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-black dark:text-white">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                autoComplete="current-password"
                className="mt-1 input w-full bg-gray-100 dark:bg-gray-800 text-black dark:text-white border border-gray-300 dark:border-gray-700 rounded px-3 py-2 pr-10"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-2.5 right-3 text-black dark:text-white"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Login
          </button>
        </form>

        {errorMessage && (
          <p className="mt-3 text-sm text-red-500">{errorMessage}</p>
        )}
        {successMessage && (
          <p className="mt-3 text-sm text-green-500">
            User login successfully.
          </p>
        )}

        <p className="mt-4 text-sm text-center text-black dark:text-gray-300">
          New to this site?{' '}
          <Link to="/register" className="text-red-600 underline hover:text-red-800">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
