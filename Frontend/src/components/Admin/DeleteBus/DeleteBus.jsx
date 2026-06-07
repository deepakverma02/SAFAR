import React, { useState } from 'react';
import axios from 'axios';
const DeleteBusForm = () => {
  const [busSearch, setBusSearch] = useState('');
  const [busDetails, setBusDetails] = useState(null);


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

 
  const handleSearchSubmit =async (e) => {
    e.preventDefault();
   
    const foundBus = await api.post('/businfo',{'Bus_number':busSearch});
console.log(foundBus.data)

    
    setBusDetails(foundBus.data); // Set the bus details
  };

  const handleDelete = async(e) => {
    e.preventDefault()
    const deletebus= await api.post('/deletebus',{'Bus_number':busSearch})
      alert("Bus Removed !")
    console.log('Bus deleted:', busDetails.busNumber);
    // Clear form after deletion
    setBusDetails(null);
    setBusSearch('');
  };

  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?bus,road')" }}>
      <div className="bg-black bg-opacity-50 p-4 min-h-screen flex flex-col justify-center items-center">
        <div className="bg-white p-8 shadow-lg rounded-2xl max-w-lg w-full">
          <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">Search Bus to Delete</h2>
          <form onSubmit={handleSearchSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Bus Number </label>
              <input
              required="true"
                type="text"
                value={busSearch}
                onChange={handleSearchChange}
                placeholder="Enter Bus Number "
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-gradient-to-r from-red-500 to-orange-500 text-white py-2 px-4 rounded-lg shadow-md hover:from-red-600 hover:to-orange-600"
              >
                Search Bus
              </button>
            </div>
          </form>
        </div>

        {busDetails && (
          <div className="bg-white mt-10 p-8 shadow-lg rounded-2xl max-w-6xl w-full">
            <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-6">Confirm Delete Bus</h2>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Bus Number</label>
                <input
                  type="text"
                  value={busDetails.Bus_number}
                  readOnly
                  className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Bus Name</label>
                <input
                  required="true"
                  type="text"
                  value={busDetails.Bus_name}
                  readOnly
                  className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Number of Seats</label>
                <input
                  type="number"
                  value={busDetails.Number_seat}
                  readOnly
                  className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Price Per Seat</label>
                <input
                  type="number"
                  value={busDetails.Seat_price}
                  readOnly
                  className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Source</label>
                <input
                  type="text"
                  value={busDetails.Source}
                  readOnly
                  className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Destination</label>
                <input
                  type="text"
                  value={busDetails.Destination}
                  readOnly
                  className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Source Time</label>
                <input
                  type="time"
                  value={busDetails.Source_time}
                  readOnly
                  className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Destination Time</label>
                <input
                  type="time"
                  value={busDetails.Destination_time}
                  readOnly
                  className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Bus Type</label>
                <input
                  type="text"
                  value={busDetails.Bus_type}
                  readOnly
                  className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Bus Class</label>
                <input
                  type="text"
                  value={busDetails.Bus_Class}
                  readOnly
                  className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Timing</label>
                <input
                  type="text"
                  value={busDetails.Timing}
                  readOnly
                  className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Food Facility</label>
                <input
                  type="text"
                  value={busDetails.Food_Facility}
                  readOnly
                  className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100"
                />
              </div>


              
            </div>
            
            

            <div className="text-center mt-8">
              <button
                onClick={handleDelete}
                className="bg-gradient-to-r from-red-600 to-red-800 text-white py-2 px-6 rounded-lg shadow-md hover:from-red-700 hover:to-red-900"
              >
                Delete Bus
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeleteBusForm;
