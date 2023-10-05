import { createSlice } from "@reduxjs/toolkit";
import imageIcon from "../icons/image-icon.png";

const initialState = {
  isLoggedIn: false,
  userId: null,
  userDisplayName: null,
  loginType: null,
  currentUserObject: {
    description: "test description",
    displayName: "test Display Name",
    location: "test location",
    timestamp: "test timestamp",
    userName: "test userName",
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    toggleIsLoggedIn: (state, action) => {
      if (action.payload === true) {
        state.isLoggedIn = true;
        return;
      } else if (action.payload === false) {
        state.isLoggedIn = false;
        return;
      } else {
        throw new Error("isLoggedIn is invalid");
      }
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
    setUserDisplayName: (state, action) => {
      state.userDisplayName = action.payload;
    },
    setLoginType: (state, action) => {
      state.loginType = action.payload;
    },
    setCurrentUserObject: (state, action) => {
      state.currentUserObject.description = action.payload.description;
    },
  },
});

export const {
  toggleIsLoggedIn,
  setUserId,
  setUserDisplayName,
  setLoginType,
  setCurrentUserObject,
} = userSlice.actions;

export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectUserId = (state) => state.user.userId;
export const selectUserDisplayName = (state) => state.user.userDisplayName;
export const selectLoginType = (state) => state.user.loginType;
export const selectCurrentUserObject = (state) => state.user.currentUserObject;
export default userSlice.reducer;
