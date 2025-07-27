import React from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaLock, FaBalanceScale, FaInfoCircle } from "react-icons/fa";

const FooterLinks = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 space-y-20
                    bg-white dark:bg-black
                    text-gray-800 dark:text-gray-200">
       {/* About Section */}
      <section id="about">
        <h2 className="text-3xl font-bold flex items-center gap-2 mb-4
                       text-gray-900 dark:text-white">
          <FaInfoCircle className="text-blue-600 dark:text-blue-400" />
          About Us
        </h2>
        <p className="text-lg leading-relaxed">
          We are a dedicated blood donation platform built to connect donors with those in urgent need. Our mission is to make the process simple, secure, and impactful. By using modern technologies and a committed team, we aim to save lives through efficient blood donation services.
        </p>
      </section>

      {/* Privacy Policy Section */}
      <section id="privacy">
        <h2 className="text-3xl font-bold flex items-center gap-2 mb-4
                       text-gray-900 dark:text-white">
          <FaLock className="text-green-600 dark:text-green-400" />
          Privacy Policy
        </h2>
        <p className="text-lg leading-relaxed">
          Your privacy is important to us. We do not share or sell your data. Information you provide, such as location, blood type, or contact details, is encrypted and stored securely. You may delete your account or request data removal at any time.
        </p>
      </section>

      {/* Licensing Section */}
      <section id="licensing">
        <h2 className="text-3xl font-bold flex items-center gap-2 mb-4
                       text-gray-900 dark:text-white">
          <FaBalanceScale className="text-purple-600 dark:text-purple-400" />
          Licensing
        </h2>
        <p className="text-lg leading-relaxed">
          This website follows open-source and creative commons licensing. Anyone can contribute to or use parts of our platform (like UI components or features) for non-commercial use. Contact us if you're interested in collaboration or reuse for a commercial project.
        </p>
      </section>

      {/* Contact Section */}
      <section id="contact">
        <h2 className="text-3xl font-bold flex items-center gap-2 mb-4
                       text-gray-900 dark:text-white">
          <FaPhoneAlt className="text-orange-600 dark:text-orange-400" />
          Contact Us
        </h2>
        <p className="text-lg mb-4 leading-relaxed">
          Have questions, feedback, or need help? We're here for you.
        </p>
        <ul className="space-y-3 text-lg">
          <li className="flex items-center gap-3">
            <FaEnvelope className="text-orange-600 dark:text-orange-400" />
            <a href="mailto:support@blooddonate.com" className="hover:underline">
              support@blooddonate.com
            </a>
          </li>
          <li className="flex items-center gap-3">
            <FaPhoneAlt className="text-orange-600 dark:text-orange-400" />
            +880 1234 567 890
          </li>
          <li className="flex items-center gap-3">
            <FaMapMarkerAlt className="text-orange-600 dark:text-orange-400" />
            Dhaka, Bangladesh
          </li>
        </ul>
      </section>
    </div>
  );
};

export default FooterLinks;
