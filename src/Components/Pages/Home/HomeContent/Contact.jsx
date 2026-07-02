import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaUser,
  FaPen,
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationCircle,
} from "react-icons/fa";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: true });

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Montenegrin+Gothic+One&display=swap";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSubmitted(false);
    setSending(true);

    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    emailjs.send(serviceID, templateID, formData, publicKey)
      .then(() => {
        setSubmitted(true);
        setFormData({ name: "", email: "", message: "" });
      })
      .catch((err) => {
        setError("Oops! Something went wrong. Please try again.");
        console.error(err);
      })
      .finally(() => setSending(false));
  };

  const contactInfo = [
    { icon: <FaEnvelope />, label: "Email Us", value: "mstsharmin1781@gmail.com" },
    { icon: <FaPhoneAlt />, label: "Call Us", value: "+880 1732341938" },
    { icon: <FaMapMarkerAlt />, label: "Visit Us", value: "Dhaka, Bangladesh" },
  ];

  return (
    <section className="relative bg-gradient-to-br from-red-50 via-white to-red-100 px-4 md:px-12 py-24 overflow-hidden">

      {/* radial depth + geometric accents, matches rest of site */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 90% 10%, rgba(220,38,38,0.08), transparent 42%), radial-gradient(circle at 5% 90%, rgba(220,38,38,0.09), transparent 45%)",
        }}
      />
    
      {/* dotted texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#dc2626 1px, transparent 1px)",
          backgroundSize: "26px 26px",
          maskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 30%, black, transparent)",
          opacity: 0.07,
        }}
      />

      {/* faint oversized watermark envelope */}
      <FaEnvelope className="hidden lg:block absolute -bottom-10 -right-10 text-red-100 text-[16rem] -rotate-12 pointer-events-none" />

      {/* animated gradient circles, varying sizes, scattered across the whole section */}
      {[
        { top: "8%", left: "5%", size: 16, delay: 0, dur: 5 },
        { top: "14%", left: "18%", size: 8, delay: 0.4, dur: 4.5 },
        { top: "6%", left: "32%", size: 22, delay: 0.8, dur: 6.5 },
        { top: "20%", left: "46%", size: 10, delay: 0.2, dur: 5.5 },
        { top: "10%", left: "62%", size: 30, delay: 1.1, dur: 7 },
        { top: "18%", left: "78%", size: 14, delay: 0.6, dur: 4.8 },
        { top: "8%", left: "90%", size: 20, delay: 1.4, dur: 6 },
        { top: "32%", left: "10%", size: 12, delay: 0.9, dur: 5.2 },
        { top: "38%", left: "26%", size: 26, delay: 0.3, dur: 8 },
        { top: "30%", left: "40%", size: 8, delay: 1.6, dur: 4.6 },
        { top: "42%", left: "56%", size: 18, delay: 0.7, dur: 6.2 },
        { top: "34%", left: "72%", size: 10, delay: 1.2, dur: 5 },
        { top: "40%", left: "88%", size: 24, delay: 0.5, dur: 7.4 },
        { top: "55%", left: "6%", size: 20, delay: 1, dur: 6.8 },
        { top: "60%", left: "20%", size: 10, delay: 0.4, dur: 4.4 },
        { top: "52%", left: "34%", size: 14, delay: 1.3, dur: 5.6 },
        { top: "58%", left: "50%", size: 8, delay: 0.6, dur: 4.9 },
        { top: "50%", left: "64%", size: 28, delay: 0.9, dur: 7.6 },
        { top: "62%", left: "80%", size: 12, delay: 0.2, dur: 5.4 },
        { top: "56%", left: "94%", size: 18, delay: 1.5, dur: 6.4 },
        { top: "76%", left: "12%", size: 22, delay: 0.7, dur: 7.2 },
        { top: "82%", left: "28%", size: 10, delay: 1.1, dur: 4.7 },
        { top: "72%", left: "44%", size: 16, delay: 0.3, dur: 5.8 },
        { top: "88%", left: "58%", size: 12, delay: 1.4, dur: 5.1 },
        { top: "78%", left: "70%", size: 26, delay: 0.8, dur: 7.8 },
        { top: "84%", left: "84%", size: 14, delay: 0.5, dur: 6.6 },
        { top: "92%", left: "96%", size: 20, delay: 1.2, dur: 6.1 },
        { top: "94%", left: "40%", size: 8, delay: 0.1, dur: 4.3 },
      ].map((c, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-to-br from-red-200 to-red-400 pointer-events-none"
          style={{
            top: c.top,
            left: c.left,
            width: c.size,
            height: c.size,
            opacity: 0.35,
            filter: c.size > 18 ? "blur(2px)" : "none",
          }}
          animate={{ y: [0, i % 2 === 0 ? -16 : 16, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: c.dur, repeat: Infinity, ease: "easeInOut", delay: c.delay }}
        />
      ))}

      <div className="relative max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14" data-aos="fade-up">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-red-300" />
            <FaEnvelope className="text-red-600 text-sm" />
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-red-300" />
          </div>
          <h2
            className="text-3xl md:text-5xl uppercase leading-[0.95] text-gray-900 mb-4"
            style={{ fontFamily: "'Montenegrin Gothic One', serif" }}
          >
            Get In <span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">Touch</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Have any questions or want to contribute to saving lives? Reach out — we're
            always happy to hear from donors, volunteers, and anyone who wants to make a difference.
          </p>
        </div>

        {/* Contact info strip */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-14 max-w-3xl mx-auto" data-aos="fade-up" data-aos-delay="100">
          {contactInfo.map(({ icon, label, value }) => (
            <div
              key={label}
              className="flex items-center gap-3 bg-white border border-red-100 rounded-2xl px-5 py-4 shadow-sm
                         hover:shadow-md hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="w-10 h-10 shrink-0 rounded-xl bg-gradient-to-br from-red-600 to-red-800
                              flex items-center justify-center text-white text-sm">
                {icon}
              </div>
              <div className="text-left min-w-0">
                <p className="text-[11px] uppercase tracking-wider text-gray-400 font-semibold">{label}</p>
                <p className="text-sm font-semibold text-gray-900 truncate">{value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row items-stretch gap-10">
          {/* Image with decorative frame */}
          <div className="flex-1 relative" data-aos="fade-right" data-aos-delay="150">
            <div className="absolute -inset-3 bg-gradient-to-br from-red-400 to-red-700 rounded-[2rem] rotate-2 opacity-15 pointer-events-none" />
            <img
              className="relative rounded-[2rem] w-full h-full max-h-[520px] object-cover shadow-2xl border-4 border-white"
              src="https://i.ibb.co.com/tpZgkNb4/agreement-2548138-640.jpg"
              alt="Contact Illustration"
            />
            <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl border border-red-100 px-5 py-4 hidden md:block">
              <p className="text-2xl font-black text-red-700 leading-none">24/7</p>
              <p className="text-xs text-gray-500 mt-1">Always here to help</p>
            </div>
          </div>

          {/* Form */}
          <div
            className="flex-1 bg-white rounded-[2rem] shadow-xl border border-red-100 p-8 md:p-10 relative overflow-hidden"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            <span className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 to-red-800" />

            <h3 className="text-xl font-bold text-gray-900 mb-6">Send us a message</h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-red-400" />
                <input
                  type="text"
                  name="name"
                  placeholder="Your full name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full bg-red-50/40 border border-gray-200 text-gray-800 rounded-xl pl-11 pr-4 py-3.5
                             focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 focus:bg-white
                             transition"
                />
              </div>

              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-red-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Your email address"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-red-50/40 border border-gray-200 text-gray-800 rounded-xl pl-11 pr-4 py-3.5
                             focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 focus:bg-white
                             transition"
                />
              </div>

              <div className="relative">
                <FaPen className="absolute left-4 top-4 text-red-400" />
                <textarea
                  name="message"
                  placeholder="Write your message here"
                  rows="5"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-red-50/40 border border-gray-200 text-gray-800 rounded-xl pl-11 pr-4 py-3.5
                             focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-red-400 focus:bg-white
                             transition resize-none"
                ></textarea>
              </div>

              <motion.button
                type="submit"
                disabled={sending}
                className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-red-800
                           text-white font-semibold rounded-xl py-3.5 shadow-lg hover:shadow-xl
                           disabled:opacity-70 transition-shadow cursor-pointer"
                whileHover={{ scale: sending ? 1 : 1.02 }}
                whileTap={{ scale: sending ? 1 : 0.98 }}
              >
                {sending ? "Sending..." : "Send Message"}
                {!sending && <FaPaperPlane className="text-sm" />}
              </motion.button>
            </form>

            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="mt-5 flex items-center gap-2 bg-green-50 border border-green-200 text-green-700
                             font-semibold rounded-xl px-4 py-3 text-sm"
                >
                  <FaCheckCircle /> Thank you for reaching out! We'll get back to you soon.
                </motion.div>
              )}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="mt-5 flex items-center gap-2 bg-red-50 border border-red-200 text-red-700
                             font-semibold rounded-xl px-4 py-3 text-sm"
                >
                  <FaExclamationCircle /> {error}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;