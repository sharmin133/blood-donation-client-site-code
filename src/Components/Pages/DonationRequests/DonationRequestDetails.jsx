import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaTint,
  FaMapMarkerAlt,
  FaHospital,
  FaCalendarAlt,
  FaClock,
  FaEnvelope,
  FaArrowLeft,
  FaTimes,
  FaHandHoldingHeart,
  FaCheckCircle,
} from 'react-icons/fa';

const STATUS_STYLES = {
  pending: 'bg-amber-100 text-amber-700 border-amber-200',
  inprogress: 'bg-blue-100 text-blue-700 border-blue-200',
  done: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  cancelled: 'bg-gray-100 text-gray-600 border-gray-200',
};

const DonationRequestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [request, setRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [justConfirmed, setJustConfirmed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Montenegrin+Gothic+One&display=swap';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  useEffect(() => {
    axios
      .get(`https://blood-donation-vert.vercel.app/donation-requests/${id}`)
      .then((res) => setRequest(res.data))
      .catch((err) => console.error('Failed to load request details:', err));
  }, [id]);

  // Lock scroll while any modal open
  useEffect(() => {
    document.body.style.overflow = showModal || justConfirmed ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [showModal, justConfirmed]);

  const handleDonate = async () => {
    setSubmitting(true);
    try {
      await axios.patch(`https://blood-donation-vert.vercel.app/donation-requests/${id}`, {
        status: 'inprogress',
        donorName: user.displayName,
        donorEmail: user.email,
      });

      setRequest((prev) => ({ ...prev, status: 'inprogress' }));
      setShowModal(false);
      setJustConfirmed(true);
      toast.success('Donation confirmed! Thank you for saving a life. 💖');
    } catch (err) {
      toast.error('Failed to confirm donation');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  // Loading state
  if (!request) {
    return (
      <section className="relative bg-gradient-to-b from-white via-red-50 to-white px-4 py-16 min-h-screen">
        <div className="max-w-2xl mx-auto animate-pulse pt-10">
          <div className="h-5 bg-red-100 rounded w-32 mb-8" />
          <div className="bg-white border border-red-100 rounded-2xl shadow-md p-8 space-y-4">
            <div className="h-7 bg-red-100 rounded w-1/2" />
            <div className="h-4 bg-red-100 rounded w-full" />
            <div className="h-4 bg-red-100 rounded w-4/5" />
            <div className="h-4 bg-red-100 rounded w-3/5" />
            <div className="h-10 bg-red-100 rounded-full w-40 mt-6" />
          </div>
        </div>
      </section>
    );
  }

  const statusStyle = STATUS_STYLES[request.status] || STATUS_STYLES.pending;

  const infoRows = [
    { icon: <FaTint />, label: 'Blood Group', value: request.bloodGroup, highlight: true },
    { icon: <FaMapMarkerAlt />, label: 'District', value: request.recipientDistrict },
    { icon: <FaMapMarkerAlt />, label: 'Upazila', value: request.recipientUpazila },
    { icon: <FaHospital />, label: 'Hospital', value: request.hospitalName },
    { icon: <FaCalendarAlt />, label: 'Donation Date', value: request.donationDate },
    { icon: <FaClock />, label: 'Donation Time', value: request.donationTime },
    { icon: <FaEnvelope />, label: 'Requester Email', value: request.requesterEmail },
  ];

  return (
    <section className="relative bg-gradient-to-b from-white via-red-50 to-white px-4 md:px-12 py-16 min-h-screen overflow-hidden">
      <ToastContainer position="top-right" autoClose={3500} />

      {/* decorative background glow */}
      <div className="absolute -top-10 -right-10 w-72 h-72 bg-red-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-2xl mx-auto pt-6">

        {/* Back link */}
        <Link
          to="/donation-requests"
          className="inline-flex items-center gap-2 text-red-700 font-semibold text-sm
                     hover:text-red-800 hover:gap-3 transition-all mb-8"
        >
          <FaArrowLeft className="text-xs" /> Back to Requests
        </Link>

        {/* Heading */}
        <div className="mb-6">
          <span className="inline-flex items-center gap-2 bg-red-50 text-red-700 text-xs font-semibold
                            tracking-widest uppercase px-4 py-1.5 rounded-full mb-4 border border-red-200">
            <FaHandHoldingHeart className="text-red-500" /> Request Details
          </span>
          <h2
            className="text-2xl md:text-4xl text-gray-900 leading-tight"
            style={{ fontFamily: "'Montenegrin Gothic One', serif" }}
          >
            {request.recipientName}
          </h2>
        </div>

        {/* Details card */}
        <div className="relative bg-white border border-red-100 rounded-3xl shadow-xl overflow-hidden">

          {/* Card header strip */}
          <div className="relative bg-gradient-to-r from-red-600 to-red-800 px-6 md:px-8 py-5 flex items-center justify-between">
            <div className="absolute -right-6 -top-6 w-28 h-28 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <span className="relative text-white font-semibold flex items-center gap-2">
              <FaTint className="text-red-200" /> Recipient Needs Blood
            </span>
            <span className={`relative inline-block text-xs font-bold uppercase tracking-wide px-3 py-1.5 rounded-full border ${statusStyle}`}>
              {request.status}
            </span>
          </div>

          <div className="p-6 md:p-8">
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-5">
              {infoRows.map(({ icon, label, value, highlight }) => (
                <div key={label} className={`flex items-start gap-3 ${highlight ? 'sm:col-span-2' : ''}`}>
                  <span
                    className={`w-10 h-10 shrink-0 rounded-xl flex items-center justify-center text-sm shadow-sm ${
                      highlight
                        ? 'bg-gradient-to-br from-red-500 to-red-700 text-white'
                        : 'bg-red-50 text-red-600 border border-red-100'
                    }`}
                  >
                    {icon}
                  </span>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wide font-semibold">{label}</p>
                    <p className={`font-semibold ${highlight ? 'text-xl text-red-700' : 'text-gray-900'}`}>
                      {value || '—'}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {request.status === 'pending' && (
              <motion.button
                onClick={() => setShowModal(true)}
                className="mt-8 inline-flex items-center gap-2 bg-red-700 text-white font-semibold
                           px-8 py-3.5 rounded-full shadow-lg hover:bg-red-800 transition-colors cursor-pointer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <FaTint className="text-sm" /> Donate Now
              </motion.button>
            )}

            {request.status !== 'pending' && (
              <div className="mt-8 inline-flex items-center gap-2 text-sm text-gray-500 bg-gray-50
                              border border-gray-200 px-4 py-2.5 rounded-full">
                This request is no longer accepting new donors.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Donate Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="relative bg-white p-7 rounded-2xl max-w-md w-full shadow-2xl border border-red-100"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowModal(false)}
                aria-label="Close"
                className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center rounded-full
                           text-gray-400 hover:text-red-700 hover:bg-red-50 transition-colors cursor-pointer"
              >
                <FaTimes />
              </button>

              <h3 className="text-xl font-bold text-red-700 mb-1">Confirm Your Donation</h3>
              <p className="text-gray-500 text-sm mb-6">
                Your details will be shared with the requester once confirmed.
              </p>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleDonate();
                }}
              >
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Donor Name</label>
                  <input
                    type="text"
                    value={user.displayName}
                    disabled
                    className="w-full px-4 py-2.5 rounded-lg border border-red-100 bg-red-50 text-gray-500 cursor-not-allowed"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Donor Email</label>
                  <input
                    type="text"
                    value={user.email}
                    disabled
                    className="w-full px-4 py-2.5 rounded-lg border border-red-100 bg-red-50 text-gray-500 cursor-not-allowed"
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 px-6 py-3 bg-white border-2 border-gray-200 text-gray-700
                               font-semibold rounded-xl hover:border-red-300 hover:text-red-700
                               transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 px-6 py-3 bg-red-700 text-white font-semibold rounded-xl
                               shadow-md hover:bg-red-800 transition-colors cursor-pointer disabled:opacity-60"
                  >
                    {submitting ? 'Confirming...' : 'Confirm Donation'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success celebration overlay */}
      <AnimatePresence>
        {justConfirmed && (
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setJustConfirmed(false)}
          >
            <motion.div
              className="relative bg-gradient-to-br from-white via-emerald-50 to-white p-8 rounded-3xl
                         max-w-sm w-full shadow-2xl border border-emerald-100 text-center overflow-hidden"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none" />

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.15, type: 'spring', stiffness: 200 }}
                className="relative w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600
                           flex items-center justify-center text-white text-4xl mb-5 shadow-lg"
              >
                <FaCheckCircle />
              </motion.div>

              <h3 className="relative text-2xl font-bold text-emerald-700 mb-2">You're a Hero!</h3>
              <p className="relative text-gray-600 leading-relaxed mb-6">
                Your donation has been confirmed. The requester now has your
                contact details and will reach out soon.
              </p>

              <button
                onClick={() => setJustConfirmed(false)}
                className="relative bg-red-700 text-white font-semibold px-8 py-3 rounded-full
                           shadow-md hover:bg-red-800 transition-colors cursor-pointer"
              >
                Done
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default DonationRequestDetails;