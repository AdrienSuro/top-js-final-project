import { createSlice } from "@reduxjs/toolkit";
import imageIcon from "../icons/image-icon.png";

const initialState = {
  isLoggedIn: false,
  name: "random user",
  userName: "username",
  profilePic: imageIcon,
  description: "I'm a random user",
  age: 18,
  tweets: ["This is my first tweet", "This is my second tweet"],
};

export const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    incrementAge: (state) => {
      console.log("incrementing age");
      state.age += 1;
    },
    addTweet: (state, action) => {
      console.log("adding tweet");
      state.tweets = [...state.tweets, action.payload];
    },
    toggleIsLoggedIn: (state) => {
      state.isLoggedIn ? (state.isLoggedIn = false) : (state.isLoggedIn = true);
    },
  },
});

export const { incrementAge, addTweet, toggleIsLoggedIn } = userSlice.actions;

export const selectTweets = (state) => state.user.tweets;
export const selectAge = (state) => state.user.age;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;

export default userSlice.reducer;
