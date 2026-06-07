import React from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

function TicketDetails() {
  const token = localStorage.getItem("token");
  const api = axios.create({
    baseURL: 'https://safar-bus-booking-system.onrender.com',
    headers: { 'x-access-token': token }
  });

  const pnr = localStorage.getItem('pnr');
  const userName = localStorage.getItem('username');
  const userId = localStorage.getItem('ID');
  const passengers = useSelector((state) => state.passengers.passengers);
  const busNumber = useSelector((state) => state.businfo.busNumber);
  const busName = useSelector((state) => state.businfo.busName);
  const busType = useSelector((state) => state.businfo.busType);
  const busClass = useSelector((state) => state.businfo.busClass);
  const busSouceTime = useSelector((state) => state.businfo.busSourceTime);
  const busDestination = useSelector((state) => state.businfo.busDestination);
  const busDestinationTime = useSelector((state) => state.businfo.busDestinationTime);
  const foodFacility = useSelector((state) => state.businfo.foodFacility);
  const source = useSelector((state) => state.filter.source);
  // const destination = useSelector((state) => state.filter.destination);
  const date = useSelector((state) => state.filter.date);
  const totalPrice = useSelector((state) => state.seatNumPrice.totalPrice);
  const paymentMode = useSelector((state) => state.paymentMode.paymentMode);
  const ticket = useSelector((state) => state.businfo.price)
  // Map passenger details to match your schema
  const mappedPassengers = passengers.map((passenger) => ({
    Fullname: passenger.name,
    Age: passenger.age,
    Gender: passenger.gender,
    MobileNumber: passenger.mobile,
    Address: passenger.address,
    SeatNo: passenger.seatNum,
    TicketPrice: ticket // Assuming ticket price is shared among passengers
  }));

  // console.log(mappedPassengers)
  const fetchBusData = async () => {
    try {
      const response = await api.post('/bookticket', {
        userid: userId,
        userName: userName,
        BusNumber: busNumber,
        BusName: busName,
        totalPrice: totalPrice,
        Bus_Type: busType,
        Bus_class: busClass,
        SourceTiming: busSouceTime,
        DestinationTiming: busDestinationTime,
        FoodFacility: foodFacility,
        Source: source,
        Destination: busDestination,
        Date: date,
        PnrNumber: pnr,
        PaymentType: paymentMode,
        PassangerDetails: mappedPassengers // Send correctly formatted passenger details
      });
      // console.log('Response:', response.data);


      // For sending the gmail purpose 


      const text = `
Dear ${userName},

We are pleased to inform you that your ticket has been successfully booked. Below are your booking details:

PNR Number: ${pnr}

You can print your ticket by visiting our website or presenting your PNR number at the booking counter.

If you have any further questions or need assistance, feel free to contact our support team.

Thank you for choosing our service!

Best regards,
Safar Customer Support Team
`;
const subject=`Your Ticket Booking Confirmation - PNR Number ${pnr}`
const gmail = localStorage.getItem('Gmail');


      await axios.post('https://safar-bus-booking-system.onrender.com/sendGmail', {
      text: text,
      gmail: gmail,
      Subject: subject
      });




    } catch (error) {
      console.error('Error fetching bus data:', error.response?.data || error.message);
    }
  };

  fetchBusData();


}

export default TicketDetails;
