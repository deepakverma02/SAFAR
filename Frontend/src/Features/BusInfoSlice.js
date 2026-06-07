// In your Redux slice (e.g., userSlice.js)
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    busNumber : null,
    busName : null,
    busType : null,
    busClass : null,
    busSource : null,
    busSourceTime : null,
    busDestination : null,
    busDestinationTime : null,
    foodFacility : false,
    price : null

};

const busInfoSlice = createSlice({
    name: 'businfo',
    initialState,
    reducers: {
        setBusInfo : (state, action) => {
            state.busNumber = action.payload.busNumber
            state.busName = action.payload.busName
            state.busType = action.payload.busType
            state.busClass = action.payload.busClass
            state.busSource = action.payload.busSource
            state.busSourceTime = action.payload.busSourceTime
            state.busDestination = action.payload.busDestination
            state.busDestinationTime = action.payload.busDestinationTime
            state.foodFacility = action.payload.foodFacility
            state.price = action.payload.price

           
        },
    },
});

export const { setBusInfo } = busInfoSlice.actions;
export default busInfoSlice.reducer;
