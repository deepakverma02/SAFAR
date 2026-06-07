import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const HelpPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-light-blue-100 to-white">
      {/* Header */}
      <header className="bg-blue-600 text-white p-6">
        <h1 className="text-2xl font-bold text-center">Help & Support</h1>
      </header>
      
      {/* Help Section */}
      <main className="flex-grow container mx-auto p-6">
        <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Frequently Asked Questions</h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* FAQ Card */}
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">How to book a ticket?</h3>
            <p className="text-gray-600 mt-2">You can book a ticket by using the search form on the homepage...</p>
          </div>
          
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">How to check PNR status?</h3>
            <p className="text-gray-600 mt-2">Go to the PNR Status page and enter your ticket number...</p>
          </div>
          
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">What payment methods do you accept?</h3>
            <p className="text-gray-600 mt-2">We accept credit/debit cards, UPI, and net banking...</p>
          </div>
          
          <div className="p-6 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold">Can I cancel my booking?</h3>
            <p className="text-gray-600 mt-2">Yes, you can cancel your booking by visiting the My Bookings section...</p>
          </div>
        </div>

        {/* Contact Support Section */}
        <div className="mt-12 text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">Need Help?</h2>
          <p className="text-gray-700 mb-6">If you have any further questions, feel free to contact our support team.</p>
          <Link
              to="/contact"
            >
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-md">
            Contact Support
          </button>
          </Link>
        </div>
      </main>

      {/* Footer */}
    
    </div>
  );
};

export default HelpPage;
