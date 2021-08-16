import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
}

const initialState = {
  value: 0,
} as CounterState;

export const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    decrement: (state, action: PayloadAction<number>) => {
      state.value -= action.payload;
    },
    pow: (state, action: PayloadAction<number>) => {
      state.value = Math.pow(state.value, action.payload);
    },
    powSelf: (state) => {
      state.value = Math.pow(state.value, state.value);
    },
    divide: (state, action: PayloadAction<number>) => {
      state.value = state.value / action.payload;
    },
    sqrt: (state) => {
      state.value = Math.sqrt(state.value);
    },
  },
});

export const { increment, decrement, pow, powSelf, divide, sqrt } =
  counterSlice.actions;

export const counterReducer = counterSlice.reducer;
