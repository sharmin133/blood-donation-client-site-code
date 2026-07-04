import { useEffect, useMemo } from "react";
import { Link } from "react-router";

const Banner = () => {
  useEffect(() => {
    const link1 = document.createElement("link");
    link1.rel = "preconnect";
    link1.href = "https://fonts.googleapis.com";

    const link2 = document.createElement("link");
    link2.rel = "stylesheet";
    link2.href =
      "https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700&family=Inter:wght@400;500;600;700&display=swap";

    document.head.appendChild(link1);
    document.head.appendChild(link2);

    return () => {
      document.head.removeChild(link1);
      document.head.removeChild(link2);
    };
  }, []);

  const drops = useMemo(
    () =>
      Array.from({ length: 14 }, () => ({
        left: Math.random() * 100,
        scale: 0.7 + Math.random() * 0.8,
        duration: 4.5 + Math.random() * 3.5,
        delay: Math.random() * 7,
      })),
    []
  );

  // Network graph nodes — hub (RedHope) + 4 satellite roles it connects
  const nodes = [
    { label: "Donor", x: 150, y: 42 },
    { label: "Hospital", x: 258, y: 150 },
    { label: "Blood Bank", x: 150, y: 258 },
    { label: "Emergency Team", x: 42, y: 150 },
  ];

  return (
    <section
      className="relative grid grid-cols-1 md:grid-cols-[1.08fr_0.92fr] items-center gap-6 px-[6vw] overflow-hidden font-['Inter']
                 bg-[radial-gradient(1100px_700px_at_78%_15%,rgba(230,57,80,.10),transparent_60%),linear-gradient(180deg,#FFE1E6_0%,#FFF8F5_78%)]"
    >
      {/* faint institutional grid texture */}
      <div
        className="pointer-events-none absolute inset-0
                    bg-[linear-gradient(90deg,rgba(18,22,28,.028)_1px,transparent_1px),linear-gradient(0deg,rgba(18,22,28,.028)_1px,transparent_1px)]
                    bg-[length:64px_64px]
                    [mask-image:radial-gradient(circle_at_75%_45%,black_0%,transparent_65%)]"
      />

      <div className="relative z-[3] max-w-[560px] py-14 md:py-16">
        <div className="inline-flex items-center gap-2 mb-5 text-[12px] font-bold tracking-[.12em] uppercase text-[#A3102A]">
          <span className="w-5 h-0.5 bg-[#A3102A] inline-block"></span>
          National Blood Donation Network
        </div>

        <h1 className="font-['Sora'] font-bold tracking-[-0.01em] text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.14] text-[#12161C]">
          Blood donation, managed the way a hospital needs it to be.
        </h1>

        <p className="mt-5 max-w-[470px] text-[16px] leading-[1.7] text-[#5B6472]">
          RedHope connects verified donors with hospitals and blood banks in real time —
          tracking eligibility, matching blood types, and coordinating emergency requests
          from a single platform.
        </p>

        <div className="flex flex-wrap items-center gap-3.5 mt-8">
          <Link to="/login">
            <button className="rounded-md bg-[#A3102A] px-[26px] py-3.5 text-[14.5px] font-semibold text-white transition-colors hover:bg-[#6E0B1E] cursor-pointer">
              Register as a Donor
            </button>
          </Link>
          <Link to="/search">
            <button className="rounded-md border-[1.5px] border-[#E4E6EA] px-[22px] py-3.5 text-[14.5px] font-semibold text-[#12161C] transition-colors hover:border-[#A3102A] hover:bg-[#FDF1F2] hover:text-[#A3102A] cursor-pointer">
              Submit a Donation Request
            </button>
          </Link>
        </div>

        <div className="flex flex-wrap gap-7 mt-11 pt-7 border-t border-[#E4E6EA]">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 20 20" fill="none" className="w-[18px] h-[18px] shrink-0">
              <path
                d="M10 2 4 4.5v5c0 4.4 2.9 7.7 6 8.5 3.1-.8 6-4.1 6-8.5v-5L10 2Z"
                stroke="#A3102A"
                strokeWidth="1.5"
              />
              <path
                d="M7.3 10.2 9 12l3.7-4"
                stroke="#A3102A"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-[13px] font-semibold text-[#5B6472]">Licensed Blood Bank Partner</span>
          </div>

          <div className="flex items-center gap-2">
            <svg viewBox="0 0 20 20" fill="none" className="w-[18px] h-[18px] shrink-0">
              <circle cx="10" cy="10" r="7.3" stroke="#A3102A" strokeWidth="1.5" />
              <path d="M10 6v4l2.6 2.6" stroke="#A3102A" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="text-[13px] font-semibold text-[#5B6472]">24/7 Emergency Response</span>
          </div>

          <div className="flex items-center gap-2">
            <svg viewBox="0 0 20 20" fill="none" className="w-[18px] h-[18px] shrink-0">
              <rect x="3" y="4" width="14" height="12.5" rx="1.5" stroke="#A3102A" strokeWidth="1.5" />
              <path d="M6.5 8h7M6.5 11h5" stroke="#A3102A" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className="text-[13px] font-semibold text-[#5B6472]">ISO 15189 Certified Screening</span>
          </div>
        </div>
      </div>

      {/* ================= VISUAL ================= */}
      <div className="relative z-[3] flex items-center justify-center py-10">
        {/* falling droplets layer */}
        <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
          {drops.map((drop, idx) => (
            <span
              key={idx}
              className="absolute rounded-full"
              style={{
                top: "-24px",
                left: `${drop.left}%`,
                width: "5px",
                height: "5px",
                background:
                  "radial-gradient(circle at 35% 30%, rgba(163,16,42,.55), rgba(163,16,42,.15) 70%)",
                opacity: 0,
                filter: "blur(.2px)",
                transform: `scale(${drop.scale.toFixed(2)})`,
                animationName: "rh-fall",
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
                animationDuration: `${drop.duration.toFixed(2)}s`,
                animationDelay: `${drop.delay.toFixed(2)}s`,
              }}
            />
          ))}
        </div>

        {/* verified seal */}
        <div className="absolute -top-4 right-4 z-[4] flex items-center gap-2 rounded-full bg-[#12161C] px-3.5 py-2 text-[11.5px] font-semibold text-white shadow-[0_10px_20px_-8px_rgba(18,22,28,0.4)]">
          <svg viewBox="0 0 20 20" fill="none" className="w-3.5 h-3.5 shrink-0">
            <path d="M10 2 4 4.5v5c0 4.4 2.9 7.7 6 8.5 3.1-.8 6-4.1 6-8.5v-5L10 2Z" fill="#fff" />
          </svg>
          Verified Network
        </div>

        {/* ============ Connected Care Network card ============ */}
        <div className="relative z-[2] w-[min(400px,92%)] rounded-[14px] border border-[#E4E6EA] bg-white px-7 pb-7 pt-7 shadow-[0_24px_48px_-20px_rgba(18,22,28,0.16)]">
          <div className="mb-1">
            <span className="text-[12.5px] font-bold uppercase tracking-[.06em] text-[#5B6472]">
              How RedHope Connects
            </span>
          </div>
          <h3 className="font-['Sora'] text-[19px] font-bold text-[#12161C] mb-4">
            One request. Every partner, instantly.
          </h3>

          {/* Node graph */}
          <div className="relative flex justify-center">
            <svg viewBox="0 0 300 300" className="w-full max-w-[240px] h-auto">
              <defs>
                <linearGradient id="hubFill" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#C2223F" />
                  <stop offset="100%" stopColor="#6E0B1E" />
                </linearGradient>
              </defs>

              {/* slow rotating dashed orbit ring */}
              <circle
                cx="150"
                cy="150"
                r="112"
                fill="none"
                stroke="#F1D9DC"
                strokeWidth="1.5"
                strokeDasharray="2 8"
                className="origin-center animate-[rh-spin_24s_linear_infinite]"
              />

              {/* connection lines, hub -> each node, with flowing pulse dash */}
              {nodes.map((n, i) => (
                <line
                  key={`line-${i}`}
                  x1="150"
                  y1="150"
                  x2={n.x}
                  y2={n.y}
                  stroke="#E9AFB9"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="5 7"
                  className="animate-[rh-flow_1.8s_linear_infinite]"
                />
              ))}

              {/* satellite nodes */}
              {nodes.map((n, i) => (
                <g key={`node-${i}`}>
                  <circle cx={n.x} cy={n.y} r="21" fill="#FFFFFF" stroke="#E4E6EA" strokeWidth="1.5" />
                  <circle cx={n.x} cy={n.y} r="6" fill="#A3102A" />
                </g>
              ))}

              {/* central hub */}
              <circle cx="150" cy="150" r="34" fill="url(#hubFill)" />
              <path
                d="M150 132c0 0-13 15.6-13 24.4 0 7.2 5.8 13 13 13s13-5.8 13-13c0-8.8-13-24.4-13-24.4Z"
                fill="#fff"
              />
            </svg>

            {/* node labels, positioned to match SVG coords as % of box */}
            <div className="absolute inset-0">
              <span className="absolute -translate-x-1/2 text-[10.5px] font-semibold text-[#5B6472]" style={{ left: "50%", top: "1%" }}>
                Donor
              </span>
              <span className="absolute -translate-x-1/2 text-[10.5px] font-semibold text-[#5B6472]" style={{ left: "94%", top: "48%" }}>
                Hospital
              </span>
              <span className="absolute -translate-x-1/2 text-[10.5px] font-semibold text-[#5B6472]" style={{ left: "50%", top: "89%" }}>
                Blood Bank
              </span>
              <span className="absolute -translate-x-1/2 text-[10.5px] font-semibold text-[#5B6472] whitespace-nowrap" style={{ left: "6%", top: "48%" }}>
                Emergency
              </span>
            </div>
          </div>

          <div className="h-px w-full bg-[#E4E6EA] my-5" />

          <div className="grid grid-cols-2 gap-3.5">
            <div className="rounded-lg bg-[#F4F5F7] p-3.5">
              <b className="block font-['Sora'] text-[22px] font-bold text-[#12161C]">8</b>
              <span className="text-[11.5px] text-[#5B6472]">Blood types supported</span>
            </div>
            <div className="rounded-lg bg-[#F4F5F7] p-3.5">
              <b className="block font-['Sora'] text-[22px] font-bold text-[#12161C]">24/7</b>
              <span className="text-[11.5px] text-[#5B6472]">Emergency coordination</span>
            </div>
          </div>
        </div>
      </div>

      {/* keyframes: kept as raw CSS since Tailwind utility classes can't define a keyframe itself */}
      <style>
        {`
          @keyframes rh-fall {
            0%   { transform: translateY(0);      opacity: 0; }
            12%  { opacity: .5; }
            88%  { opacity: .3; }
            100% { transform: translateY(520px);  opacity: 0; }
          }
          @keyframes rh-spin {
            to { transform: rotate(360deg); }
          }
          @keyframes rh-flow {
            to { stroke-dashoffset: -24; }
          }
        `}
      </style>
    </section>
  );
};

export default Banner;