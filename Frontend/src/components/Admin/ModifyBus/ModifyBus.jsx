import React, { useState } from 'react';
import axios from 'axios';

const EditBusForm = () => {
  const [busSearch, setBusSearch] = useState('');
  const [formData, setFormData] = useState(null);
  const [alert, setAlert] = useState({ message: '', type: '' });

  const handleSearchChange = (e) => {
    setBusSearch(e.target.value);
  };

  const token = localStorage.getItem('token');
  const api = axios.create({
    baseURL: 'https://safar-bus-booking-system.onrender.com',
    headers: {
      'x-access-token': token,
    },
  });

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    const foundBus = await api.post('/businfo', { 'Bus_number': busSearch });
    const busDetails = foundBus.data;
    setFormData(busDetails);
  };

  const handleFormChange = (e) => {
  const { name, value } = e.target;

  // Regular expression to match non-negative integers only (0 or greater, no decimals)
  const validSeatPricePattern = /^\d*$/;

  // Update Number_seat based on selected Bus_Class
  if (name === 'Bus_Class') {
    setFormData(prevData => {
      const newData = { ...prevData, [name]: value };
      // Set Number_seat based on Bus_Class selection
      newData.Number_seat = value === 'Sleeper' ? 48 : 32; // Sleeper has 48 seats, Sitting has 32 seats
      return newData;
    });
  } else {
    // Prevent negative values and decimals for Seat_price
    if (name === "Seat_price") {
      if (value === '' || validSeatPricePattern.test(value)) {
        setFormData(prevData => {
          const newData = { ...prevData, [name]: value };

          // Validate Source_time and Destination_time
          if (newData.Source_time === newData.Destination_time) {
            setAlert({ message: "Source time and Destination time cannot be the same", type: 'error', countdown: 5 });
          }

          return newData;
        });
      } else {
        setAlert({ message: "Price cannot be negative or a decimal", type: 'error' });
        setFormData(prevData => ({
          ...prevData,
          Seat_price: '' // Clear the field if an invalid value is entered
        }));
      }
    } else {
      // Update the state for all other fields
      setFormData(prevData => {
        const newData = { ...prevData, [name]: value }; // Update the state

        // Validate Source_time and Destination_time
        if (newData.Source_time === newData.Destination_time) {
          setAlert({ message: "Source time and Destination time cannot be the same", type: 'error', countdown: 5 });
        }

        return newData;
      });
    }
  }
};

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const ModifyBus = await api.post('/modifybus', { ...formData });
      console.log('Edited bus details:', ModifyBus.data);
      setAlert({ message: 'Bus details updated successfully', type: 'success' });
    } catch (error) {
      setAlert({ message: 'Error updating bus details', type: 'error' });
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?bus,city')" }}>
      <div className="bg-black bg-opacity-50 p-4 min-h-screen flex flex-col justify-center items-center">
        {alert.message && (
          <div
            className={`absolute top-4 right-4 p-4 text-sm text-white rounded-lg shadow-lg transition-opacity duration-300 ${alert.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
            role="alert"
          >
            {alert.message + " !"}
          </div>
        )}

    
    <div>
      <div className="bg-black bg-opacity-50 p-4 min-h-screen flex flex-col justify-center items-center">
        <div className="bg-white p-8 shadow-lg rounded-2xl max-w-lg w-full">
          <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">Search for Bus to Edit</h2>
          <form onSubmit={handleSearchSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Bus Number </label>
              <input
                type="text"
                value={busSearch}
                onChange={handleSearchChange}
                placeholder="Enter Bus Number"
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-2 px-4 rounded-lg shadow-md hover:from-purple-600 hover:to-pink-600"
              >
                Search Bus
              </button>
            </div>
          </form>
        </div>

        {formData && (
          <div className="bg-white mt-10 p-8 shadow-lg rounded-2xl max-w-6xl w-full">
            <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">Edit Bus Details</h2>
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Bus Number</label>
                  <input
                    type="text"
                    name="Busnumber"
                    value={formData.Bus_number}
                    onChange={handleFormChange}
                    className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Bus Name</label>
                  <input
                    type="text"
                    name="Bus_name"
                    value={formData.Bus_name}
                    onChange={handleFormChange}
                    className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Number of Seats</label>
                  <input
                    type="number"
                    name="Number_seat"
                    value={formData.Number_seat}
                    onChange={handleFormChange}
                    readOnly
                    className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Price Per Seat</label>
                  <input
                    type="number"
                    name="Seat_price"
                    value={formData.Seat_price}
                    onChange={handleFormChange}
                    className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Source</label>
                  <input
                    type="text"
                    name="Source"
                    value={formData.Source}
                    onChange={handleFormChange}
                    className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Destination</label>
                  <input
                    type="text"
                    name="Destination"
                    value={formData.Destination}
                    onChange={handleFormChange}
                    className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Source Time</label>
                  <input
                    type="time"
                    name="Source_time"
                    value={formData.Source_time}
                    onChange={handleFormChange}
                    className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Destination Time</label>
                  <input
                    type="time"
                    name="Destination_time"
                    value={formData.Destination_time}
                    onChange={handleFormChange}
                    className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Bus Type</label>
                  <select
                    name="Bus_type"
                    value={formData.Bus_type}
                    onChange={handleFormChange}
                    className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="" disabled>Select Bus Type</option>
                    <option value="AC">AC</option>
                    <option value="Non-AC">Non-AC</option>
                  </select>
                </div>
                <div>
            <label htmlFor="busClass" className="block text-sm font-medium text-gray-700">Bus Class</label>
            <select
              id="BusClass"
              name="Bus_Class"
              value={formData.Bus_Class}
              onChange={handleFormChange}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-gray-900"
              required
            >
              <option value="" disabled>Select Bus Class</option>
              <option value="Sleeper">Sleeper</option>
              <option value="Sitting">Sitting</option>
            </select>
          </div>
          <div>
            <label htmlFor="busType" className="block text-sm font-medium text-gray-700">Timing</label>
            <select
              id="Timing"
              name="Timing"
              value={formData.Timing}
              onChange={handleFormChange}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-gray-900"
              required
            >
              <option value="" disabled>Select Bus Timing</option>
              <option value="Day">Day</option>
              <option value="Night">Night</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="busType" className="block text-sm font-medium text-gray-700">Food Facility</label>
            <select
              id="Food_Facility"
              name="Food_Facility"
              value={formData.Food_Facility}
              onChange={handleFormChange}
              className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400 text-gray-900"
              required
            >
              <option value="" disabled>Food Facility</option>
              <option value="Avaliable">Avaliable</option>
              <option value="Not-Avalible">Not-Avalible</option>
            </select>
          </div>

               
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="bg-gradient-to-r from-green-500 to-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:from-green-600 hover:to-blue-600"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
    </div>
    </div>
  );
};

export default EditBusForm;
