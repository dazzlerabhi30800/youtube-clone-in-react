import { configureStore, createSlice } from "@reduxjs/toolkit";

const stateSlices = createSlice({
  name: "youtubeStates",
  initialState: {
    menu: false,
    navbar: false,
    searchResults: null,
    inputQuery: "",
    homeResults: [],
    category: "New",
  },
  reducers: {
    showMenu: (state, action) => {
      return {
        ...state,
        menu: !state.menu,
      };
    },
    setMenu: (state, action) => {
      return {
        ...state,
        menu: action.payload,
      };
    },
    showNavbar: (state, action) => {
      return {
        ...state,
        navbar: !state.navbar,
      };
    },
    setSearchResults: (state, action) => {
      return {
        ...state,
        searchResults: action.payload,
      };
    },
    setInputQuery: (state, action) => {
      return {
        ...state,
        inputQuery: action.payload,
      };
    },
    setHomeResults: (state, action) => {
      return {
        ...state,
        homeResults: action.payload,
      };
    },
    setCategory: (state, action) => {
      return {
        ...state,
        category: action.payload,
      };
    },
  },
});

const store = configureStore({
  reducer: {
    youtubeReducer: stateSlices.reducer,
  },
});

export const {
  showMenu,
  setMenu,
  showNavbar,
  setSearchResults,
  setInputQuery,
  setHomeResults,
  setPage,
  setCategory,
} = stateSlices.actions;

export default store;
