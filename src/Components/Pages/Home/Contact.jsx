import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

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
      });
  };

  return (
    <section id="contact" className="py-20 px-4 md:px-10 bg-white text-gray-900 ">
      <h2 className="text-4xl md:text-4xl font-bold  mb-3 text-center">Contact Us</h2>
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: "6rem" }}
        transition={{ duration: 1 }}
        className="h-1 bg-red-500 mx-auto mb-6 rounded-full"
      />

      <p className="text-center max-w-3xl mx-auto mb-12 text-lg text-gray-700 ">
        Have any questions or want to contribute to saving lives? Reach out to us through the form below. We are always happy to hear from donors, volunteers, and anyone who wants to make a difference.
      </p>

      <motion.div
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto bg-white dark:bg-gray-900 shadow-md p-6 rounded-xl"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            name="name"
            placeholder="Your full name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Your email address"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
          <textarea
            name="message"
            placeholder="Write your message here"
            rows="5"
            required
            value={formData.message}
            onChange={handleChange}
            className="w-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-100 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
          ></textarea>
          <button
            type="submit"
            className="w-full bg-red-600 text-white font-semibold rounded-md py-3 hover:bg-red-700 transition"
          >
            Send Message
          </button>
        </form>

        {submitted && (
          <p className="mt-6 text-center text-green-600 font-semibold">
            Thank you for reaching out! We will get back to you soon.
          </p>
        )}
        {error && (
          <p className="mt-6 text-center text-red-600 font-semibold">{error}</p>
        )}
      </motion.div>

      <div className="mt-12 text-center text-gray-700 ">
        <p className="text-lg font-medium">
          📞 Contact Number: <span className="text-red-600 font-semibold">+880 1234-57890</span>
        </p>
        <p className="mt-2 text-lg font-medium">
          📍 Address: <span className="text-gray-800 ">123 Blood Bank Road, Dhaka, Bangladesh</span>
        </p>
      </div>
    </section>
  );
};

export default Contact;

