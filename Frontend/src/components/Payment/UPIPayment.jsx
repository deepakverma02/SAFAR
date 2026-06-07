import React, { useState, useEffect } from 'react';
import Processing from './Processing'; // Assuming this is the processing screen component
import scanner from '../../assets/scanner.jpg';


const UPIPayment = () => {
  const [upiMethod, setUpiMethod] = useState('');
  const [upiId, setUpiId] = useState('');
  const [verified, setVerified] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [timer, setTimer] = useState(0); // Timer state
  const [errors, setErrors] = useState({}); // Error state
  const [optionSelected, setOptionSelected] = useState(false); // Track if an option is selected
  

  const validateUPIId = (upiId) => {
    // Ensure UPI ID contains '@'
    if (upiId.trim() === '') {
      return 'UPI ID cannot be empty.';
    }
    if (!upiId.includes('@')) {
      return 'UPI ID must contain an "@" symbol.';
    }
    return ''; // No errors
  };

  const handleUPIVerification = () => {
    const validationError = validateUPIId(upiId);
    if (validationError) {
      setErrors({ upiId: validationError });
    } else {
      setTimeout(() => setVerified(true), 1000); // Simulate UPI verification
      setErrors({}); // Clear any previous errors
    }
  };

  const handlePayment = () => {
    if (upiMethod === 'upiId' && !verified) {
      setErrors({ payment: 'Please verify your UPI ID before proceeding.' });
    } else {
      setErrors({});
      setTimer(30); // Start the 30-second countdown
    }
  };

  // Timer countdown logic
  useEffect(() => {
    let countdown;
    if (timer > 0) {
      countdown = setTimeout(() => setTimer(timer - 1), 1000);
    } else if (timer === 0 && (upiMethod === 'scanner' || (upiMethod === 'upiId' && verified))) {
      setProcessing(true); // Proceed to processing after countdown ends
    }
    return () => clearTimeout(countdown);
  }, [timer]);

  if (processing) return <Processing />; // Show processing screen if payment started

  return (
    <div className="bg-white p-4 md:p-8 rounded-3xl shadow-2xl w-full max-w-lg md:max-w-2xl mx-auto transition-transform duration-500 ease-in-out transform hover:scale-105">
      <h2 className="text-2xl md:text-3xl font-extrabold mb-4 md:mb-6 text-gray-800 text-center">UPI Payment</h2>
      
      <div className="text-center mb-4 md:mb-6">
        {!optionSelected ? (
          <>
            <span className="text-lg md:text-xl font-semibold text-gray-700">Select UPI Method:</span>
            <select 
              className="block w-full mt-2 md:mt-3 p-2 md:p-3 rounded-lg border border-gray-300 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out mx-auto max-w-xs"
              onChange={(e) => {
                setUpiMethod(e.target.value);
                setOptionSelected(true); // Mark option as selected
                if (e.target.value === 'scanner') {
                  setTimer(2); // Start timer for QR scanner
                }
              }}
            >
              <option value="">Choose an option</option>
              <option value="scanner">Scanner</option>
              <option value="upiId">UPI ID</option>
            </select>
          </>
        ) : (
          <p className="text-lg md:text-xl font-semibold text-gray-700">
            Selected : {upiMethod === 'scanner' ? 'Scanner' : 'UPI ID'}
          </p>
        )}
      </div>

      {upiMethod === 'scanner' && (
        <div className="bg-indigo-50 p-4 md:p-6 rounded-xl mb-4 md:mb-6 text-center transition-all duration-300 ease-in-out transform hover:shadow-lg mx-auto max-w-xs">
          <p className="text-base md:text-lg mb-2 md:mb-4 font-medium">Scan the QR Code below:</p>
          {/* QR Code Image */}
          <img 
            src={scanner} // Replace with your actual QR image source
            alt="QR Code" 
            className="mx-auto mb-2 md:mb-4"
            style={{ width: '150px', height: '150px' }} 
          />
          
          {/* Timer */}
          {timer > 0 ? (
            <p className="text-base md:text-lg text-gray-700 font-semibold">Processing in {timer} seconds...</p>
          ) : (
            <p className="text-base md:text-lg text-gray-700 font-semibold">Processing...</p>
          )}
        </div>
      )}

      {upiMethod === 'upiId' && (
        <div className="text-center">
          <input 
            type="text" 
            className={`w-full mt-2 md:mt-3 p-2 md:p-3 rounded-lg border border-gray-300 text-base md:text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out mx-auto max-w-xs ${errors.upiId ? 'border-red-500' : ''}`}
            onChange={(e) => setUpiId(e.target.value)}
            value={upiId}
            placeholder="Enter UPI ID"
          />
          {errors.upiId && <p className="text-red-500 text-sm mt-1">{errors.upiId}</p>}

          {!verified ? (
            <button 
              className="bg-indigo-600 text-white py-2 md:py-3 px-4 md:px-6 rounded-full text-base md:text-lg font-bold transition-transform transform hover:scale-110 hover:bg-indigo-700 mt-4 mx-auto block"
              onClick={handleUPIVerification}
            >
              Verify
            </button>
          ) : (
            <div className="mt-4 md:mt-6">
              <p className="text-green-600 text-base md:text-lg font-semibold mb-2 md:mb-4">UPI ID is Verified!</p>
              {!timer ? (
                <button 
                  className="bg-indigo-600 text-white py-2 md:py-3 px-4 md:px-6 rounded-full text-base md:text-lg font-bold transition-transform transform hover:scale-110 hover:bg-indigo-700 mt-4 mx-auto block"
                  onClick={handlePayment}
                >
                  Make Payment
                </button>
              ) : (
                <p className="text-base md:text-lg text-gray-700 font-semibold mt-4">Processing in {timer} seconds...</p>
              )}
              {errors.payment && <p className="text-red-500 text-sm mt-1">{errors.payment}</p>}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UPIPayment;
