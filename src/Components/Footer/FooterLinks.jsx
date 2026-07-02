import React, { useEffect } from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaLock,
  FaBalanceScale,
  FaInfoCircle,
  FaClock,
  FaShieldAlt,
} from "react-icons/fa";

const FooterLinks = () => {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Montenegrin+Gothic+One&display=swap";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const sections = [
    {
      id: "about",
      icon: <FaInfoCircle />,
      title: "About Us",
      content:
        "We're a dedicated blood donation platform built to connect donors with those in urgent need. Our mission is to make the process simple, secure, and impactful — using modern technology and a committed team to help save lives through efficient blood donation services.",
    },
    {
      id: "privacy",
      icon: <FaLock />,
      title: "Privacy Policy",
      content:
        "Your privacy matters. We never share or sell your data. Information you provide — location, blood type, or contact details — is encrypted and stored securely. You can delete your account or request full data removal at any time.",
    },
    {
      id: "licensing",
      icon: <FaBalanceScale />,
      title: "Licensing",
      content:
        "This platform follows open-source and Creative Commons licensing. Anyone can contribute to or reuse parts of our platform, like UI components or features, for non-commercial purposes. Reach out if you're interested in collaboration or commercial reuse.",
    },
    {
      id: "safety",
      icon: <FaShieldAlt />,
      title: "Donor Safety",
      content:
        "Every donation guideline on this platform follows WHO-recommended screening standards. We list eligibility requirements clearly and never encourage donation that could put a donor's health at risk.",
    },
  ];

  return (
    <section className="relative bg-gradient-to-b from-white via-red-50 to-white px-4 md:px-12 py-20 overflow-hidden">

      {/* decorative background glow */}
      <div className="absolute -top-10 -right-10 w-72 h-72 bg-red-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">

        {/* Heading */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-flex items-center gap-2 bg-red-50 text-red-700 text-xs font-semibold
                            tracking-widest uppercase px-4 py-1.5 rounded-full mb-5 border border-red-200">
            <FaInfoCircle className="text-red-500" /> Good to Know
          </span>
          <h2
            className="text-3xl md:text-5xl text-gray-900 uppercase leading-[0.95]"
            style={{ fontFamily: "'Montenegrin Gothic One', serif" }}
          >
            About &amp;{" "}
            <span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
              Policies
            </span>
          </h2>
        </div>

        {/* Info cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-14">
          {sections.map(({ id, icon, title, content }) => (
            <div
              key={id}
              id={id}
              className="group relative bg-gradient-to-br from-white to-red-50 rounded-2xl
                         border border-red-100 shadow-sm hover:shadow-lg p-7
                         transition-all duration-300 overflow-hidden"
            >
              <div className="absolute -right-8 -bottom-8 w-28 h-28 bg-red-200/20 rounded-full blur-2xl pointer-events-none" />

              <div className="relative flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-500 to-red-700
                                flex items-center justify-center text-white text-lg shadow-md
                                group-hover:scale-110 transition-transform duration-300">
                  {icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{title}</h3>
              </div>

              <p className="relative text-gray-700 leading-relaxed">{content}</p>
            </div>
          ))}
        </div>

        {/* Contact section */}
        <div
          id="contact"
          className="relative bg-gradient-to-br from-red-700 to-red-800 rounded-3xl p-8 md:p-10
                     shadow-xl overflow-hidden"
        >
          <div className="absolute -top-10 -right-10 w-56 h-56 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-8">
            <div className="max-w-md">
              <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                <FaPhoneAlt className="text-red-200" /> Contact Us
              </h3>
              <p className="text-red-100 leading-relaxed">
                Have questions, feedback, or need help? We're here for you,
                every day of the week.
              </p>
            </div>

            <ul className="space-y-4 text-white">
              <li className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                  <FaEnvelope className="text-sm" />
                </span>
                <a href="mailto:support@blooddonate.com" className="hover:underline">
                  mstsharmin1781@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                  <FaPhoneAlt className="text-sm" />
                </span>
                +880 1732341938
              </li>
              <li className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                  <FaMapMarkerAlt className="text-sm" />
                </span>
                Dhaka, Bangladesh
              </li>
              <li className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center shrink-0">
                  <FaClock className="text-sm" />
                </span>
                Support hours: 9 AM – 9 PM, everyday
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterLinks;