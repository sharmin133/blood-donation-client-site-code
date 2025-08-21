import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import domtoimage from "dom-to-image-more";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateCardPage = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    bloodGroup: "",
    district: "",
    upazila: "",
    photo: "",
  });

  const cardRef = useRef();

  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("https://blood-donation-vert.vercel.app/users");
        const currentUser = res.data.find(u => u.email === user.email);
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
      setFormData(prev => ({ ...prev, photo: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleDownload = () => {
    if (!cardRef.current) return;

    domtoimage.toPng(cardRef.current)
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "blood-buddy-card.png";
        link.click();
        toast.success("Card downloaded successfully!");
      })
      .catch((err) => {
        console.error("Download failed", err);
        toast.error("Failed to download card.");
      });
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <ToastContainer position="top-right" autoClose={3000} />
      <h2 className="text-2xl font-bold mb-4 text-center">Your Blood Buddy Card</h2>

      {/* Editable form */}
      <form className="shadow-md rounded-lg p-6 space-y-4 mb-6">
        <div>
          <label>Name</label>
          <input
            type="text"
            value={formData.name}
            disabled
            className="input input-bordered w-full bg-gray-200"
          />
        </div>

        <div>
          <label>Blood Group</label>
          <input
            type="text"
            value={formData.bloodGroup}
            disabled
            className="input input-bordered w-full bg-gray-200"
          />
        </div>

        <div>
          <label>District</label>
          <input
            type="text"
            name="district"
            value={formData.district}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label>Upazila</label>
          <input
            type="text"
            name="upazila"
            value={formData.upazila}
            onChange={handleChange}
            className="input input-bordered w-full"
          />
        </div>

        <div>
          <label>Photo</label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="input input-bordered w-full"
          />
        </div>
      </form>

      {/* Card Preview */}
      <div
        ref={cardRef}
        style={{
          width: "320px",
          margin: "0 auto",
          padding: "20px",
          borderRadius: "12px",
          backgroundColor: "#ffffff",
          color: "#000000",
          textAlign: "center",
          boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
        }}
      >
        {formData.photo && (
          <img
            src={formData.photo}
            alt="User"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              marginBottom: "12px",
            }}
          />
        )}
        <h3 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "6px" }}>
          {formData.name}
        </h3>
        <p>Blood Group: {formData.bloodGroup}</p>
        <p>District: {formData.district}</p>
        <p>Upazila: {formData.upazila}</p>
      </div>

      <button
        onClick={handleDownload}
        className="mt-4 btn btn-primary w-full"
      >
        Download Card
      </button>
    </div>
  );
};

export default CreateCardPage;
