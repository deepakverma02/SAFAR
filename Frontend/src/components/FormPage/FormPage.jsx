import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TopBar from "../SearchBus/BusTopbar";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setPassengers } from "../../Features/PassengersSlice";

const PassengerDetailsForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize dispatch

  const Source = useSelector((state) => state.filter.source);
  const Destination = useSelector((state) => state.filter.destination);
  const Date = useSelector((state) => state.filter.date);
  const selectedTotalPrice = useSelector(
    (state) => state.seatNumPrice.totalPrice
  );
  const selectedPrice = useSelector((state) => state.businfo.price);

  const { selectedSeats } = location.state || {};

  if (!selectedSeats || selectedSeats.length === 0) {
    return <p>No seats selected. Please go back and select seats.</p>;
  }
  //kjhkhjkhk
  // Initialize state with each passenger getting a seat number from selectedSeats
  const [passengerDetails, setPassengerDetails] = useState(
    selectedSeats.map((seatNum) => ({
      name: "",
      age: "",
      gender: "",
      mobile: "",
      address: "",
      price: selectedPrice,
      seatNum: seatNum, // Assign seatNum from selectedSeats
      errors: {
        name: "",
        age: "",
        gender: "",
        mobile: "",
        address: "",
      },
    }))
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (index, field, value) => {
    const updatedDetails = [...passengerDetails];
    updatedDetails[index][field] = value;
    updatedDetails[index].errors = validateField(
      field,
      value,
      updatedDetails[index].errors
    );
    setPassengerDetails(updatedDetails);
  };

  const validateField = (field, value, errors) => {
    switch (field) {
      case "name":
        errors.name =
          value.length < 3
            ? "Full name must be at least 3 characters"
            : !/^[A-Za-z\s]+$/.test(value)
            ? "Name must contain only alphabets"
            : "";
        break;
      case "age":
        errors.age =
          isNaN(value) || value < 1
            ? "Age must be a valid number between 1 and 120"
            : "";
        break;
      case "gender":
        errors.gender =
          value === ""
            ? "Gender is required"
            : !["male", "female", "other"].includes(value.toLowerCase())
            ? "Gender must be either Male, Female, or Other"
            : "";
        break;
      case "mobile":
        errors.mobile = !/^[1-9]\d{9}$/.test(value)
          ? "Mobile number must be a valid 10-digit number without leading zeros"
          : "";
        break;
      case "address":
        errors.address =
          value.length < 10 ? "Address must be at least 10 characters" : "";
        break;
      default:
        break;
    }
    return errors;
  };

  const scrollToError = () => {
    const firstErrorField = document.querySelector(".error");
    if (firstErrorField) {
      firstErrorField.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let isValid = true;
    const updatedDetails = [...passengerDetails];

    updatedDetails.forEach((passenger, index) => {
      const { name, age, gender, mobile, address, errors } = passenger;

      updatedDetails[index].errors = {
        ...validateField("name", name, errors),
        ...validateField("age", age, errors),
        ...validateField("gender", gender, errors),
        ...validateField("mobile", mobile, errors),
        ...validateField("address", address, errors),
      };

      if (
        updatedDetails[index].errors.name ||
        updatedDetails[index].errors.age ||
        updatedDetails[index].errors.gender ||
        updatedDetails[index].errors.mobile ||
        updatedDetails[index].errors.address
      ) {
        isValid = false;
      }

      if (passengerDetails.age <= 0) {
        alert("Please enter the valid age !");
      }
    });

    setPassengerDetails(updatedDetails);

    if (!isValid) {
      scrollToError();
      return;
    }

    setIsSubmitting(true);
    // This is simple timeout function
    setTimeout(() => {
      alert("Details submitted successfully!");

      dispatch(setPassengers(passengerDetails));

      console.log(passengerDetails); // You can now see seatNum for each passenger here
      console.log(selectedTotalPrice);
      setIsSubmitting(false);

      navigate("/searchBus/viewSeats/Form/payment", {
        state: { passengerDetails },
      });
    }, 2000);
  };

  // it is for the validating the function

  const isFormValid = () => {
    return passengerDetails.every((passenger) => {
      return Object.values(passenger.errors).every((error) => !error);
    });
  };

  const renderInputField = (
    type,
    index,
    field,
    placeholder,
    sizeClass = "w-full"
  ) => (
    <input
      type={type}
      placeholder={placeholder}
      value={passengerDetails[index][field]}
      onChange={(e) => handleChange(index, field, e.target.value)}
      className={`block ${sizeClass} mb-2 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm ${
        passengerDetails[index].errors[field]
          ? "border-red-500 error ring-red-500"
          : "border-gray-300"
      } transition-all duration-300 bg-gray-50`}
      required
    />
  );

  const renderProgressBar = () => {
    const completed =
      (selectedSeats.length -
        passengerDetails.filter((pd) => pd.name === "").length) /
      selectedSeats.length;
    return (
      <div className="relative w-full h-2 mb-4 bg-gray-200 rounded-full">
        <div
          className="absolute top-0 left-0 h-full bg-indigo-600 rounded-full transition-all duration-500"
          style={{ width: `${completed * 100}%` }}
        ></div>
      </div>
    );
  };

  return (
    <div className="p-8 bg-gradient-to-r from-gray-100 to-blue-50 min-h-screen">
      <TopBar
        source={Source}
        destination={Destination}
        date={Date}
        seats={selectedSeats}
      />
      <h2 className="text-3xl font-bold text-indigo-700 mb-8 mt-32 text-center">
        Passenger Details
      </h2>

      {renderProgressBar()}

      <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto">
        {selectedSeats.map((seat, index) => (
          <div
            key={seat}
            className="p-6 bg-purple-200 rounded-lg shadow-md border border-gray-300 transition-all duration-300"
          >
            <h3 className="text-2xl font-bold text-blue-800 mb-4">
              Passenger {index + 1} (Seat {seat}):
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {renderInputField("text", index, "name", "Full Name")}
              {passengerDetails[index].errors.name && (
                <p className="text-red-500">
                  {passengerDetails[index].errors.name}
                </p>
              )}

              <div className="grid grid-cols-2 gap-4">
                {renderInputField("number", index, "age", "Age", "w-full")}
                <select
                  value={passengerDetails[index].gender}
                  onChange={(e) =>
                    handleChange(index, "gender", e.target.value)
                  }
                  className="block w-full p-2 rounded-lg border-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 bg-gray-50"
                  required
                >
                  <option value="">Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {passengerDetails[index].errors.gender && (
                  <p className="text-red-500">
                    {passengerDetails[index].errors.gender}
                  </p>
                )}
              </div>

              {renderInputField(
                "tel",
                index,
                "mobile",
                "Mobile Number",
                "w-full"
              )}
              {passengerDetails[index].errors.mobile && (
                <p className="text-red-500">
                  {passengerDetails[index].errors.mobile}
                </p>
              )}

              {renderInputField("text", index, "address", "Address")}
              {passengerDetails[index].errors.address && (
                <p className="text-red-500">
                  {passengerDetails[index].errors.address}
                </p>
              )}
            </div>
          </div>
        ))}

        <button
          type="submit"
          className="bg-indigo-500 text-white px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-transform transform-gpu hover:scale-105 hover:bg-indigo-600 hover:animate-pulse focus:outline-none focus:ring-2 focus:ring-indigo-500 duration-300 flex items-center justify-center"
          disabled={!isFormValid() || isSubmitting}
        >
          {isSubmitting ? (
            <>
              <AiOutlineLoading3Quarters className="animate-spin mr-2" />
              Submitting...
            </>
          ) : (
            "Submit Details"
          )}
        </button>
      </form>
    </div>
  );
};

export default PassengerDetailsForm;
