import React from 'react'

export default function About() {
  return (
    <div className="py-16 bg-blue-50">
      <div className="container m-auto px-6 text-gray-700 md:px-12 xl:px-6">
        <div className="space-y-6 md:space-y-0 md:flex md:gap-6 lg:items-center lg:gap-12">
          <div className="md:5/12 lg:w-5/12">
            <img
              src="https://assets.telegraphindia.com/telegraph/2023/Mar/1679911465_edugraph-3.jpg"
              alt="image"
            />
          </div>
          <div className="md:7/12 lg:w-6/12">
            <h2 className="text-2xl text-blue-700 font-bold md:text-4xl">
            Welcome to Safar – Your Reliable Bus Reservation Portal
            </h2>
            <p className="mt-6 text-gray-800">
            At Safar, we are dedicated to revolutionizing the way you book your bus travel. Our mission is to provide a seamless and enjoyable booking experience that simplifies your travel planning and enhances your journey.
            </p>
            <p className="mt-4 text-gray-800">
            Founded with a vision to make bus travel as convenient as possible, Safar was created by a team of travel enthusiasts and technology experts. We recognized the need for a user-friendly platform that brings together comprehensive travel options and intuitive features, ensuring you get the best travel experience at your fingertips
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
