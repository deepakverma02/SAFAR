import React from 'react';
import Seat from './Seat';
import busStering from '../../assets/busStering.jpg';

const SeatMap = ({ selectedSeats, onSeatSelect, busType, bookedSeats }) => {
  const sittingSeats = {
    row1: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'],
    row2: ['S9', 'S10', 'S11', 'S12', 'S13', 'S14', 'S15', 'S16'],
    row3: ['S17', 'S18', 'S19', 'S20', 'S21', 'S22', 'S23', 'S24'],
    row4: ['S25', 'S26', 'S27', 'S28', 'S29', 'S30', 'S31', 'S32'],
  };

  const sleeperSeats = {
    row1: ['L1', 'L2', 'L3', 'L4', 'L5', 'L6', 'L7', 'L8'],
    row2: ['L9', 'L10', 'L11', 'L12', 'L13', 'L14', 'L15', 'L16'],
    row3: ['L17', 'L18', 'L19', 'L20', 'L21', 'L22', 'L23', 'L24'],
    row4: ['U25', 'U26', 'U27', 'U28', 'U29', 'U30', 'U31', 'U32'],
    row5: ['U33', 'U34', 'U35', 'U36', 'U37', 'U38', 'U39', 'U40'],
    row6: ['U41', 'U42', 'U43', 'U44', 'U45', 'U46', 'U47', 'U48'],
  };

  const renderSeatRow = (seats) => (
    <div className="flex mb-2 space-x-2">
      {seats.map((seat, index) => (
        seat ? (
          <Seat
            key={seat}
            seat={seat}
            isSelected={selectedSeats.includes(seat)}
            isBooked={bookedSeats.includes(seat)} // Pass booked seats
            onSeatSelect={onSeatSelect}
            className="transition-transform duration-300 hover:scale-110 hover:bg-green-300 active:bg-green-500"
          />
        ) : (
          <div key={index} className="w-12 h-12"></div>
        )
      ))}
    </div>
  );

  return (
    <div className="flex justify-center items-center space-x-8 px-6 py-8 bg-yellow-200 rounded-3xl">
      {/* Seat Layout Section */}
      <div className="flex flex-col items-center">
        {busType === 'Sitting' && (
          <div className="flex flex-col items-start bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 px-16 py-6 rounded-lg shadow-lg animate-fade-in">
            <div className="flex items-center">
              <img 
                src={busStering} 
                alt="Bus" 
                className="w-20 h-20 mr-4 rounded-full shadow-xl transition-transform duration-300 hover:rotate-180"
              />
              <div className="flex flex-col">
                {renderSeatRow(sittingSeats.row1)}
                {renderSeatRow(sittingSeats.row2)}
              </div>
            </div>

            <div className="mt-8 ml-24">
              {renderSeatRow(sittingSeats.row3)}
              {renderSeatRow(sittingSeats.row4)}
            </div>
          </div>
        )}

        {busType === 'Sleeper' && (
          <div className="flex flex-col items-start bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 px-16 py-6 rounded-lg shadow-lg animate-fade-in">
            {/* Lower Deck Label */}
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Lower Deck</h2>
            <div className="flex items-center">
              <img 
                src={busStering} 
                alt="Bus" 
                className="w-20 h-20 mr-4 rounded-full shadow-xl transition-transform duration-300 hover:rotate-180"
              />
              <div className="flex flex-col">
                {renderSeatRow(sleeperSeats.row1)}
                {renderSeatRow(sleeperSeats.row2)}
              </div>
            </div>

            <div className="mt-8 ml-24">
              {renderSeatRow(sleeperSeats.row3)}
            </div>
          </div>
        )}

        {/* Upper Deck */}
        {busType === 'Sleeper' && (
          <div className="flex flex-col items-start mt-5 bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 px-16 py-6 rounded-lg shadow-lg animate-fade-in">
            {/* Upper Deck Label */}
            <h2 className="text-lg font-semibold mb-4 text-gray-700">Upper Deck</h2>
            <div className="flex items-center">
              <img 
                src={busStering} 
                alt="Bus" 
                className="w-20 h-20 mr-4 rounded-full shadow-xl transition-transform duration-300 hover:rotate-180"
              />
              <div className="flex flex-col">
                {renderSeatRow(sleeperSeats.row4)}
                {renderSeatRow(sleeperSeats.row5)}
              </div>
            </div>

            <div className="mt-8 ml-24">
              {renderSeatRow(sleeperSeats.row6)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SeatMap;
