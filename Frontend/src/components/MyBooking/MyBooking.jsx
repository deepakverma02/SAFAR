    import React, { useState, useEffect, useRef } from 'react';
    import axios from 'axios';
    import { FaBusAlt, FaUser, FaCalendarAlt, FaMapMarkerAlt } from 'react-icons/fa';


    export default function MyBooking() {
        const [bookings, setBookings] = useState([]);
        const [errorMessage, setErrorMessage] = useState('');
        const [reviews, setReviews] = useState({});
        const [showAlert, setShowAlert] = useState(null);
        const [showConfirm, setShowConfirm] = useState(null);
        const userid = localStorage.getItem("ID");
        const username = localStorage.getItem("username");
        const bookingRefs = useRef([]);

        useEffect(() => {
            const fetchBookings = async () => {
                try {
                    const response = await axios.post('https://safar-bus-booking-system.onrender.com/myBooking', { userid: userid });
                    const fetchedBookings = response.data;

                    // Automatically delete bookings without passengers
                    for (const booking of fetchedBookings) {
                        if (!booking.PassangerDetails || booking.PassangerDetails.length === 0) {
                            await handleDeleteEmptyBooking(booking._id);
                        }
                    }

                    // Refetch bookings after potentially deleting empty ones
                    const updatedResponse = await axios.post('https://safar-bus-booking-system.onrender.com/myBooking', { userid: userid });
                    setBookings(updatedResponse.data);
                } catch (error) {
                    console.error('Error fetching bookings:', error);
                    setErrorMessage('Failed to load bookings. Please try again.');
                }
            };

            fetchBookings();
        }, [userid]);

        const handleDeleteEmptyBooking = async (bookingId) => {
            try {
                await axios.post("https://safar-bus-booking-system.onrender.com/deleteAllticket", { "userid": bookingId });
                console.log(`Deleted booking with ID ${bookingId} because it had no passengers.`);
            } catch (error) {
                console.error(`Failed to delete empty booking with ID ${bookingId}:`, error);
            }
        };

        const handleCancelPassenger = async (bookingId, passengerId) => {
            setShowConfirm({
                message: "Do you want to cancel this ticket?",
                onConfirm: async () => {
                    try {
                        await axios.post("https://safar-bus-booking-system.onrender.com/deletemybooking", {
                            "_id": passengerId,
                            "bookingid": bookingId
                        });

                        setShowAlert("Your refund will be settled in your account shortly.");

                        // Refetch the bookings to update the UI
                        const response = await axios.post('https://safar-bus-booking-system.onrender.com/myBooking', { userid: userid });
                        setBookings(response.data);
                        window.location.reload();
                    } catch (error) {
                        console.error('Error canceling passenger:', error);
                        setErrorMessage('Failed to cancel the passenger. Please try again.');
                    }
                },
                onCancel: () => setShowConfirm(null)
            });
        };

        const handleCancelAllPassengers = async (bookingId) => {
            setShowConfirm({
                message: "Do you want to cancel all tickets in this booking?",
                onConfirm: async () => {
                    try {
                        // Call API to cancel all passengers for this booking
                        await axios.post("https://safar-bus-booking-system.onrender.com/deleteAllticket", { "userid": bookingId });

                        setShowAlert("All tickets under this booking have been canceled.");

                        // Refetch the bookings to update the UI
                        const response = await axios.post('https://safar-bus-booking-system.onrender.com/myBooking', { userid: userid });
                        setBookings(response.data);
                    } catch (error) {
                        console.error('Error canceling all passengers:', error);
                        setErrorMessage('Failed to cancel all tickets. Please try again.');
                    }
                },
                onCancel: () => setShowConfirm(null)
            });
        };

        function CustomAlert({ message, onClose }) {
            return (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">{message}</h3>
                        <button 
                            onClick={onClose} 
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
                        >
                            OK
                        </button>
                    </div>
                </div>
            );
        }


        function CustomConfirm({ message, onConfirm, onCancel }) {
            return (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">{message}</h3>
                        <div className="flex justify-end space-x-4">
                            <button 
                                onClick={() => {
                                    onConfirm(); // Make sure this is called
                                    onCancel(); // Optionally close the dialog after confirmation
                                }}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
                            >
                                Confirm
                            </button>
                            <button 
                                onClick={onCancel} 
                                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            );
        }
        
        const handlePrint = (index) => {
            const booking = bookings[index];
            const printWindow = window.open('', '', 'width=800,height=600');

            printWindow.document.write(`
                <html>
                <head>
                    <title>Ticket</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            margin: 0;
                            padding: 0;
                            background-color: #f4f4f4;
                        }
                        .ticket {
                            max-width: 600px;
                            margin: auto;
                            padding: 20px;
                            background-color: #fff;
                            border: 1px solid #ddd;
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        }
                        .header {
                            text-align: center;
                            margin-bottom: 20px;
                            border-bottom: 2px solid #007BFF;
                            padding-bottom: 10px;
                        }
                        .header h1 {
                            margin: 0;
                            font-size: 24px;
                            color: #007BFF;
                        }
                        .header p {
                            margin: 5px 0;
                            font-size: 14px;
                            color: #555;
                        }
                        .details {
                            margin-bottom: 20px;
                        }
                        .details table {
                            width: 100%;
                            border-collapse: collapse;
                        }
                        .details td, .details th {
                            padding: 10px;
                            border: 1px solid #ddd;
                        }
                        .details th {
                            background-color: #f4f4f4;
                            color: #333;
                        }
                        .passengers {
                            margin-bottom: 20px;
                        }
                        .passengers table {
                            width: 100%;
                            border-collapse: collapse;
                        }
                        .passengers td, .passengers th {
                            padding: 10px;
                            border: 1px solid #ddd;
                        }
                        .passengers th {
                            background-color: #f4f4f4;
                            color: #333;
                        }
                        .footer {
                            text-align: center;
                            margin-top: 20px;
                        }
                        .footer p {
                            margin: 0;
                            font-size: 12px;
                            color: #777;
                        }
                    </style>
                </head>
                <body>
                    <div class="ticket">
                        <div class="header">
                            <h1>Bus Ticket</h1>
                            <p>PNR Number: ${booking._id}</p>
                            <p>Date: ${new Date(booking.Date).toLocaleDateString()}</p>
                        </div>
                        <div class="details">
                            <table>
                                <tr>
                                    <th>Bus Name</th>
                                    <th>Bus Number</th>
                                    <th>Source</th>
                                    <th>Destination</th>
                                    <th>Departure Time</th>
                                    <th>Total Price</th>
                                </tr>
                                <tr>
                                    <td>${booking.BusName}</td>
                                    <td>${booking.BusNumber}</td>
                                    <td>${booking.Source}</td>
                                    <td>${booking.Destination}</td>
                                    <td>${booking.SourceTiming}</td>
                                    <td>${booking.totalPrice +"/-"}</td>
                                </tr>
                            </table>
                        </div>
                        <div class="passengers">
                            <h2>Passenger Details</h2>
                            <table>
                                <tr>
                                    <th>Name</th>
                                    <th>Seat No</th>
                                    <th>Age</th>
                                    <th>Gender</th>
                                    <th>Contact</th>
                                    <th>price</th>
                                </tr>
                                ${booking.PassangerDetails.map(passenger => `
                                    <tr>
                                        <td>${passenger.Fullname}</td>
                                        <td>${passenger.SeatNo}</td>
                                        <td>${passenger.Age}</td>
                                        <td>${passenger.Gender}</td>
                                        <td>${passenger.MobileNumber || 'N/A'}</td>
                                        <td>${passenger.TicketPrice +"/-"}</td>
                                    </tr>
                                `).join('')}
                            </table>
                        </div>
                        <div class="footer">
                            <p>Thank you for booking with us! Have a safe journey.</p>
                        </div>
                    </div>
                </body>
                </html>
            `);

            printWindow.document.close();
            printWindow.focus();
            printWindow.print();
            printWindow.close();
        };

        const isExpired = (date) => {
            return new Date(date) < new Date();
        };

        const handleReviewChange = (bookingId, reviewText) => {
            setReviews(prevReviews => ({
                ...prevReviews,
                [bookingId]: reviewText
            }));
        };

        const handleSubmitReview = async (bookingId) => {
            try {
                await axios.post("https://safar-bus-booking-system.onrender.com/review", { name: username, review: reviews[bookingId] });
                setShowAlert("Thank you for your review!");
            } catch (error) {
                console.error('Error submitting review:', error);
                setErrorMessage('Failed to submit review. Please try again.');
            }
        };

        return (
            <div className="min-h-screen bg-gray-100 py-10">
                <div className="max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-lg">
                    <h1 className="text-4xl text-blue-900 font-extrabold text-center mb-10">
                        My Bookings
                    </h1>

                    {errorMessage && (
                        <div className="mb-4 p-4 bg-red-100 border border-red-500 rounded-lg text-red-700 text-center">
                            {errorMessage}
                        </div>
                    )}

                    {showAlert && (
                        <CustomAlert 
                            message={showAlert} 
                            onClose={() => setShowAlert(null)} 
                        />
                    )}

                    {showConfirm && (
                        <CustomConfirm 
                            message={showConfirm.message}
                            onConfirm={showConfirm.onConfirm}
                            onCancel={showConfirm.onCancel}
                        />
                    )}

                    {Array.isArray(bookings) && bookings.length > 0 ? (
                        bookings.map((booking, index) => (
                            <div
                                key={index}
                                ref={el => bookingRefs.current[index] = el}
                                className="mb-8 bg-white border border-gray-300 p-6 rounded-lg shadow-md"
                            >
                                <div className="flex justify-between items-center mb-4">
                                    <h2 className="text-2xl font-semibold text-gray-800">
                                        <FaBusAlt className="inline mr-2 text-blue-600" /> Booking ID: {booking._id}
                                    </h2>
                                    <h3 className="text-lg font-medium text-gray-700">
                                        <FaCalendarAlt className="inline mr-2 text-blue-600" />
                                        {new Date(booking.Date).toLocaleDateString()}
                                    </h3>
                                </div>
                                <h4 className="text-lg font-medium text-gray-700 mb-4">
                                    <FaMapMarkerAlt className="inline mr-2 text-blue-500" />
                                    {booking.Source} to {booking.Destination} | Bus: {booking.BusName}
                                </h4>
                                <h3 className="text-lg font-medium text-gray-700 mb-4">
                                    
                                   Total Price : {booking.totalPrice}
                                </h3>
                                <ul className="mb-4 space-y-4">
                                    {booking.PassangerDetails.map((passenger, passengerIndex) => (
                                        <li key={passengerIndex} className="flex justify-between items-center p-4 bg-white rounded-lg shadow-sm border border-gray-300">
                                            <div>
                                                <p className="text-lg font-medium text-gray-900">
                                                    <FaUser className="inline mr-2 text-green-500" /> {passenger.Fullname}
                                                </p>
                                                <p className="text-sm text-gray-700">Seat No: {passenger.SeatNo}</p>
                                            </div>
                                            <div>
                                                {isExpired(booking.Date) ? (
                                                    <button
                                                        onClick={() => handleCancelPassenger(booking._id, passenger._id)}
                                                        className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow cursor-not-allowed"
                                                        disabled
                                                    >
                                                        Cancel Ticket
                                                    </button>
                                                ) : (
                                                    <button
                                                        onClick={() => handleCancelPassenger(booking._id, passenger._id)}
                                                        className="px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 focus:outline-none"
                                                    >
                                                        Cancel Ticket
                                                    </button>
                                                )}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                                {isExpired(booking.Date) && (
                                    <div className="mb-4 p-4">
                                        This booking has expired. Please provide your review.
                                        <textarea
                                            className="mt-2 p-2 w-full border border-gray-300 rounded-lg"
                                            placeholder="Write your review here..."
                                            value={reviews[booking._id] || ''}
                                            onChange={(e) => handleReviewChange(booking._id, e.target.value)}
                                        />
                                        <button
                                            onClick={() => handleSubmitReview(booking._id)}
                                            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none"
                                        >
                                            Submit Review
                                        </button>
                                    </div>
                                )}
                                <div className="flex justify-between items-center">
                                    <button
                                        onClick={() => handlePrint(index)}
                                        className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 focus:outline-none"
                                    >
                                        Print Ticket
                                    </button>
                                    <button
                                        onClick={() => handleCancelAllPassengers(booking._id)}
                                        className={`px-4 py-2 rounded-lg shadow ${
                                            isExpired(booking.Date) ? 'bg-gray-500 text-white cursor-not-allowed' : 'bg-red-500 text-white hover:bg-red-600'
                                        }`}
                                        disabled={isExpired(booking.Date)}
                                    >
                                        Cancel All Tickets
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center text-gray-700 font-medium">
                            No bookings found.
                        </div>
                    )}
                </div>
            </div>
        );
    }
