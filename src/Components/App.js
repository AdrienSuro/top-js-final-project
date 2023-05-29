import React, { useState, useEffect } from "react";
import "../Stylesheets/App.scss";
import "../Stylesheets/normalize.scss";
import WriteTweet from "./WriteTweet";
import TweetList from "./TweetList";
import User from "./User";
import { getUserName, getProfilePicUrl, signOutUser, signIn } from "./Firebase";
import { useSelector, useDispatch } from "react-redux";
import { selectName } from "./userSlice";

const App = () => {
  const name = useSelector(selectName);
  const dispatch = useDispatch();

  function signInUser() {
    signIn()
      .then((result) => {
        console.log("user signed in");
        // dispatch(setName());
      })
      .catch((error) => {
        console.log("user sign in failed");
      });
  }

  return (
    <div className="App">
      <body>
        <div className="leftColumn">
          <button onClick={signIn}>SIGN IN</button>
          <button onClick={signOutUser}>SIGN OUT</button>
          <h2>My Name is {name}</h2>
          <User />
        </div>
        <div className="mainColumn">
          <h1>Home</h1>
          <div className="chooseTimeline">
            <h3>For you</h3>
            <h3>Following</h3>
          </div>
          <WriteTweet />
          <TweetList />
        </div>
        <div className="rightColumn"></div>
      </body>
    </div>
  );
};

export default App;
