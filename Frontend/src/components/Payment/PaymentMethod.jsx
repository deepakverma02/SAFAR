import React, { useState } from 'react';
import UPIPayment from './UPIPayment';
import CardPayment from './CardPayment';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setPaymentMode } from '../../Features/PaymentModeSlice';

const PaymentMethod = () => {
 // paymentM because , in redux i have already define paymentMode
  const [paymentM, setPaymentM] = useState('');
  const passengers = useSelector((state) => state.passengers.passengers);
  console.log('Passengers from Redux Store:', passengers);
  // console.log(passengers[0]["name"])
  const dispatch = useDispatch();  // Initialize dispatch
  // console.log(passengers[2]["address"])
  


  const handlePaymentModeChange = (mode) => {
    setPaymentM(mode);
    dispatch(setPaymentMode(mode))
    // console.log(payemntMode)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 to-purple-300">
      <div className="flex flex-col items-center bg-white rounded-lg shadow-lg p-8 w-full max-w-lg">
        {paymentM === '' ? (
          <div className="flex flex-col items-center w-full">
            <div className="flex items-center mb-8 w-full">
              {/* Header */}
              <h1 className="text-4xl font-bold text-gray-800 flex-grow text-center">Select Payment Method</h1>
            </div>

            {/* Payment Mode Buttons */}
            <div className="flex flex-col space-y-6 w-full">
              <button 
                className={`transition-all duration-300 transform hover:scale-105 hover:shadow-lg bg-indigo-600 text-white py-6 px-10 rounded-2xl font-semibold text-2xl ${paymentM === 'UPI' && 'bg-indigo-800'}`}
                onClick={() => handlePaymentModeChange('UPI')}
              >
                UPI
              </button>
              <button 
                className={`transition-all duration-300 transform hover:scale-105 hover:shadow-lg bg-green-600 text-white py-6 px-10 rounded-2xl font-semibold text-2xl ${paymentM === 'Card' && 'bg-green-800'}`}
                onClick={() => handlePaymentModeChange('Card')}
              >
                Card
              </button>
            </div>
          </div>
        ) : (
          <div 
            className={`transition-all duration-500 w-full rounded-lg p-8 bg-white shadow-xl`}
          >
            {paymentM === 'UPI' && <UPIPayment />}
            {paymentM === 'Card' && <CardPayment />}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentMethod;
