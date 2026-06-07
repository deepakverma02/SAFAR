import React from 'react';

const SeatLegend = () => {
  return (
    <div className="flex flex-wrap justify-around w-full max-w-lg mb-8">
      <div className="flex items-center mb-4 md:mb-0">
        <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-600 mr-3" aria-label="Selected seat"></div>
        <span className="text-lg font-medium text-gray-800">Selected</span>
      </div>
      <div className="flex items-center mb-4 md:mb-0">
        <div className="w-10 h-10 bg-gray-300 mr-3" aria-label="Available seat"></div>
        <span className="text-lg font-medium text-gray-800">Available</span>
      </div>
      <div className="flex items-center mb-4 md:mb-0">
        <div className="w-10 h-10 bg-yellow-400 mr-3" aria-label="Reserved seat"></div>
        <span className="text-lg font-medium text-gray-800">Reserved</span>
      </div>
    </div>
  );
};

export default SeatLegend;
