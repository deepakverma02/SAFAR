import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Processing = () => {
  const [seconds, setSeconds] = useState(30); // Initialize with 30 seconds
  const [pnr, setPnr] = useState(localStorage.getItem('pnr') || null); // Retrieve PNR from localStorage if available
  const [receiptId, setReceiptId] = useState(localStorage.getItem('receiptId') || null); // Retrieve receipt ID from localStorage if available
  const [ticketId, setTicketId] = useState(localStorage.getItem('ticketId') || null); // Retrieve ticket ID from localStorage if available

  const navigate = useNavigate(); // Initialize useNavigate

  // Function to generate a PNR with "SAFAR" and 6 digits representing time (HHMMSS)
  const generatePNR = () => {
    const currentDate = new Date();
    const formattedTime = currentDate.toTimeString().split(' ')[0]; // Get HH:MM:SS
    const timeDigits = formattedTime.replace(/:/g, ''); // Remove colons to get HHMMSS
    return `SAFAR${timeDigits}`;
  };

  // Function to generate Receipt ID and Ticket ID with date and time
  const generateReceiptIdAndTicketId = () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 10); // YYYY-MM-DD
    const formattedTime = currentDate.toTimeString().split(' ')[0]; // HH:MM:SS
    const receiptId = `REC-${formattedDate}-${formattedTime.replace(/:/g, '')}`; // e.g., REC-2024-09-10-153045
    const ticketId = `TIC-${formattedDate}-${formattedTime.replace(/:/g, '')}`; // e.g., TIC-2024-09-10-153045
    return { receiptId, ticketId };
  };

  useEffect(() => {
    if (seconds === 0) {
      // Processing is considered successful here
      const generatedPNR = generatePNR();
      const { receiptId, ticketId } = generateReceiptIdAndTicketId();

      setPnr(generatedPNR);
      setReceiptId(receiptId);
      setTicketId(ticketId);

      // Store the PNR, receiptId, and ticketId in localStorage to persist after page refresh
      localStorage.setItem('pnr', generatedPNR);
      localStorage.setItem('receiptId', receiptId);
      localStorage.setItem('ticketId', ticketId);

      // Console log the generated values
      console.log('PNR:', generatedPNR);
      console.log('Receipt ID:', receiptId);
      console.log('Ticket ID:', ticketId);

      // Navigate to the desired URL (e.g., receipt page)
      navigate('/searchBus/viewSeats/Form/payment/receipt');
    }

    // Set up a timer to count down every second
    const timer = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds - 1);
    }, 1000);

    // Clean up timer on component unmount
    return () => clearInterval(timer);
  }, [seconds, navigate]);

  // Calculate the percentage of completion
  const progress = ((30 - seconds) / 30) * 100;

  // Handle case if processing fails (you can handle this based on payment failure logic)
  useEffect(() => {
    // In case of failure, reset PNR, receiptId, and ticketId to NULL
    if (seconds < 0) {
      setPnr(null);
      setReceiptId(null);
      setTicketId(null);

      localStorage.removeItem('pnr');
      localStorage.removeItem('receiptId');
      localStorage.removeItem('ticketId');
    }
  }, [seconds]);

  return (
    <div className="bg-gradient-to-br from-purple-400 to-blue-400">
      <div className="bg-white">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-4">
          Payment Processing .....
        </h2>
        <p className="text-xl font-semibold text-gray-600 mb-6">
          Please hold on while we complete your transaction.
        </p>
        <p className="text-lg font-medium text-gray-700 mb-4">
          Time remaining: <span className="font-bold text-purple-600">{seconds}</span> seconds
        </p>

        {/* Progress Bar */}
        <div className="relative w-full h-4 bg-gray-300 rounded-full overflow-hidden mb-6">
          <div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Spinner */}
        <div className="flex justify-center items-center mt-6">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-purple-600 border-opacity-75 border-solid"></div>
        </div>

        {/* Additional Message */}
        <p className="text-gray-500 mt-6">We appreciate your patience!</p>
      </div>
    </div>
  );
};

export default Processing;
