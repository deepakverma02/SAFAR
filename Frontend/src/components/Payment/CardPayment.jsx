import React, { useState, useEffect } from 'react';
import Processing from './Processing';

const CardPayment = () => {
  const [paymentType, setPaymentType] = useState('');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    holderName: '',
    cvv: ''
  });
  const [processing, setProcessing] = useState(false);
  const [timer, setTimer] = useState(null); // Timer state
  const [errors, setErrors] = useState({}); // Validation errors state

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (/^(0[1-9]|1[0-2])\/\d{2}$/.test(value)) {
      const [month, year] = value.split('/').map(Number);
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      const currentYear = currentDate.getFullYear() % 100;

      // Check if date is expired
      if (year > currentYear || (year === currentYear && month >= currentMonth)) {
        setCardDetails({ expiryDate: value });
      } else {
        newErrors.expiryDate = 'Invalid expiry date';
      }
    } else {
      setCardDetails({ expiryDate: value });
    }


    // Validation and formatting for specific fields
    if (name === 'cardNumber') {
      const formattedValue = value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim();
      setCardDetails({ ...cardDetails, [name]: formattedValue });
    } else if (name === 'cvv') {
      const formattedValue = value.replace(/\D/g, '').slice(0, 3); // Limit to 3 digits
      setCardDetails({ ...cardDetails, [name]: formattedValue });
    } else if (name === 'expiryDate') {
      const formattedValue = value.replace(/\D/g, '').slice(0, 4);
      const formattedDate = formattedValue.length >= 2 ? `${formattedValue.slice(0, 2)}/${formattedValue.slice(2, 4)}` : formattedValue;
      setCardDetails({ ...cardDetails, [name]: formattedDate });
    } else if (name === 'holderName') {
      // Force uppercase and ensure only letters
      const formattedValue = value.toUpperCase().replace(/[^A-Z\s]/g, '');
      setCardDetails({ ...cardDetails, [name]: formattedValue });
    } else {
      setCardDetails({ ...cardDetails, [name]: value });
    }

    // Reset error for the current field
    setErrors({ ...errors, [name]: '' });
  };

  const handlePayment = () => {
    const newErrors = {};

    // Validation for card number, expiry date, and CVV
    if (!/^\d{4} \d{4} \d{4} \d{4}$/.test(cardDetails.cardNumber)) {
      newErrors.cardNumber = 'Invalid card number';
    }
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardDetails.expiryDate)) {
      newErrors.expiryDate = 'Invalid expiry date';
    }
    if (!/^\d{3}$/.test(cardDetails.cvv)) {
      newErrors.cvv = 'Invalid CVV';
    }

    // Validation for cardholder's name
    if (cardDetails.holderName.trim() === '') {
      newErrors.holderName = 'Card holder name is required';
    } else if (!/^[A-Z\s]+$/.test(cardDetails.holderName)) {
      newErrors.holderName = 'Card holder name must contain only letters and spaces';
    }

    // If there are errors, don't proceed
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Proceed if no errors
    if (timer === null) {
      setTimer(30); // Start the 30-second countdown
    }
  };

  // Timer countdown logic
  useEffect(() => {
    let countdown;
    if (timer !== null && timer > 0) {
      countdown = setTimeout(() => setTimer(timer - 1), 1000);
    } else if (timer === 0) {
      setProcessing(true); // Proceed to processing after countdown ends
    }
    return () => clearTimeout(countdown);
  }, [timer]);

  if (processing) return <Processing />; // Show processing screen if payment started

  return (
    <div className="bg-white p-3 rounded-3xl shadow-2xl w-full max-w-4xl mx-auto transition-transform duration-500 ease-in-out transform hover:scale-105 overflow-hidden h-full max-h-screen">
      <h2 className="text-3xl font-extrabold mb-4 text-gray-800 text-center">Card Payment</h2>
      
      {/* Payment Type Selection */}
      {paymentType === '' ? (
        <div className="text-center mb-4">
          <span className="text-xl font-semibold text-gray-700">Select Card Type:</span>
          <select 
            className="block w-full mt-2 p-3 rounded-lg border border-gray-300 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ease-in-out mx-auto max-w-xs"
            onChange={(e) => setPaymentType(e.target.value)}
            disabled={paymentType !== ''}
          >
            <option value="">Choose an option</option>
            <option value="creditCard">Credit Card</option>
            <option value="debitCard">Debit Card</option>
          </select>
        </div>
      ) : (
        <div className="text-center mb-4">
          <span className="text-xl font-semibold text-gray-700">Selected: {paymentType === 'creditCard' ? 'Credit Card' : 'Debit Card'}</span>
        </div>
      )}

      {/* Credit or Debit Card Details */}
      {(paymentType === 'creditCard' || paymentType === 'debitCard') && (
        <div className="bg-indigo-50 p-6 rounded-xl mb-4 text-center transition-all duration-300 ease-in-out transform hover:shadow-lg mx-auto max-w-xs">
          <p className="text-lg mb-4 font-medium">
            Enter your {paymentType === 'creditCard' ? 'Credit Card' : 'Debit Card'} Details:
          </p>
          <input 
            type="text" 
            name="cardNumber" 
            placeholder="XXXX XXXX XXXX XXXX" 
            className="block w-full p-3 rounded-lg border border-gray-300 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-3"
            onChange={handleChange} 
            value={cardDetails.cardNumber}
            maxLength="19"
          />
          {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>}
          
          <input 
            type="text" 
            name="holderName" 
            placeholder="Card Holder Name" 
            className="block w-full p-3 rounded-lg border border-gray-300 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-3"
            onChange={handleChange} 
            value={cardDetails.holderName}
          />
          {errors.holderName && <p className="text-red-500 text-sm">{errors.holderName}</p>}
          
          <input 
      type="text" 
      name="expiryDate" 
      placeholder="MM/YY" 
      className="block w-full p-3 rounded-lg border border-gray-300 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-3"
      onChange={handleChange} 
      value={cardDetails.expiryDate}
      maxLength="5"
    />
          {errors.expiryDate && <p className="text-red-500 text-sm">{errors.expiryDate}</p>}
          
          <input 
            type="password" 
            name="cvv" 
            placeholder="CVV" 
            className="block w-full p-3 rounded-lg border border-gray-300 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
            onChange={handleChange} 
            value={cardDetails.cvv}
            maxLength="3"
          />
          {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv}</p>}

          {/* Timer */}
          {timer !== null ? (
            <p className="text-lg text-gray-700 font-semibold">
              Processing in {timer} seconds...
            </p>
          ) : (
            <button 
              className="bg-indigo-600 text-white py-3 px-6 rounded-full text-lg font-bold transition-transform transform hover:scale-110 hover:bg-indigo-700 mt-4"
              onClick={handlePayment}
            >
              Make Payment
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default CardPayment;
