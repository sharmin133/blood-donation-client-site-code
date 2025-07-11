import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router'; // ✅ Corrected import
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateProfile } from 'firebase/auth';
import { AuthContext } from '../context/AuthContext';
import { auth } from '../../Firebase/.firebase.init';
import axios from 'axios';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

const Register = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [districtsData, setDistrictsData] = useState({});
  const [districtsMap, setDistrictsMap] = useState({});
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [upazilas, setUpazilas] = useState([]);
  const [selectedUpazila, setSelectedUpazila] = useState('');

  const { createUser, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || '/';

  useEffect(() => {
    fetch('/districtData.json')
      .then(res => res.json())
      .then(jsonData => {
        const tableEntry = jsonData.find(entry => entry.type === 'table' && entry.name === 'districts');
        if (tableEntry && Array.isArray(tableEntry.data)) {
          const districtsObj = {};
          const districtsMapObj = {};
          tableEntry.data.forEach(district => {
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
      .then(res => res.json())
      .then(jsonData => {
        const tableEntry = jsonData.find(entry => entry.type === 'table' && entry.name === 'upazilas');
        if (tableEntry && Array.isArray(tableEntry.data)) {
          const filtered = tableEntry.data.filter(u => String(u.district_id) === String(districtId)).map(u => u.name);
          setUpazilas(filtered);
          setSelectedUpazila('');
        }
      });
  }, [selectedDistrict, districtsMap]);

  const handleRegister = async e => {
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
        console.log(err)
        toast.error('Failed to upload avatar.');
        return;
      }
    }

  createUser(email, password)
  .then(() => {
    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: avatarLink,
    }).then(async () => {
      await auth.currentUser.reload();
      setUser({ ...auth.currentUser });

      // ✅ Save to MongoDB via Express API
      await axios.post('http://localhost:3000/users', {
        name,
        email,
        photoURL: avatarLink,
        bloodGroup,
        district,
        upazila,
        role: 'donor',  
        status: 'active'  
      });

      // ✅ Toast and redirect
      toast.success('Registration successful!', {
        onClose: () => navigate(from, { replace: true }),
      });
    });
  })
  .catch(error => {
    setErrorMessage(error.message);
    toast.error(error.message);
  });

  };

  return (
    <div className="bg-white dark:bg-black py-10 min-h-screen flex items-center justify-center px-4">
      <ToastContainer position="top-center" autoClose={3000} />
      <div className="card mx-auto w-full max-w-md shadow-xl rounded-xl bg-white dark:bg-black p-8 border-4 border-red-600">
        <h1 className="text-4xl font-bold text-red-700 dark:text-red-500 mb-6 text-center">Sign Up</h1>
        <form onSubmit={handleRegister} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-semibold text-black dark:text-white">Name</label>
            <input type="text" name="name" className="input input-bordered w-full" required />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-semibold text-black dark:text-white">Email</label>
            <input type="email" name="email" className="input input-bordered w-full" required />
          </div>

          {/* Avatar upload */}
          <div>
            <label className="block text-sm font-semibold text-black dark:text-white">Photo</label>
            <input  type="file" accept="image/*" name="avatar" className="mb-2 w-full" />
          </div>

          {/* Blood Group */}
          <div>
            <label className="block text-sm font-semibold text-black dark:text-white">Blood Group</label>
            <select name="bloodGroup" className="input input-bordered w-full" required defaultValue="">
              <option value="" disabled>Select your blood group</option>
              {BLOOD_GROUPS.map(bg => <option key={bg} value={bg}>{bg}</option>)}
            </select>
          </div>

          {/* District */}
          <div>
            <label className="block text-sm font-semibold text-black dark:text-white">District</label>
            <select
              name="district"
              value={selectedDistrict}
              onChange={e => setSelectedDistrict(e.target.value)}
              className="input input-bordered w-full"
              required
            >
              <option value="">Select district</option>
              {Object.keys(districtsData).map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          {/* Upazila */}
          <div>
            <label className="block text-sm font-semibold text-black dark:text-white">Upazila</label>
            <select
              name="upazila"
              value={selectedUpazila}
              onChange={e => setSelectedUpazila(e.target.value)}
              className="input input-bordered w-full"
              required
              disabled={!selectedDistrict}
            >
              <option value="">Select upazila</option>
              {upazilas.map(u => <option key={u} value={u}>{u}</option>)}
            </select>
          </div>

          {/* Password */}
          <div className="relative">
            <label className="block text-sm font-semibold text-black dark:text-white">Password</label>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              className="input input-bordered w-full"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-9 right-3 text-red-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label className="block text-sm font-semibold text-black dark:text-white">Confirm Password</label>
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              name="confirm_password"
              className="input input-bordered w-full"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute top-9 right-3 text-red-600"
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold text-lg rounded-lg py-2">
            Sign Up
          </button>
        </form>

        {errorMessage && <p className="text-red-600 mt-4 text-center">{errorMessage}</p>}
        {successMessage && <p className="text-green-600 mt-4 text-center">{successMessage}</p>}

        <p className="mt-6 text-center text-black dark:text-white">
          Already have an account? <Link className="text-red-600 underline hover:text-red-800" to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;


