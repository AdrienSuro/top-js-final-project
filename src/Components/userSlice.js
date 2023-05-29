import { createSlice } from "@reduxjs/toolkit";
import imageIcon from "../icons/image-icon.png";

const initialState = {
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
  },
});

export const { incrementAge, addTweet } = userSlice.actions;

export const selectTweets = (state) => state.user.tweets;

export default userSlice.reducer;
