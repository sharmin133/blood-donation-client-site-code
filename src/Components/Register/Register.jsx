import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { FaEyeSlash, FaEye, FaTint, FaUser, FaEnvelope, FaLock, FaCamera, FaMapMarkerAlt } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateProfile } from 'firebase/auth';
import { AuthContext } from '../context/AuthContext';
import { auth } from '../../Firebase/.firebase.init';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { motion } from 'framer-motion';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const inputClass =
  'w-full pl-11 pr-4 py-2.5 rounded-lg border border-red-100 bg-white text-gray-800 ' +
  'focus:outline-none focus:ring-2 focus:ring-red-300 focus:border-red-400 transition';

const labelClass = 'block text-sm font-semibold text-gray-700 mb-1.5';

const Register = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState('');

  const [districtsData, setDistrictsData] = useState({});
  const [districtsMap, setDistrictsMap] = useState({});
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [upazilas, setUpazilas] = useState([]);
  const [selectedUpazila, setSelectedUpazila] = useState('');

  const { createUser, setUser, userLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Montenegrin+Gothic+One&display=swap';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  // District & Upazila data fetch
  useEffect(() => {
    fetch('/districtData.json')
      .then((res) => res.json())
      .then((jsonData) => {
        const tableEntry = jsonData.find((entry) => entry.type === 'table' && entry.name === 'districts');
        if (tableEntry && Array.isArray(tableEntry.data)) {
          const districtsObj = {};
          const districtsMapObj = {};
          tableEntry.data.forEach((district) => {
            districtsObj[district.name] = [];
            districtsMapObj[district.name] = district.id;
          });
          setDistrictsData(districtsObj);
          setDistrictsMap(districtsMapObj);
        }
      });
  }, []);

  useEffect(() => {
    if (!selectedDistrict) {
      setUpazilas([]);
      setSelectedUpazila('');
      return;
    }
    const districtId = districtsMap[selectedDistrict];
    fetch('/upazilaData.json')
      .then((res) => res.json())
      .then((jsonData) => {
        const tableEntry = jsonData.find((entry) => entry.type === 'table' && entry.name === 'upazilas');
        if (tableEntry && Array.isArray(tableEntry.data)) {
          const filtered = tableEntry.data
            .filter((u) => String(u.district_id) === String(districtId))
            .map((u) => u.name);
          setUpazilas(filtered);
          setSelectedUpazila('');
        }
      });
  }, [selectedDistrict, districtsMap]);

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setAvatarPreview(reader.result);
    reader.readAsDataURL(file);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const name = e.target.name.value.trim();
    const email = e.target.email.value.trim();
    const bloodGroup = e.target.bloodGroup.value;
    const district = e.target.district.value;
    const upazila = e.target.upazila.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirm_password.value;
    const avatarFile = e.target.avatar?.files?.[0];

    setErrorMessage('');
    setSuccessMessage('');

    if (!name || !email || !bloodGroup || !district || !upazila || !password || !confirmPassword) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage("Passwords don't match.");
      return;
    }
    const passwordRegExp = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
    if (!passwordRegExp.test(password)) {
      setErrorMessage('Password must contain uppercase, lowercase, and be at least 6 characters.');
      return;
    }

    setSubmitting(true);

    let avatarLink = '';
    if (avatarFile) {
      const formData = new FormData();
      formData.append('image', avatarFile);
      try {
        const res = await axios.post(
          `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`,
          formData
        );
        avatarLink = res.data.data.display_url;
      } catch (err) {
        console.log(err);
        toast.error('Failed to upload avatar.');
        setSubmitting(false);
        return;
      }
    }

    createUser(email, password)
      .then(() => {
        updateProfile(auth.currentUser, { displayName: name, photoURL: avatarLink }).then(async () => {
          await auth.currentUser.reload();
          setUser({ ...auth.currentUser });

          await axios.post('https://blood-donation-vert.vercel.app/users', {
            name,
            email,
            photoURL: avatarLink,
            bloodGroup,
            district,
            upazila,
            role: 'donor',
            status: 'active',
          });

          toast.success('Registration successful!', {
            onClose: () => navigate(from, { replace: true }),
          });
        });
      })
      .catch((error) => {
        setErrorMessage(error.message);
        toast.error(error.message);
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-white via-red-50 to-white px-4 py-16 flex items-center justify-center overflow-hidden">
      <ToastContainer position="top-center" autoClose={3000} />

      {/* decorative background glow */}
      <div className="absolute -top-10 -right-10 w-72 h-72 bg-red-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-200/30 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        data-aos="fade-up"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl border border-red-100 overflow-hidden"
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
            Join RedHope
          </h1>
          <p className="relative text-red-100 text-sm mt-2">Register as a donor and start saving lives</p>
        </div>

        <div className="px-8 pt-8 pb-8 -mt-6 bg-white rounded-t-3xl relative">
          <form onSubmit={handleRegister} className="space-y-4">

            {/* Avatar upload */}
            <div className="flex flex-col items-center mb-2" data-aos="fade-up" data-aos-delay="50">
              <label className="cursor-pointer group">
                <div className="w-20 h-20 rounded-full border-2 border-dashed border-red-200 bg-red-50/50
                                flex items-center justify-center overflow-hidden group-hover:bg-red-50 transition">
                  {avatarPreview ? (
                    <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover" />
                  ) : (
                    <FaCamera className="text-red-300 text-xl" />
                  )}
                </div>
                <input type="file" accept="image/*" name="avatar" onChange={handleAvatarChange} className="hidden" />
              </label>
              <span className="text-xs text-gray-400 mt-2">Upload a photo (optional)</span>
            </div>

            {/* Name */}
            <div data-aos="fade-up" data-aos-delay="100">
              <label className={labelClass}>Name</label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-red-400 text-sm" />
                <input type="text" name="name" placeholder="Your full name" className={inputClass} required />
              </div>
            </div>

            {/* Email */}
            <div data-aos="fade-up" data-aos-delay="150">
              <label className={labelClass}>Email</label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-red-400 text-sm" />
                <input type="email" placeholder="you@example.com" name="email" className={inputClass} required />
              </div>
            </div>

            {/* Blood Group */}
            <div data-aos="fade-up" data-aos-delay="200">
              <label className={labelClass}>Blood Group</label>
              <div className="relative">
                <FaTint className="absolute left-4 top-1/2 -translate-y-1/2 text-red-400 text-sm" />
                <select name="bloodGroup" className={inputClass} required defaultValue="">
                  <option value="" disabled>Select your blood group</option>
                  {BLOOD_GROUPS.map((bg) => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* District */}
            <div data-aos="fade-up" data-aos-delay="250">
              <label className={labelClass}>District</label>
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-red-400 text-sm" />
                <select
                  name="district"
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className={inputClass}
                  required
                >
                  <option value="">Select district</option>
                  {Object.keys(districtsData).map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Upazila */}
            <div data-aos="fade-up" data-aos-delay="300">
              <label className={labelClass}>Upazila</label>
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-red-400 text-sm" />
                <select
                  name="upazila"
                  value={selectedUpazila}
                  onChange={(e) => setSelectedUpazila(e.target.value)}
                  className={`${inputClass} disabled:bg-red-50 disabled:cursor-not-allowed`}
                  required
                  disabled={!selectedDistrict}
                >
                  <option value="">Select upazila</option>
                  {upazilas.map((u) => (
                    <option key={u} value={u}>{u}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Password */}
            <div data-aos="fade-up" data-aos-delay="350">
              <label className={labelClass}>Password</label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-red-400 text-sm" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className={`${inputClass} pr-11`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div data-aos="fade-up" data-aos-delay="400">
              <label className={labelClass}>Confirm Password</label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-red-400 text-sm" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirm_password"
                  className={`${inputClass} pr-11`}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                >
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              disabled={submitting}
              whileHover={{ scale: submitting ? 1 : 1.02 }}
              whileTap={{ scale: submitting ? 1 : 0.98 }}
              data-aos="zoom-in"
              data-aos-delay="450"
              className="w-full bg-red-700 hover:bg-red-800 text-white font-semibold py-3 rounded-full
                         shadow-lg transition-colors cursor-pointer disabled:opacity-60"
            >
              {submitting ? 'Creating account...' : 'Sign Up'}
            </motion.button>
          </form>

          {errorMessage && (
            <p className="mt-4 text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2 text-center">
              {errorMessage}
            </p>
          )}
          {successMessage && (
            <p className="mt-4 text-sm text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-lg px-3 py-2 text-center">
              {successMessage}
            </p>
          )}

          <p className="mt-6 text-sm text-center text-gray-600">
            Already have an account?{' '}
            <Link className="text-red-700 font-semibold hover:text-red-800 hover:underline" to="/login">
              Login
            </Link>
          </p>
        </div>
      </motion.div>
    </section>
  );
};

export default Register;