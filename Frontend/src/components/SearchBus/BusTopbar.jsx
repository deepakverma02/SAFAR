import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

function TopBar({ source, destination, date }) {
  return (
    <div className="bg-blue-600 text-white p-4 z-50 shadow-lg text-center fixed top-16 left-0 w-full">
      <p className="text-lg font-medium flex items-center justify-center space-x-4">
        <span className="text-xl font-bold">Journey :</span> 
        <strong className="text-yellow-300">{source}</strong>
        <FaArrowRight className="text-yellow-300" />
        <strong className="text-yellow-300">{destination}</strong>
        <span className="text-xl font-bold">on</span> 
        <strong className="text-yellow-300">{date}</strong>
      </p>
    </div>
  );
}

export default TopBar;
