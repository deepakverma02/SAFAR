import React from 'react';

const Seat = ({ seat, isSelected, isBooked, onSeatSelect }) => {
  const handleSeatClick = () => {
    if (!isBooked) {
      onSeatSelect(seat);
    }
  };

  return (
    <div
      className={`w-12 h-12 flex items-center justify-center rounded-full cursor-pointer transition-transform duration-300 ${
        isBooked
          ? 'bg-yellow-500 cursor-not-allowed' // Yellow for booked seats, not selectable
          : isSelected
          ? 'bg-green-500 hover:scale-110' // Green for selected seats
          : 'bg-gray-300 hover:bg-blue-300 hover:scale-110' // Gray for unselected, blue on hover
      }`}
      onClick={handleSeatClick}
    >
      {seat}
    </div>
  );
};

export default Seat;
