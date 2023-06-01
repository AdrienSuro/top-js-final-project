import React, { useState, useEffect } from "react";
import "../Stylesheets/App.scss";
import "../Stylesheets/normalize.scss";
import WriteTweet from "./WriteTweet";
import TweetList from "./TweetList";
import User from "./User";
import Firebase from "./Firebase";
import SideNavbar from "./SideNavbar";
import Timeline from "./Timeline";
import UserProfile from "./UserProfile";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <Firebase />
      <body>
        <div className="leftColumn">
          <User />
          <SideNavbar />
        </div>
        <div className="mainColumn">
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element={<Timeline />}></Route>
              <Route
                exact
                path="/userprofile"
                element={<UserProfile />}
              ></Route>
            </Routes>
          </BrowserRouter>
        </div>
        <div className="rightColumn"></div>
      </body>
    </div>
  );
};

export default App;
