import React, { useState } from 'react';
import axios from 'axios';

export default function PNRStatus() {
    const [pnrNumber, setPnrNumber] = useState('');
    const [passengerDetails, setPassengerDetails] = useState([]);
    const [ticketData, setTicketData] = useState({}); // Single object for ticket data
    const [errorMessage, setErrorMessage] = useState('');

    const handleCheckStatus = async (e) => {
        e.preventDefault();
        
        try {
            // Post request to fetch passenger details
            const response = await axios.post('https://safar-bus-booking-system.onrender.com/Ticketstatus', { PnrNumber: pnrNumber });
            console.log(response.data);
            if (response) {
                const passengerArray = response.data;
                const passengerData = passengerArray.PassangerDetails;
                setPassengerDetails(passengerData || []); // Default to an empty array if no passenger details are found
                setTicketData(passengerArray); // Assign the entire response to ticketData
                setErrorMessage(''); // Clear any previous error messages
            } else {
                setPassengerDetails([]); // Clear passenger details if no valid response
                setErrorMessage('No passenger details found.');
            }
        } catch (error) {
            // Handle 400 error for invalid PNR number
            if (error.response && error.response.status === 400) {
                setErrorMessage('Please enter a valid PNR number!');
            } else {
                console.error(error);
                setErrorMessage('An error occurred while fetching the details. Please try again.');
            }
        }

        setPnrNumber(""); // Clear PNR input after submission
    };

    return (
        <div className="min-h-[800px] flex flex-col justify-center bg-gray-50">
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl text-gray-800 font-extrabold text-center mb-8">
                    Check Your PNR Status
                </h1>
                <form onSubmit={handleCheckStatus} className="flex flex-col items-center">
                    <div className="w-full max-w-lg">
                        <label htmlFor="pnr" className="text-lg font-semibold text-gray-700">
                            Enter your Ticket/Pnr Number:
                        </label>
                        <input
                            type="text"
                            id="pnr"
                            name="pnr"
                            value={pnrNumber}
                            onChange={(e) => setPnrNumber(e.target.value)}
                            placeholder="Enter PNR Number"
                            className="mt-2 py-3 px-3 w-full rounded-lg bg-white border border-gray-400 text-gray-800 font-semibold focus:border-blue-500 focus:outline-none transition duration-300 ease-in-out"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition duration-300 text-white font-bold py-3 px-8 rounded-full shadow-lg mt-7"
                    >
                        Check Status
                    </button>
                </form>

                {/* Error Message */}
                {errorMessage && (
                    <div className="mt-8 p-4 bg-red-100 border border-red-500 rounded-lg text-red-700 text-center">
                        {errorMessage}
                    </div>
                )}

                {/* Display Passenger and Ticket Details */}
                {Array.isArray(passengerDetails) && passengerDetails.length > 0 && (
                    <div className="mt-8 bg-gray-100 p-6 border-2 border-dashed border-gray-400 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Your Ticket</h2>
                        
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            {/* Ticket Information */}
                            <div className="mb-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Ticket Information</h3>
                                <p className="text-lg font-serif text-gray-800">
                                    <span className="font-semibold">Bus Number:</span> {ticketData.BusNumber}
                                </p>
                                <p className="text-lg font-serif text-gray-800">
                                    <span className="font-semibold">Bus Name:</span> {ticketData.BusName}
                                </p>
                                <p className="text-lg font-serif text-gray-800">
                                    <span className="font-semibold">Source:</span> {ticketData.Source}
                                </p>
                                <p className="text-lg font-serif text-gray-800">
                                    <span className="font-semibold">Destination:</span> {ticketData.Destination}
                                </p>
                                <p className="text-lg font-serif text-gray-800">
                                    <span className="font-semibold">Date:</span> {ticketData.Date}
                                </p>
                                <p className="text-lg font-serif text-gray-800">
                                    <span className="font-semibold">Boarding Time:</span> {ticketData.SourceTiming}
                                </p>
                            </div>

                            {/* Passenger Information */}
                            {passengerDetails.map((passenger, index) => (
                                <div key={index} className="mb-4">
                                    <h3 className="text-lg font-bold text-gray-800 mb-2">Passenger {index + 1}</h3>
                                    <p className="text-lg font-serif text-gray-800">
                                        <span className="font-semibold">Passenger Name:</span> {passenger.Fullname}
                                    </p>
                                    <p className="text-lg font-serif text-gray-800">
                                        <span className="font-semibold">Seat Number:</span> {passenger.SeatNo}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
