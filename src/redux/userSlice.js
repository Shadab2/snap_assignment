import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../firebase.util";

const initialState = {
  id: "",
  displayName: "",
  email: "",
  photoURL: "",
  isLoggedIn: false,
  mobileNo: "",
  modalOpen: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserLoginCredentials: (state, action) => {
      return {
        displayName: action.payload.displayName,
        email: action.payload.email,
        photoURL: action.payload.photoURL,
        id: action.payload.id,
        mobileNo: action.payload.mobileNo,
        modalOpen: true,
        isLoggedIn: true,
      };
    },
    setSignOut: (state) => {
      auth.signOut();
      return initialState;
    },
    setEmail: (state, action) => ({
      ...state,
      email: action.payload.email,
    }),
    setMobileNo: (state, action) => ({
      ...state,
      email: action.payload.mobileNo,
    }),
    openModal: (state) => ({
      ...state,
      modalOpen: true,
    }),
    closeModal: (state) => ({
      ...state,
      modalOpen: false,
    }),
    reset: () => initialState,
  },
});

export const {
  setUserLoginCredentials,
  setSignOut,
  setEmail,
  setMobileNo,
  reset,
  openModal,
  closeModal,
} = userSlice.actions;
//full stores state is passed in
export const selectUser = (state) => state.user;
export default userSlice.reducer;
