import { configureStore, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const stateSlices = createSlice({
  name: "youtubeStates",
  initialState: {
    menu: true,
    navbar: false,
  },
  reducers: {
    showMenu: (state, action) => {
      return {
        ...state,
        menu: !state.menu,
      };
    },
    showNavbar: (state, action) => {
      return {
        ...state,
        navbar: !state.navbar,
      };
    },
  },
});

const store = configureStore({
  reducer: {
    youtubeReducer: stateSlices.reducer,
  },
});

export const { showMenu, showNavbar } = stateSlices.actions;

export default store;
