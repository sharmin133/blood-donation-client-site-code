import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ViewDonarRequest = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    axios.get(`https://blood-donation-vert.vercel.app/donation-requests/${id}`)
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        console.error(err);
        toast.error('Failed to load donation request details.');
      });
  }, [id]);

  if (!data) {
    return <p className="text-center mt-10 text-gray-600">Loading...</p>;
  }

  return (
    <div className="max-w-xl mx-auto p-6 my-10 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <ToastContainer position="top-center" autoClose={3000} />

      <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 text-center mb-6">
        Donation Request Details
      </h2>

      <div className="space-y-4">
        <div><strong>Requester Name:</strong> {data.requesterName}</div>
        <div><strong>Requester Email:</strong> {data.requesterEmail}</div>
        <div><strong>Recipient Name:</strong> {data.recipientName}</div>
        <div><strong>District:</strong> {data.recipientDistrict}</div>
        <div><strong>Upazila:</strong> {data.recipientUpazila}</div>
        <div><strong>Hospital Name:</strong> {data.hospitalName}</div>
        <div><strong>Full Address:</strong> {data.fullAddress}</div>
        <div><strong>Blood Group:</strong> {data.bloodGroup}</div>
        <div><strong>Donation Date:</strong> {data.donationDate}</div>
        <div><strong>Donation Time:</strong> {data.donationTime}</div>
        <div><strong>Status:</strong> <span className="capitalize">{data.status}</span></div>
        <div><strong>Request Message:</strong><br /> {data.requestMessage}</div>
        <div><strong>Created At:</strong> {new Date(data.createdAt).toLocaleString()}</div>
      </div>
    </div>
  );
};




export default ViewDonarRequest;