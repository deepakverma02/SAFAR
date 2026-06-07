import React, { useState } from "react";
import { FaBus, FaRoute, FaUsers, FaDollarSign, FaComments } from "react-icons/fa";
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [selectedAction, setSelectedAction] = useState(null);

  const handleActionChange = (action) => {
    setSelectedAction(action);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-400 via-blue-400 to-green-300 flex flex-col">
      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-8">
        <p className="text-3xl font-extrabold text-white mb-12 text-center animate-fade-in-down animation-delay-500">
          Efficient Bus Operations Management
        </p>

        {/* Admin Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-7xl mb-16 animate-fade-in-up animation-delay-1000">
          <Link to="/admin/addbus" className="hover:scale-105 transition-transform duration-300">
            <button     
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-6 px-8 w-full h-full rounded-xl shadow-xl flex items-center justify-center space-x-3 transition-colors duration-300"
            >
              <FaBus className="text-4xl" />
              <span>Add New Bus</span>
            </button>
          </Link>

          <Link to="/admin/modifybus" className="hover:scale-105 transition-transform duration-300">
            <button
              onClick={() => handleActionChange("modifyBus")}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-6 px-8 w-full h-full rounded-xl shadow-xl flex items-center justify-center space-x-3 transition-colors duration-300"
            >
              <FaRoute className="text-4xl" />
              <span>Modify Bus</span>
            </button>
          </Link>

          <Link to="/admin/deletebus" className="hover:scale-105 transition-transform duration-300">
            <button
              onClick={() => handleActionChange("deleteBus")}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-6 px-8 w-full h-full rounded-xl shadow-xl flex items-center justify-center space-x-3 transition-colors duration-300"
            >
              <FaUsers className="text-4xl" />
              <span>Delete Bus</span>
            </button>
          </Link>
        </div>

        {/* Centered Last Two Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 w-full max-w-3xl mb-16">
          <Link to="/admin/viewrevenue" className="hover:scale-105 transition-transform duration-300">
            <button
              onClick={() => handleActionChange("viewRevenue")}
              className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-6 px-20 w-full h-full rounded-xl shadow-xl flex items-center justify-center space-x-3 transition-colors duration-300"
            >
              <FaDollarSign className="text-4xl" />
              <span>View Revenue</span>
            </button>
          </Link>

          <Link to="/admin/handlecomplaints" className="hover:scale-105 transition-transform duration-300">
            <button
              onClick={() => handleActionChange("handleComplaints")}
              className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-6 px-8 w-full h-full rounded-xl shadow-xl flex items-center justify-center space-x-3 transition-colors duration-300"
            >
              <FaComments className="text-4xl" />
              <span>Handle Complaints</span>
            </button>
          </Link>
        </div>

        {/* Admin Action Content */}
        <div className="bg-white bg-opacity-80 backdrop-blur-md p-12 rounded-2xl shadow-2xl w-full max-w-4xl text-center">
          <h3 className="text-3xl font-bold text-gray-700">
            Select an Action to Continue
          </h3>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
