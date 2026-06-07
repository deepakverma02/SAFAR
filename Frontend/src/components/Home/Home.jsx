import React, { useEffect, useLayoutEffect, useState } from 'react';
import bus_background_logo from '../../assets/bus_background_logo.jpg'; // Import the bus image
import { useDispatch } from 'react-redux'; // Added useDispatch
import { setFilter } from '../../Features/FilterSlice'; // Import setFilter from your slice
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BusBookingForm = () => {
  // Check if the page has been refreshed already
  useLayoutEffect(() => {
    const interval = setInterval(() => {
      const username = localStorage.getItem('username');
      if (username && !localStorage.getItem('reloaded')) {
        localStorage.setItem('reloaded', 'true'); // Mark as reloaded
        window.location.reload(); // Refresh the page
      }
    }, 1000);
    return () => clearInterval(interval); // Cleanup
  }, []);

  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [reviews, setReviews] = useState([]);
  const [sourceError, setSourceError] = useState(''); // Error state for source
  const [destinationError, setDestinationError] = useState(''); // Error state for destination
  const [dateError, setDateError] = useState(''); // Error state for date

  const dispatch = useDispatch(); // Use useDispatch to dispatch actions
  const navigate = useNavigate();

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('https://safar-bus-booking-system.onrender.com/displayReview');
        if (response.data) {
          setReviews(response.data);
        } else {
          console.log("No data Found!");
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, []);

  const locations = [
    "Khadvali", "Mumbai", "Delhi", "Bengaluru", "Kolkata", "Chennai", "Hyderabad",
    "Ahmedabad", "Pune", "Thane", "Pryagraj", "Kalyan", "Nashik", "Bhusawal",
    "Jaunpur", "Janghai", "Pratapgad", "Vanarsi", "Ayodhya"
  ];

  const [filteredSourceSuggestions, setFilteredSourceSuggestions] = useState([]);
  const [filteredDestinationSuggestions, setFilteredDestinationSuggestions] = useState([]);
  const [showSourceSuggestions, setShowSourceSuggestions] = useState(false);
  const [showDestinationSuggestions, setShowDestinationSuggestions] = useState(false);

  const handleSwap = () => {
    setSource(destination);
    setDestination(source);
  };

  const handleSourceChange = (e) => {
    const input = e.target.value;
    setSource(input);
    const filtered = locations.filter(loc => loc.toLowerCase().startsWith(input.toLowerCase()));
    setFilteredSourceSuggestions(filtered);
    setShowSourceSuggestions(true);
  };

  const handleDestinationChange = (e) => {
    const input = e.target.value;
    setDestination(input);
    const filtered = locations.filter(loc => loc.toLowerCase().startsWith(input.toLowerCase()));
    setFilteredDestinationSuggestions(filtered);
    setShowDestinationSuggestions(true);
  };

  const handleSourceSelect = (suggestion) => {
    setSource(suggestion);
    setShowSourceSuggestions(false);
  };

  const handleDestinationSelect = (suggestion) => {
    setDestination(suggestion);
    setShowDestinationSuggestions(false);
  };

  const handleSearch = () => {
    let valid = true;

    // Reset errors
    setSourceError('');
    setDestinationError('');
    setDateError('');

    // Validate source
    if (!source) {
      setSourceError('Source is required');
      valid = false;
    } else if (!locations.includes(source)) {
      setSourceError('Source must be selected from the list');
      valid = false;
    }

    // Validate destination
    if (!destination) {
      setDestinationError('Destination is required');
      valid = false;
    } else if (!locations.includes(destination)) {
      setDestinationError('Destination must be selected from the list');
      valid = false;
    }

    // Validate source and destination are not the same
    if (source === destination) {
      setDestinationError('Source and destination cannot be the same');
      valid = false;
    }

    // Validate date
    if (!date) {
      setDateError('Date is required');
      valid = false;
    }

    // If all fields are valid, proceed to search
    if (valid) {
      dispatch(setFilter({ source, destination, date }));
      navigate('/searchBus');
    }
  };

  // Restrict the date input
  const today = new Date();
  today.setDate(today.getDate() + 1);  // Set the date to tomorrow
  const minDate = today.toISOString().split('T')[0];

  const oneMonthAhead = new Date();
  oneMonthAhead.setMonth(oneMonthAhead.getMonth() + 1);
  const maxDate = oneMonthAhead.toISOString().split('T')[0];

  // Delay hiding the suggestions to allow clicks
  const handleBlurWithDelay = (setShowSuggestions) => {
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200); // Delay of 200ms
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-300 to-blue-400 p-6">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{ backgroundImage: `url(${bus_background_logo})` }}
        aria-hidden="true"
      ></div>

      <div className="relative z-20 bg-gradient-to-r from-white to-blue-100 p-8 rounded-lg shadow-2xl w-full max-w-7.5xl">
        <h1 className="text-3xl font-extrabold text-blue-800 mb-6 text-center">Book Your Bus</h1>

        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 items-center">

          {/* Source Input */}
          <div className="relative w-full md:w-1/4">
            <label className="block text-gray-700 mb-2">Source</label>
            <input
              type="text"
              value={source}
              onChange={handleSourceChange}
              onFocus={() => setShowSourceSuggestions(true)} // Show suggestions when focused
              onBlur={() => handleBlurWithDelay(setShowSourceSuggestions)} // Delay hiding suggestions
              placeholder="Enter source location"
              className="w-full px-4 py-3 text-lg rounded-lg border-2 border-blue-300 focus:outline-none focus:border-purple-500 shadow-md bg-white"
            />
            {showSourceSuggestions && filteredSourceSuggestions.length > 0 && (
              <ul className="absolute z-30 bg-white border border-gray-300 w-full mt-1 rounded-lg shadow-md max-h-40 overflow-y-auto">
                {filteredSourceSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onMouseDown={() => handleSourceSelect(suggestion)} // Use onMouseDown to avoid conflict with onBlur
                    className="px-4 py-2 hover:bg-blue-200 cursor-pointer"
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
            {sourceError && <p className="text-red-500 text-sm mt-1">{sourceError}</p>}
          </div>

          {/* Swap Button */}
          <button
            onClick={handleSwap}
            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 transition duration-300 text-white font-semibold py-2 px-4 rounded-full mt-7 shadow-lg"
          >
            Swap
          </button>

          {/* Destination Input */}
          <div className="relative w-full md:w-1/4">
            <label className="block text-gray-700 mb-2">Destination</label>
            <input
              type="text"
              value={destination}
              onChange={handleDestinationChange}
              onFocus={() => setShowDestinationSuggestions(true)} // Show suggestions when focused
              onBlur={() => handleBlurWithDelay(setShowDestinationSuggestions)} // Delay hiding suggestions
              placeholder="Enter destination"
              className="w-full px-4 py-3 text-lg rounded-lg border-2 border-blue-300 focus:outline-none focus:border-purple-500 shadow-md bg-white"
            />
            {showDestinationSuggestions && filteredDestinationSuggestions.length > 0 && (
              <ul className="absolute z-30 bg-white border border-gray-300 w-full mt-1 rounded-lg shadow-md max-h-40 overflow-y-auto">
                {filteredDestinationSuggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onMouseDown={() => handleDestinationSelect(suggestion)} // Use onMouseDown to avoid conflict with onBlur
                    className="px-4 py-2 hover:bg-blue-200 cursor-pointer"
                  >
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
            {destinationError && <p className="text-red-500 text-sm mt-1">{destinationError}</p>}
          </div>

          {/* Date Input */}
          <div className="relative w-full md:w-1/4">
            <label className="block text-gray-700 mb-2">Date of Travel</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              min={minDate}
              max={maxDate}
              className="w-full px-4 py-3 text-lg rounded-lg border-2 border-blue-300 focus:outline-none focus:border-purple-500 shadow-md bg-white"
            />
            {dateError && <p className="text-red-500 text-sm mt-1">{dateError}</p>}
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition duration-300 text-white font-bold py-3 px-8 rounded-full shadow-lg mt-7"
          >
            Search
          </button>
        </div>
      </div>

      {/* Customer Reviews */}
      <div className="flex flex-wrap justify-center gap-4 mt-8">
        {reviews.length > 0 ? (
          reviews.map((review, index) =>
         
            
            (
          
            
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md w-full sm:w-1/2 md:w-1/3 lg:w-1/4"
            >
              <h3 className="font-semibold text-lg text-blue-700">{review.name}</h3>
              <p className="text-gray-600 mt-2">{review.review}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No reviews available.</p>
        )}
      </div>
    </div>
  );
};

export default BusBookingForm;
