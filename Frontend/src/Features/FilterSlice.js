// In your Redux slice (e.g., userSlice.js)
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    source : null,
    destination : null,
    date : null
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setFilter : (state, action) => {
            state.source = action.payload.source
            state.destination = action.payload.destination
            state.date = action.payload.date
        },

        removeFilter : (state) => {
            state.source = null
            state.destination = null
            state.date = null
        },
    },
});

export const { setFilter, removeFilter } = filterSlice.actions;
export default filterSlice.reducer;
