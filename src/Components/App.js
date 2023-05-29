import React, { useState, useEffect } from "react";
import "../Stylesheets/App.scss";
import "../Stylesheets/normalize.scss";
import WriteTweet from "./WriteTweet";
import TweetList from "./TweetList";
import Counter from "./Counter";
import User from "./User";
import { getUserName, getProfilePicUrl, signIn, signOutUser } from "./Firebase";

const App = () => {
  const [userName, setUserName] = useState("");
  const [userSignedIn, setUserSignedIn] = useState(false);

  return (
    <div className="App">
      <body>
        <div className="leftColumn">
          <button onClick={signIn}>SIGN IN</button>
          <button onClick={signOutUser}>SIGN OUT</button>
          <h2>My Name is {getUserName()}</h2>
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
