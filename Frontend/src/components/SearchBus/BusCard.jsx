import React, { useState } from 'react';
import { FaBus, FaClock, FaRupeeSign, FaArrowRight, FaCheckCircle, FaMapMarkerAlt } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { setBusInfo } from '../../Features/BusInfoSlice';
import { useNavigate } from 'react-router-dom';


// Function needs to be declared outside of the component or at the top within it
function calculateTotalTime(sourceTime, destinationTime) {
  // Convert time strings to hours and minutes
  const [sourceHours, sourceMinutes] = sourceTime.split(':').map(Number);
  const [destHours, destMinutes] = destinationTime.split(':').map(Number);
  
  // Convert source and destination times to total minutes since start of the day
  const sourceTotalMinutes = sourceHours * 60 + sourceMinutes;
  const destTotalMinutes = destHours * 60 + destMinutes;
  
  // Calculate the difference in minutes (accounting for the day overlap)
  let totalMinutes = destTotalMinutes - sourceTotalMinutes;
  if (totalMinutes < 0) {
    // If destination time is on the next day
    totalMinutes += 24 * 60;
  }
  
  // Convert the total minutes back to hours and minutes
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  
  return `${hours} hours and ${minutes} minutes`;
}

function BusCard({ bus }) {
  // Provide default values to avoid errors
  const foodFacility = bus.Food_Facility || 'Not Available';
  const dispatch = useDispatch();
  const navigate = useNavigate();



  const handleBook = () =>{
    dispatch(setBusInfo({
      busNumber : bus.Bus_number,
      busName : bus.Bus_name,
      busType : bus.Bus_type,
      busClass : bus.Bus_Class,
      busSource : bus.Source,
      busSourceTime : bus.Source_time,
      busDestination : bus.Destination,
      busDestinationTime : bus.Destination_time,
      foodFacility : foodFacility,
      price : bus.Seat_price
    }))
    console.log("Bus SourceTime : "+ bus.Source_time);
    // console.log(bus.Bus_Class)
     navigate('/searchBus/viewSeats')
  }

  // console.log("Bus SourceTime : "+ bus.Source_time);
  // console.log("Bus SourceTime : "+ bus.Source_time);
  
//  console.log(calculateTotalTime(bus.Source_time, bus.Destination_time))
  return (
    <div className="bg-white p-4 rounded-xl shadow-lg transition-shadow duration-300 mb-2 border border-gray-200 hover:shadow-md hover:bg-gray-50">

      {/* Top Section: Bus Name and Number */}
      <div className="flex justify-between items-center border-b-2 border-gray-200 pb-2 mb-2">
        <div className="flex items-center space-x-3">
          <FaBus className="text-blue-700 text-4xl" />
          <div>
            <div className="text-xl font-bold text-blue-900">{bus.Bus_name}</div>
            <div className="text-md text-gray-600 font-bold">Bus Number : <b className='text-blue-800'>{bus.Bus_number}</b></div>
          </div>
        </div>
        <div className="text-lg font-bold text-green-700 flex items-center">
          <FaRupeeSign className="text-xl" /> 
          <span className="text-lg ml-2">{bus.Seat_price}</span>
        </div>
      </div>

      {/* Center Section: Source and Destination */}
      <div className="flex items-center justify-between mb-2 border-b-2 border-gray-200 pb-2">
        <div className="flex-none text-md">
          <div className="font-semibold text-gray-500 flex items-center mb-1">
            <FaMapMarkerAlt className="text-blue-500 mr-1" /> Source :
          </div> 
          <div className="text-blue-800 text-xl font-bold mb-1">{bus.Source}</div>
          <div className="text-gray-500 text-xs font-bold">{bus.Source_time}</div>
        </div>

        {/* Centered Arrow */}
        <div className="mx-24 flex-shrink-0 flex-none">
          <FaArrowRight className="text-3xl text-gray-400" />
        </div>

        <div className="flex-none text-md">
          <div className="font-semibold text-gray-500 flex items-center mb-1">
            <FaMapMarkerAlt className="text-red-500 mr-1" /> Destination :
          </div> 
          <div className="text-blue-800 text-xl font-bold mb-1">{bus.Destination}</div>
          <div className="text-gray-500 text-xs font-bold">{bus.Destination_time}</div>
        </div>

        {/* Call to Action */}
        <div className="text-right mt-1">
            <button className="bg-red-500 text-white px-4 py-2 rounded-full font-semibold text-lg shadow-md hover:bg-red-600 transition-colors duration-300"
            onClick={handleBook}>
              Book Now
            </button>
        </div>
      </div>

      {/* Bottom Section: Additional Info */}
      <div className="flex justify-between items-center text-md">
        <div className="flex-1 flex items-center">
          <FaClock className="inline text-yellow-500 mr-1 text-xl" />
          <span className="font-semibold text-indigo-700">
            Total Time: {calculateTotalTime(bus.Source_time,bus.Destination_time)}
          </span>
        </div>
        <div className="flex-1 text-center font-semibold">
          <span className={`font-semibold text-md ${bus.Bus_type === 'AC' ? 'text-green-600' : 'text-red-600'}`}>
            {bus.Bus_type === 'AC' ? 'AC' : 'Non-AC'}
          </span> | {bus.Bus_Class} | 
          {foodFacility === 'Available' ? <span className='text-green-600'>Food Available</span> : <span className='text-red-600'>No Food</span>}
        </div>
        <div className="flex-1 text-right flex items-center justify-end">
          <FaCheckCircle className="text-green-600 mr-1 text-xl" />
          <span className="font-bold text-blue-900 text-md">Total Seat: {bus.Number_seat}</span>
        </div>
      </div>

    </div>
  );
}

export default BusCard;
