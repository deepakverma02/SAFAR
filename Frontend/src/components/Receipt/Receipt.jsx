import React from 'react';
import { useNavigate } from 'react-router-dom';
import tick from '../../assets/tick.jpg'; // Import the tick image
import { useSelector } from 'react-redux';
import TicketDetails from '../../TicketDetails';
const PaymentSuccess = () => {
  const reduxdata=useSelector((state)=> state.passengers.passengers)

  
  const receiptId = localStorage.getItem('receiptId')
  const pnr = localStorage.getItem('pnr')
  const userName = localStorage.getItem('username')
  const totalPrice = useSelector((state) => state.seatNumPrice.totalPrice)

  const navigate = useNavigate(); // Create navigate function for navigation
  
  const receiptDetails = {
    receiptId: receiptId,
    date: new Date().toLocaleDateString(),
    time: new Date().toLocaleTimeString(),
    amount: totalPrice,
    passengerDetails: userName,
    pnrNumber: pnr, // Generated PNR number
  };

  const downloadReceipt = () => {
    const receiptData = `
      Receipt ID: ${receiptDetails.receiptId}\n
      Date: ${receiptDetails.date}\n
      Time: ${receiptDetails.time}\n
      Amount: ${receiptDetails.amount}\n
      Passenger Details: ${receiptDetails.passengerDetails}\n
      PNR Number: ${receiptDetails.pnrNumber}\n
    `;
    const blob = new Blob([receiptData], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'Receipt.txt';
    link.click();
    console.log(payemntMode)
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-500 overflow-hidden px-4 py-8">
      {/* Payment Success Message */}
      <div className="text-center mb-8 flex items-center justify-center">
        <img
          src={tick} // Replace this with the path to your image
          alt="Success Tick"
          className="h-16 w-16 mr-4 rounded-full"
        />
        <h2 className="text-4xl font-extrabold text-green-700 mb-4">
          Payment Successful!
        </h2>
      </div>

      {/* Receipt Details in Table */}
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-auto">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Payment Receipt</h3>
        <table className="min-w-full divide-y divide-gray-200">
          <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Receipt ID:</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{receiptDetails.receiptId}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Date:</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{receiptDetails.date}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Time:</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{receiptDetails.time}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Amount:</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{receiptDetails.amount}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Passenger Details:</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{receiptDetails.passengerDetails}</td>
            </tr>
            <tr>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">PNR Number:</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{receiptDetails.pnrNumber}</td>
            </tr>
          </tbody>
        </table>
        {/* Centered Download Receipt Button */}
        <div className="flex justify-center mt-6">
          <button
            className="bg-gradient-to-r from-blue-500 to-green-500 text-white py-2 px-6 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-300"
            onClick={downloadReceipt}
          >
            Download Receipt
          </button>
        </div>
      </div>

      {/* Additional Message */}
      <div className="text-center mt-6 text-lg text-gray-800">
        <p>Your ticket has been generated with PNR: <strong>{receiptDetails.pnrNumber}</strong></p>
        <p>To view and download your ticket, go to My Booking present at the Home Page.</p>
      </div>

      {/* Back Button */}
      <div className="flex justify-center mt-6">
        <button
          className="bg-blue-600 text-white py-2 px-6 rounded-full shadow-md hover:shadow-lg transform hover:scale-105 transition-transform duration-300"
          onClick={() => navigate('/')} // Use navigate function to redirect
        >
          Back to Home
        </button>
      </div>
      <TicketDetails></TicketDetails>
    </div>

  );
};

export default PaymentSuccess;
