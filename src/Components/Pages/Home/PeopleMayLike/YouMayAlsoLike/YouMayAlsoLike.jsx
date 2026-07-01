import React, { useEffect } from "react";
import { Link } from "react-router";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaTint, FaFingerprint, FaHandsHelping, FaArrowRight } from "react-icons/fa";

const YouMayAlsoLike = () => {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Montenegrin+Gothic+One&display=swap";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const cards = [
    {
      icon: <FaTint />,
      tag: "Plasma",
      title: "Why donate plasma?",
      desc: "Learn why plasma donation is so important and how it saves lives.",
      to: "/why-donate-plasma",
      cta: "Read the story",
      dark: false,
    },
    {
      icon: <FaFingerprint />,
      tag: "Rare Types",
      title: "Are you a rare type?",
      desc: "Find out how rare blood types are critical for saving lives — you might be one of them.",
      to: "/rare-type",
      cta: "Check your type",
      dark: true,
    },
    {
      icon: <FaHandsHelping />,
      tag: "Get Involved",
      title: "Can't donate blood?",
      desc: "There's more than one way to help. Explore other ways you can contribute.",
      to: "/other-ways-to-give",
      cta: "See other ways",
      dark: false,
    },
  ];

  return (
    <section className="relative bg-white px-4 md:px-12 py-24 overflow-hidden">

      <div className="relative max-w-7xl mx-auto">
        {/* Heading row — editorial, left aligned with a rule */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16 pb-8 border-b-2 border-gray-900" data-aos="fade-up">
          <div>
            <span className="text-red-700 font-bold tracking-[0.3em] uppercase text-xs mb-3 block">
              Keep Exploring
            </span>
            <h2
              className="text-3xl md:text-5xl uppercase leading-[0.9] text-gray-900"
              style={{ fontFamily: "'Montenegrin Gothic One', serif" }}
            >
              You May Also <span className="text-red-700">Like</span>
            </h2>
          </div>
          <p className="text-gray-500 text-base md:text-lg max-w-xs md:text-right">
            A few more reads worth your time — whether you're donating today or not.
          </p>
        </div>

        {/* Cards — asymmetric, middle one highlighted dark for contrast */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cards.map(({ icon, tag, title, desc, to, cta, dark }, i) => (
            <div
              key={to}
              className={`group relative rounded-3xl overflow-hidden flex flex-col
                         transition-all duration-500 hover:-translate-y-2
                         ${dark
                           ? "bg-gradient-to-br from-red-700 via-red-800 to-red-950 shadow-2xl md:scale-105 md:-translate-y-3"
                           : "bg-gradient-to-br from-white to-red-50 border border-gray-200 shadow-md hover:shadow-2xl"}`}
              data-aos="fade-up"
              data-aos-delay={i * 120}
            >
              {/* decorative diagonal stripes strip on dark card only */}
              {dark && (
                <div
                  className="absolute inset-0 opacity-[0.08] pointer-events-none"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 1px, transparent 14px)",
                  }}
                />
              )}
              {!dark && (
                <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-red-100/60 pointer-events-none" />
              )}

              <div className="relative p-8 flex flex-col h-full">
                <div className="flex items-center justify-between mb-8">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center text-xl shadow-lg
                               transition-transform duration-300 group-hover:scale-110
                               ${dark ? "bg-white text-red-700" : "bg-red-50 text-red-700 border border-red-100"}`}
                  >
                    {icon}
                  </div>
                  <span
                    className={`text-[11px] font-bold tracking-[0.25em] uppercase px-3 py-1.5 rounded-full
                               ${dark ? "bg-white/15 text-white" : "bg-red-50 text-red-700"}`}
                  >
                    {tag}
                  </span>
                </div>

                <h3 className={`text-2xl font-bold mb-3 leading-tight ${dark ? "text-white" : "text-gray-900"}`}>
                  {title}
                </h3>
                <p className={`leading-relaxed mb-10 flex-1 ${dark ? "text-red-100" : "text-gray-600"}`}>
                  {desc}
                </p>

                <Link
                  to={to}
                  className={`group/link relative inline-flex items-center gap-2 font-semibold w-fit
                             pb-1 transition-all duration-300
                             ${dark ? "text-white" : "text-red-700"}`}
                >
                  {cta}
                  <FaArrowRight className="text-xs transition-transform duration-300 group-hover/link:translate-x-1.5" />
                  <span
                    className={`absolute left-0 -bottom-0.5 h-[2.5px] w-full rounded-full
                               ${dark ? "bg-white/25" : "bg-red-100"}`}
                  />
                  <span
                    className={`absolute left-0 -bottom-0.5 h-[2.5px] w-full origin-left scale-x-0
                               group-hover/link:scale-x-100 transition-transform duration-300 rounded-full
                               ${dark ? "bg-white" : "bg-gradient-to-r from-red-600 to-red-800"}`}
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default YouMayAlsoLike;