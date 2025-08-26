import React, { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import AOS from "aos";
import "aos/dist/aos.css";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: true });
  }, []);

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
    <section className="bg-gray-50 py-10 px-4 text-center">
      {/* Heading */}
      <h2
        className="text-3xl md:text-5xl font-bold text-black mb-4"
        data-aos="fade-up"
      >
        Contact Us
      </h2>

      {/* Subtext */}
      <p
        className="text-center max-w-3xl mx-auto mb-12 text-lg text-gray-800"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        Have any questions or want to contribute to saving lives? Reach out to us
        through the form below. We are always happy to hear from donors, volunteers,
        and anyone who wants to make a difference.
      </p>

      <div className="flex flex-col gap-3 md:flex-row items-center justify-center">
        {/* Image */}
        <div data-aos="fade-right" data-aos-delay="200">
          <img
            className="rounded-2xl max-w-sm mx-auto"
            src="https://i.ibb.co.com/tpZgkNb4/agreement-2548138-640.jpg"
            alt="Contact Illustration"
          />
        </div>

        {/* Form */}
        <div
          className="max-w-3xl mx-auto bg-gray-400 shadow-md p-6 rounded-xl"
          data-aos="fade-left"
          data-aos-delay="300"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              name="name"
              placeholder="Your full name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-white border border-gray-300 text-gray-800 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Your email address"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-white border border-gray-300 text-gray-800 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <textarea
              name="message"
              placeholder="Write your message here"
              rows="5"
              required
              value={formData.message}
              onChange={handleChange}
              className="w-full bg-white border border-gray-300 text-gray-800 rounded-md px-4 py-3 focus:outline-none focus:ring-2 focus:ring-red-500"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-red-600 text-white font-semibold rounded-md py-3 hover:bg-red-700 transition"
            >
              Send Message
            </button>
          </form>

          {submitted && (
            <p className="mt-6 text-center text-green-600 font-semibold" data-aos="fade-up" data-aos-delay="400">
              Thank you for reaching out! We will get back to you soon.
            </p>
          )}
          {error && (
            <p className="mt-6 text-center text-red-600 font-semibold" data-aos="fade-up" data-aos-delay="400">
              {error}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
