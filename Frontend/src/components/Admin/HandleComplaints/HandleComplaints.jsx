import React, { useState } from 'react';
import axios from 'axios';

const HandleComplaintsPage = () => {
  const [formData, setFormData] = useState({
    busNumber: '',
  });

  const [complaintData, setComplaintData] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const token = localStorage.getItem('token');
  const api = axios.create({
    baseURL: 'https://safar-bus-booking-system.onrender.com',
    headers: {
      'x-access-token': token,
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/complain', {
        Bus_number: formData.busNumber,
      });

      const Bus_data = response.data;
      setComplaintData(Bus_data);
    } catch (error) {
      console.error('Error while submitting the complaint:', error);
    }
  };

  const handleResolve = async (index) => {
    const complaint = complaintData[index];

    try {
      const response = await api.post('/complainupdate', {
        _id: complaint._id,
      });

      if (response.status === 200) {
        setComplaintData((prevData) =>
          prevData.map((comp, i) =>
            i === index ? { ...comp, status: 'Solution Provided' } : comp
          )
        );
      } else {
        console.error('Failed to update complaint status');
      }
    } catch (error) {
      console.error('Error while updating the complaint status:', error);
    }
  };

  const handleDelete = async (index) => {
    const complaint = complaintData[index];

    try {
      const response = await api.post('/complaindelete', {
        _id: complaint._id,
      });

      if (response.status === 200) {
        setComplaintData((prevData) => prevData.filter((_, i) => i !== index));
      } else {
        console.error('Failed to delete complaint');
      }
    } catch (error) {
      console.error('Error while deleting the complaint:', error);
    }
  };

  return (
    <div className="p-6 mt-8 mb-8 max-w-4xl mx-auto bg-gradient-to-r from-red-400 to-purple-500 shadow-lg rounded-lg">
      <h2 className="text-3xl font-extrabold text-white mb-6 text-center">Handle Complaints</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col items-center justify-center">
          <label htmlFor="busNumber" className="block text-sm font-semibold text-white text-center">
            Bus Number
          </label>
          <input
            type="text"
            id="busNumber"
            name="busNumber"
            value={formData.busNumber}
            onChange={handleChange}
            className="mt-2 block w-full max-w-xs px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-gray-900"
            required
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
          >
            View Complaints
          </button>
        </div>
      </form>

      {complaintData && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-extrabold text-gray-800 mb-4">Complaints Report</h3>

          <div className="space-y-4">
            {complaintData.map((complaint, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
                <p className="text-lg text-gray-800">
                  <strong>Date:</strong> {complaint.createdAt}
                </p>
                <p className="text-lg text-gray-800">
                  <strong>User:</strong> {complaint.name}
                </p>
                <p className="text-lg text-gray-800">
                  <strong>Complaint:</strong> {complaint.message}
                </p>
                <p className="text-lg text-gray-800">
                  <strong>Status:</strong> {complaint.status}
                </p>
                <div className="flex justify-between mt-4">
                  {complaint.status === 'Pending..' && (
                    <button
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400"
                      onClick={() => handleResolve(index)}
                    >
                      Mark as Resolved
                    </button>
                  )}
                  {complaint.status === 'Solution Provided' && (
                    <button
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400"
                      onClick={() => handleDelete(index)}
                    >
                      Delete Complaint
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HandleComplaintsPage;
