// store/passengerSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  paymentMode : null
};

const paymentModeSlice = createSlice({
  name: 'paymentMode',
  initialState,
  reducers: {
    setPaymentMode : (state, action) => {
      state.paymentMode = action.payload;
    },
  },
});

export const { setPaymentMode } = paymentModeSlice.actions;
export default paymentModeSlice.reducer;
