import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Features/Slice";
import filterReducer from "../Features/FilterSlice";
import ticketReducer from "../Features/FilterSlice"
import BusInfoReducer from "../Features/BusInfoSlice";
import passengersReducer from "../Features/PassengersSlice";
import paymentModeReducer from '../Features/PaymentModeSlice';
import seatNumPriceReducer from '../Features/SeatNumPriceSlice'

export default configureStore({
    reducer : {
        user : userReducer,
        filter : filterReducer,
       businfo : BusInfoReducer ,
        ticket : ticketReducer,
        passengers : passengersReducer,
        paymentMode : paymentModeReducer,
        seatNumPrice : seatNumPriceReducer,
    }
})