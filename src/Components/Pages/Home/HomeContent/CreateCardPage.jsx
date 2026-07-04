import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import domtoimage from "dom-to-image-more";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaTint, FaDownload, FaIdCard, FaCamera } from "react-icons/fa";

const CreateCardPage = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    bloodGroup: "",
    district: "",
    upazila: "",
    photo: "",
  });
  const [downloading, setDownloading] = useState(false);

  const cardRef = useRef();

  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/css2?family=Montenegrin+Gothic+One&display=swap";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("https://blood-donation-vert.vercel.app/users");
        const currentUser = res.data.find((u) => u.email === user.email);
        if (currentUser) {
          setFormData({
            name: currentUser.name || "",
            bloodGroup: currentUser.bloodGroup || "",
            district: "",
            upazila: "",
            photo: "",
          });
        }
      } catch (err) {
        console.error("Failed to fetch user data", err);
        toast.error("Failed to fetch user data");
      }
    };

    if (user?.email) fetchUser();
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData((prev) => ({ ...prev, photo: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;
    setDownloading(true);

    try {
      // Make sure the custom font + any images are fully loaded before
      // rasterizing, otherwise dom-to-image can capture a half-rendered frame.
      if (document.fonts && document.fonts.ready) {
        await document.fonts.ready;
      }

      const images = cardRef.current.querySelectorAll("img");
      await Promise.all(
        Array.from(images).map((img) =>
          img.complete
            ? Promise.resolve()
            : new Promise((resolve) => {
                img.onload = resolve;
                img.onerror = resolve;
              })
        )
      );

      const dataUrl = await domtoimage.toPng(cardRef.current, {
        bgcolor: "#ffffff",
        cacheBust: true,
        style: {
          // strip any stray outline/border dom-to-image might introduce
          // while cloning the node for rasterization
          outline: "none",
        },
      });

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "blood-buddy-card.png";
      link.click();
      toast.success("Card downloaded successfully!");
    } catch (err) {
      console.error("Download failed", err);
      toast.error("Failed to download card.");
    } finally {
      setDownloading(false);
    }
  };

  const inputClass =
    "w-full px-4 py-2.5 rounded-lg border border-red-100 bg-white text-gray-800 " +
    "focus:outline-none focus:ring-1 focus:ring-red-300 focus:border-red-400 transition";

  const disabledInputClass =
    "w-full px-4 py-2.5 rounded-lg border border-red-100 bg-red-50 text-gray-500 cursor-not-allowed";

  const labelClass = "block text-sm font-semibold text-gray-700 mb-1.5";

  return (
    <section className="relative bg-gradient-to-b from-white via-red-50 to-white px-4 md:px-12 py-16 overflow-hidden min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="absolute -top-10 -right-10 w-72 h-72 bg-red-300/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-red-200/30 rounded-full blur-3xl pointer-events-none" />

      {/* Heading */}
      <div className="relative text-center max-w-xl mx-auto mb-12">
        <span className="inline-flex items-center gap-2 bg-red-50 text-red-700 text-xs font-semibold
                          tracking-widest uppercase px-4 py-1.5 rounded-full mb-5 border border-red-200">
          <FaIdCard className="text-red-500" /> Build Your Card
        </span>
        <h2
          className="text-3xl md:text-5xl text-gray-900 uppercase leading-[0.95]"
          style={{ fontFamily: "'Montenegrin Gothic One', serif" }}
        >
          Your Blood <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
            Buddy Card
          </span>
        </h2>
      </div>

      <div className="relative max-w-5xl mx-auto flex flex-col md:flex-row items-start justify-center gap-10">

        {/* Editable form */}
        <form className="w-full md:max-w-md bg-white rounded-2xl shadow-lg border border-red-100 p-6 md:p-8 space-y-5">
          <div>
            <label className={labelClass}>Name</label>
            <input type="text" value={formData.name} disabled className={disabledInputClass} />
          </div>

          <div>
            <label className={labelClass}>Blood Group</label>
            <input type="text" value={formData.bloodGroup} disabled className={disabledInputClass} />
          </div>

          <div>
            <label className={labelClass}>District</label>
            <input
              type="text"
              name="district"
              placeholder="e.g. Naogaon"
              value={formData.district}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Upazila</label>
            <input
              type="text"
              name="upazila"
              placeholder="e.g. Naogaon Sadar"
              value={formData.upazila}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Photo</label>
            <label className="flex items-center gap-3 px-4 py-2.5 rounded-lg border-2 border-dashed
                               border-red-200 bg-red-50/50 text-red-700 text-sm font-medium
                               hover:bg-red-100 transition cursor-pointer">
              <FaCamera />
              {formData.photo ? "Change photo" : "Upload a photo"}
              <input type="file" accept="image/*" onChange={handlePhotoChange} className="hidden" />
            </label>
          </div>
        </form>

        {/* Card Preview + Download */}
        <div className="w-full md:w-auto flex flex-col items-center">
          <div className="mb-5">
            <span
              className="inline-flex items-center gap-3 px-5 py-2.5
              rounded-full bg-white shadow-lg border border-red-200"
            >
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75 animate-ping"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-red-600"></span>
              </span>

              <span className="text-[11px] font-bold uppercase tracking-[0.35em] text-red-700">
                Live Preview
              </span>
            </span>
          </div>

          {/*
            IMPORTANT: no `flex` inside cardRef — dom-to-image-more renders
            flex children with a stray visible border in the exported PNG.
            Using table/table-cell display achieves the identical
            "space-between" look without that artifact.
          */}
          {/* Card Preview + Download */}
<div
  ref={cardRef}
  className="w-72 rounded-2xl overflow-hidden shadow-2xl"
  style={{ border: "none" }}
>
  {/* Card header strip */}
  <div
    className="bg-gradient-to-r from-red-600 to-red-800 px-5 py-4"
    style={{ display: "table", width: "100%", tableLayout: "fixed", border: "none" }}
  >
    <span
      className="text-white font-bold tracking-wide text-sm"
      style={{ display: "table-cell", verticalAlign: "middle", textAlign: "left", border: "none" }}
    >
      RedHope
    </span>
    <span style={{ display: "table-cell", verticalAlign: "middle", textAlign: "right", border: "none" }}>
      <FaTint className="text-red-200 text-lg inline-block" style={{ border: "none" }} />
    </span>
  </div>

  {/* Card body */}
  <div
    className="bg-white p-6 text-center"
    style={{ borderLeft: "1px solid #fecaca", borderRight: "1px solid #fecaca", borderBottom: "1px solid #fecaca", borderTop: "none" }}
  >
    {formData.photo ? (
      <img
        src={formData.photo}
        alt="User"
        crossOrigin="anonymous"
        className="mx-auto w-24 h-24 rounded-full object-cover shadow-md mb-4"
        style={{ border: "4px solid #fee2e2" }}
      />
    ) : (
      <div
        className="mx-auto w-24 h-24 rounded-full bg-red-50 flex items-center justify-center text-red-300 text-3xl mb-4"
        style={{ border: "4px solid #fee2e2" }}
      >
        <FaCamera style={{ border: "none" }} />
      </div>
    )}

    <h3 className="font-bold text-xl text-gray-900 mb-1" style={{ border: "none" }}>
      {formData.name || "Your Name"}
    </h3>

    <span
      className="inline-block bg-red-700 text-white text-sm font-bold px-4 py-1 rounded-full mb-4"
      style={{ border: "none" }}
    >
      {formData.bloodGroup || "--"}
    </span>

    <div
      className="text-left text-sm text-gray-600 pt-4"
      style={{ borderTop: "1px solid #fee2e2" }}
    >
      <div style={{ display: "table", width: "100%", tableLayout: "fixed", marginBottom: "6px", border: "none" }}>
        <span style={{ display: "table-cell", textAlign: "left", border: "none" }} className="text-gray-400">
          District
        </span>
        <span style={{ display: "table-cell", textAlign: "right", border: "none" }} className="font-semibold text-gray-800">
          {formData.district || "—"}
        </span>
      </div>
      <div style={{ display: "table", width: "100%", tableLayout: "fixed", border: "none" }}>
        <span style={{ display: "table-cell", textAlign: "left", border: "none" }} className="text-gray-400">
          Upazila
        </span>
        <span style={{ display: "table-cell", textAlign: "right", border: "none" }} className="font-semibold text-gray-800">
          {formData.upazila || "—"}
        </span>
      </div>
    </div>
  </div>
</div>

          <button
            onClick={handleDownload}
            disabled={downloading}
            className="mt-6 w-72 inline-flex items-center justify-center gap-2 bg-red-700 text-white
                       font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-red-800
                       disabled:opacity-60 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            <FaDownload className="text-sm" /> {downloading ? "Preparing..." : "Download Card"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default CreateCardPage;