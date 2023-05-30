import React, { useState, useEffect } from "react";
import "../Stylesheets/App.scss";
import "../Stylesheets/normalize.scss";
import WriteTweet from "./WriteTweet";
import TweetList from "./TweetList";
import User from "./User";

const App = () => {
  return (
    <div className="App">
      <body>
        <div className="leftColumn">
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
