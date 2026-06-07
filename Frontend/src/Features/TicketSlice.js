// In your Redux slice (e.g., userSlice.js)
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    busNumber : null,
    busName : null,
    source : null,
    sourceTime : null,
    destination : null,
    destinationTime : null,
    busType : null,
    busClass : null,
    userName : null,
    userId : null,
    totalPrice : null,
    foodFacility : false,
    date : null,
    seatNumber : null,
    passengers : [
        {id : 1, fullName : null, age:null, gender : null, mobNumber : null, address : null, price : null},
        {id : 2, fullName : null, age:null, gender : null, mobNumber : null, address : null, price : null},
        {id : 3, fullName : null, age:null, gender : null, mobNumber : null, address : null, price : null},
        {id : 4, fullName : null, age:null, gender : null, mobNumber : null, address : null, price : null},
        {id : 5, fullName : null, age:null, gender : null, mobNumber : null, address : null, price : null}
    ]
};

const ticketSlice = createSlice({
    name: 'ticket',
    initialState,
    reducers: {
        setTicket : (state, action) => {
            state.busNumber = action.payload.busNumber
            state.busName = action.payload.busName
            state.source = action.payload.source
            state.sourceTime = action.payload.sourceTime
            state.destination = action.payload.destinationTime
            state.busType = action.payload.busType
            state.busClass = action.payload.busClass
            state.userName = action.payload.userName
            state.userId = action.payload.userId
            state.totalPrice = action.payload.totalPrice
            state.foodFacility = action.payload.foodFacility
            state.date = action.payload.date
            state.passengers = action.payload.passengers
            state.seatNumber = action.payload.seatNumber
        },

        removeTicket : (state) => {
            state.busNumber = null
            state.busName = null
            state.source = null
            state.sourceTime = null
            state.destination = null
            state.busType = null
            state.busClass = null
            state.userName = null
            state.userId = null
            state.totalPrice = null
            state.foodFacility = null
            state.date = null
            state.passengers = null
            state.seatNumber = null
        },
    },
});

export const { setTicket, removeTicket } = ticketSlice.actions;
export default ticketSlice.reducer;
