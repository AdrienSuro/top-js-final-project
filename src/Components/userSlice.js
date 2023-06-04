import { createSlice } from "@reduxjs/toolkit";
import imageIcon from "../icons/image-icon.png";

const initialState = {
  isLoggedIn: false,
  displayName: "random user",
  userName: null,
  profilePic: imageIcon,
  description: "I'm a random user",
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
    setDisplayName: (state, action) => {
      state.displayName = action.payload;
    },
    setUserName: (state, action) => {
      state.userName = action.payload;
    },
    setDescription: (state) => {
      console.log("prompting for a new description");
      const newDescription = prompt("Enter your new description here");
      state.description = newDescription;
    },
  },
});

export const { toggleIsLoggedIn, setDisplayName, setUserName, setDescription } =
  userSlice.actions;

export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectDisplayName = (state) => state.user.displayName;
export const selectUserName = (state) => state.user.userName;
export const selectDescription = (state) => state.user.description;
export const selectFollowers = (state) => state.user.followers;
export const selectFollowing = (state) => state.user.following;

export default userSlice.reducer;
