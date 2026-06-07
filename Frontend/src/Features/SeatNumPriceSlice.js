// store/passengerSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  seatNum : [],
  totalPrice : null,
};

const seatNumPriceSlice = createSlice({
  name: 'seatNumPrice',
  initialState,
  reducers: {
    setSeatNumPrice : (state, action) => {
      state.seatNum = action.payload.seatNum;
      state.totalPrice = action.payload.totalPrice;
    },
  },
});

export const { setSeatNumPrice } = seatNumPriceSlice.actions;
export default seatNumPriceSlice.reducer;
