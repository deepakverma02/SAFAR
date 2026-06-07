import React, { useState } from 'react';
import axios from 'axios';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, ArcElement, Title, Tooltip, Legend);

const ViewRevenueForm = () => {
  const [formData, setFormData] = useState({
    busNumber: '',
    startDate: '',
    endDate: ''
  });

  const [revenueData, setRevenueData] = useState(null);
  const [totalRevenue, setTotalRevenue] = useState(0);

  // Get today's date in YYYY-MM-DD format for the max limit on end date
  const today = new Date().toISOString().split('T')[0];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://safar-bus-booking-system.onrender.com/viewRevenu', {
        startdate: formData.startDate,
        enddate: formData.endDate,
        busNumber: formData.busNumber
      });

      if (response.data.length > 0) {
        const total = response.data.reduce((acc, curr) => acc + parseFloat(curr.totalPrice), 0);
        setTotalRevenue(total);
        setRevenueData(response.data);
      } else {
        alert("No Data Found!");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("Something went wrong!");
    }
  };

  // Prepare data for the doughnut chart
  const chartData = {
    labels: revenueData ? revenueData.map(item => item.Date) : [],
    datasets: [
      {
        label: 'Revenue Distribution',
        data: revenueData ? revenueData.map(item => parseFloat(item.totalPrice)) : [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.8)',  // Darker Pink
          'rgba(54, 162, 235, 0.8)',  // Darker Blue
          'rgba(255, 206, 86, 0.8)',  // Darker Yellow
          'rgba(75, 192, 192, 0.8)',  // Darker Teal
          'rgba(153, 102, 255, 0.8)', // Darker Purple
          'rgba(255, 159, 64, 0.8)',  // Darker Orange
          'rgba(0, 128, 0, 0.8)',     // Darker Green
          'rgba(139, 0, 0, 0.8)',     // Darker Red
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',    // Darker Pink
          'rgba(54, 162, 235, 1)',    // Darker Blue
          'rgba(255, 206, 86, 1)',    // Darker Yellow
          'rgba(75, 192, 192, 1)',    // Darker Teal
          'rgba(153, 102, 255, 1)',   // Darker Purple
          'rgba(255, 159, 64, 1)',    // Darker Orange
          'rgba(0, 128, 0, 1)',       // Darker Green
          'rgba(139, 0, 0, 1)',       // Darker Red
        ],
        borderWidth: 1,
        hoverOffset: 6
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: {
            size: 14
          }
        }
      },
      title: {
        display: true,
        text: 'Revenue Distribution by Date',
        font: {
          size: 18
        }
      },
      tooltip: {
        callbacks: {
          label: (context) => `₹${context.raw.toFixed(2)}`
        }
      }
    }
  };

  return (
    <div className="p-6 mt-8 mb-8 max-w-4xl mx-auto bg-gradient-to-r from-gray-800 via-gray-700 to-gray-600 shadow-lg rounded-lg">
      <h2 className="text-3xl font-extrabold text-white mb-6 text-center">View Revenue</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div>
            <label htmlFor="busNumber" className="block text-sm font-semibold text-white">Bus Number / Name</label>
            <input
              type="text"
              id="busNumber"
              name="busNumber"
              value={formData.busNumber}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-gray-900"
              required
            />
          </div>

          <div>
            <label htmlFor="startDate" className="block text-sm font-semibold text-white">Start Date</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-gray-900"
              required
            />
          </div>

          <div>
            <label htmlFor="endDate" className="block text-sm font-semibold text-white">End Date</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
              min={formData.startDate}  // Set min to start date
              max={today}               // Set max to today's date
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-gray-900"
              required
            />
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400"
          >
            View Revenue
          </button>
        </div>
      </form>

      {totalRevenue > 0 && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-2xl font-extrabold text-gray-800 mb-4">Total Revenue</h3>
          <p className="text-lg text-gray-700">
            <strong>Total Revenue:</strong> ₹{totalRevenue}
          </p>
        </div>
      )}

      {revenueData && (
        <div className="mt-8">
          <div className="max-w-xs mx-auto">
            <Doughnut data={chartData} options={chartOptions} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewRevenueForm;
