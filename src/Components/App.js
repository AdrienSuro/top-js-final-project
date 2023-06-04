import React, { useState, useEffect } from "react";
import "../Stylesheets/App.scss";
import "../Stylesheets/normalize.scss";
import WriteTweet from "./WriteTweet";
import TweetList from "./TweetList";
import User from "./User";
import Login from "./Login";
import Firebase from "./Firebase";
import SideNavbar from "./SideNavbar";
import Timeline from "./Timeline";
import UserProfile from "./UserProfile";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { selectIsLoggedIn } from "./userSlice";
import { useSelector, useDispatch } from "react-redux";

const App = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);

  return (
    <div className="App">
      <Firebase />
      <BrowserRouter>
        <body>
          <div className="leftColumn">
            <SideNavbar />
          </div>
          <div className="mainColumn">
            <Routes>
              <Route exact path="/" element={<Timeline />}></Route>
              <Route
                exact
                path="/userprofile"
                element={isLoggedIn ? <UserProfile /> : <Login />}
              ></Route>
            </Routes>
          </div>
          <div className="rightColumn">
            <User />
          </div>
        </body>
      </BrowserRouter>
    </div>
  );
};

export default App;
