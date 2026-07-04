import { Link } from "react-router";
import { useEffect } from "react";

const Footer = () => {
  useEffect(() => {
    const link1 = document.createElement("link");
    link1.rel = "preconnect";
    link1.href = "https://fonts.googleapis.com";

    const link2 = document.createElement("link");
    link2.rel = "stylesheet";
    link2.href =
      "https://fonts.googleapis.com/css2?family=Sora:wght@600;700&family=Inter:wght@400;500;600;700&display=swap";

    document.head.appendChild(link1);
    document.head.appendChild(link2);

    return () => {
      document.head.removeChild(link1);
      document.head.removeChild(link2);
    };
  }, []);

  return (
    <footer className="bg-red-700 px-[6vw] pt-14 text-white/70 font-['Inter']">
      <div className="grid grid-cols-2 gap-8 pb-10 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        {/* Brand */}
        <div>
          <Link to="/" className="flex items-center gap-2.5">
            <svg viewBox="0 0 32 32" className="h-7 w-7">
              <path
                d="M16 3C16 3 6 15.5 6 21.5C6 27 10.5 30.5 16 30.5C21.5 30.5 26 27 26 21.5C26 15.5 16 3 16 3Z"
                fill="#A3102A"
              />
              <circle cx="16" cy="21" r="3" fill="#FFFFFF" />
            </svg>
            <span className="font-['Sora'] text-[19px] font-bold text-white">RedHope</span>
          </Link>

          <p className="mt-4 max-w-[270px] text-[13.5px] leading-[1.7] text-white/55">
            A verified network of donors, hospitals, and blood banks. RedHope coordinates every
            request, match, and drive from a single, auditable platform.
          </p>

          <div className="mt-5 flex flex-wrap gap-2.5">
            <div className="flex items-center gap-1.5 rounded-md border border-white/15 px-2.5 py-1.5 text-[11px] font-semibold text-white/70">
              <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5">
                <path
                  d="M10 2 4 4.5v5c0 4.4 2.9 7.7 6 8.5 3.1-.8 6-4.1 6-8.5v-5L10 2Z"
                  stroke="#fff"
                  strokeWidth="1.4"
                />
              </svg>
              ISO 15189
            </div>
            <div className="flex items-center gap-1.5 rounded-md border border-white/15 px-2.5 py-1.5 text-[11px] font-semibold text-white/70">
              <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5">
                <circle cx="10" cy="10" r="7.3" stroke="#fff" strokeWidth="1.4" />
                <path d="M6.8 10.2 9 12.4l4.4-5" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />
              </svg>
              WHO Aligned
            </div>
            <div className="flex items-center gap-1.5 rounded-md border border-white/15 px-2.5 py-1.5 text-[11px] font-semibold text-white/70">
              <svg viewBox="0 0 20 20" fill="none" className="h-3.5 w-3.5">
                <rect x="3" y="4" width="14" height="12.5" rx="1.5" stroke="#fff" strokeWidth="1.4" />
              </svg>
              National Registry
            </div>
          </div>

          <div className="mt-[22px] flex gap-2.5">
            
              <a href="#"
              aria-label="Facebook"
              className="flex h-[34px] w-[34px] items-center justify-center rounded-md bg-white/[.06] transition-colors hover:bg-[#A3102A]"
            >
              <svg viewBox="0 0 24 24" className="h-[15px] w-[15px] fill-white">
                <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V8c0-.9.25-1.5 1.55-1.5H16.7V3.7C16.3 3.65 15.2 3.5 14 3.5c-2.5 0-4.2 1.5-4.2 4.3v2.1H7.1V13h2.7v8h3.7Z" />
              </svg>
            </a>
            
              <a href="#"
              aria-label="X"
              className="flex h-[34px] w-[34px] items-center justify-center rounded-md bg-white/[.06] transition-colors hover:bg-[#A3102A]"
            >
              <svg viewBox="0 0 24 24" className="h-[15px] w-[15px] fill-white">
                <path d="M4 3h4.2l4 5.6L16.8 3H20l-6.3 8.1L20.4 21h-4.2l-4.4-6.1L6.9 21H3.7l6.7-8.6L4 3Z" />
              </svg>
            </a>
            
              <a href="#"
              aria-label="LinkedIn"
              className="flex h-[34px] w-[34px] items-center justify-center rounded-md bg-white/[.06] transition-colors hover:bg-[#A3102A]"
            >
              <svg viewBox="0 0 24 24" className="h-[15px] w-[15px] fill-white">
                <path d="M4.98 3.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4ZM3.5 9h3v11.5h-3V9Zm6.2 0h2.9v1.6h.04c.4-.76 1.4-1.6 2.9-1.6 3.1 0 3.7 2 3.7 4.6v6.9h-3v-6.1c0-1.5 0-3.3-2-3.3-2 0-2.3 1.6-2.3 3.2v6.2h-3V9Z" />
              </svg>
            </a>
            
              <a href="#"
              aria-label="GitHub"
              className="flex h-[34px] w-[34px] items-center justify-center rounded-md bg-white/[.06] transition-colors hover:bg-[#A3102A]"
            >
              <svg viewBox="0 0 24 24" className="h-[15px] w-[15px] fill-white">
                <path d="M12 2.2a9.8 9.8 0 0 0-3.1 19.1c.5.1.7-.2.7-.5v-1.8c-2.7.6-3.3-1.3-3.3-1.3-.4-1.1-1-1.4-1-1.4-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.3 1.1 2.9.8.1-.7.4-1.1.6-1.4-2.2-.2-4.5-1.1-4.5-4.8 0-1.1.4-1.9 1-2.6-.1-.3-.4-1.3.1-2.6 0 0 .8-.3 2.7 1a9.3 9.3 0 0 1 4.9 0c1.9-1.3 2.7-1 2.7-1 .5 1.3.2 2.3.1 2.6.6.7 1 1.5 1 2.6 0 3.7-2.3 4.6-4.5 4.8.4.3.7.9.7 1.9v2.8c0 .3.2.6.7.5A9.8 9.8 0 0 0 12 2.2Z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Platform */}
        <div>
          <h4 className="mb-[18px] text-[12px] font-bold uppercase tracking-[.08em] text-white/40">
            Platform
          </h4>
          <ul className="flex flex-col gap-3">
            <li>
              <Link to="/" className="text-[14px] text-white/75 transition-colors hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/create-donation-request"
                className="text-[14px] text-white/75 transition-colors hover:text-white"
              >
                Donation Request
              </Link>
            </li>
            <li>
              <Link to="/blogs" className="text-[14px] text-white/75 transition-colors hover:text-white">
                Blog
              </Link>
            </li>
            <li>
              <Link to="/fund-page" className="text-[14px] text-white/75 transition-colors hover:text-white">
                Funding
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="mb-[18px] text-[12px] font-bold uppercase tracking-[.08em] text-white/40">
            Resources
          </h4>
          <ul className="flex flex-col gap-3">
            <li>
              <a href="#" className="text-[14px] text-white/75 transition-colors hover:text-white">
                Eligibility Guide
              </a>
            </li>
            <li>
              <Link to="/search" className="text-[14px] text-white/75 transition-colors hover:text-white">
                Find a Drive
              </Link>
            </li>
            <li>
              <a href="#" className="text-[14px] text-white/75 transition-colors hover:text-white">
                For Hospitals
              </a>
            </li>
            <li>
              <a href="#" className="text-[14px] text-white/75 transition-colors hover:text-white">
                FAQs
              </a>
            </li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="mb-[18px] text-[12px] font-bold uppercase tracking-[.08em] text-white/40">
            Legal
          </h4>
          <ul className="flex flex-col gap-3">
            <li>
              <Link to="/about-us" className="text-[14px] text-white/75 transition-colors hover:text-white">
                About
              </Link>
            </li>
            <li>
              <Link to="/about-us" className="text-[14px] text-white/75 transition-colors hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/about-us" className="text-[14px] text-white/75 transition-colors hover:text-white">
                Licensing
              </Link>
            </li>
            <li>
              <Link to="/about-us" className="text-[14px] text-white/75 transition-colors hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="h-px w-full bg-white/10" />

      <div className="flex flex-wrap items-center justify-between gap-2.5 py-5 text-[12.5px] text-white/45">
        <span>© 2026 RedHope™. All rights reserved.</span>
        <span>
          <a href="#" className="ml-[18px] transition-colors hover:text-white">
            Status
          </a>
          <a href="#" className="ml-[18px] transition-colors hover:text-white">
            Sitemap
          </a>
          <a href="#" className="ml-[18px] transition-colors hover:text-white">
            Accessibility
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;