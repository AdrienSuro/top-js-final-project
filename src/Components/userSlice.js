import { createSlice } from "@reduxjs/toolkit";
import imageIcon from "../icons/image-icon.png";

const initialState = {
  isLoggedIn: false,
  userId: null,
  userDisplayName: null,
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
  },
});

export const { toggleIsLoggedIn, setUserId, setUserDisplayName } =
  userSlice.actions;

export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectUserId = (state) => state.user.userId;
export const selectUserDisplayName = (state) => state.user.userDisplayName;
export default userSlice.reducer;
