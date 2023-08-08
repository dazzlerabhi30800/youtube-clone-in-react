import { configureStore, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const stateSlices = createSlice({
  name: "youtubeStates",
  initialState: {
    menu: false,
  },
  reducers: {
    showMenu: (state, action) => {
      state.menu = !state.menu;
    },
  },
});

const store = configureStore({
  reducer: {
    youtubeReducer: stateSlices.reducer,
  },
});

export const { showMenu } = stateSlices.actions;

export default store;
