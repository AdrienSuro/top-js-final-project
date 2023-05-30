import { createSlice } from "@reduxjs/toolkit";
import imageIcon from "../icons/image-icon.png";

const initialState = {
  isLoggedIn: false,
  name: "random user",
  userName: null,
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
    toggleIsLoggedIn: (state, action) => {
      console.log(state.isLoggedIn);
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
    setName: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { incrementAge, addTweet, toggleIsLoggedIn, setName } =
  userSlice.actions;

export const selectTweets = (state) => state.user.tweets;
export const selectAge = (state) => state.user.age;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;
export const selectName = (state) => state.user.name;

export default userSlice.reducer;
