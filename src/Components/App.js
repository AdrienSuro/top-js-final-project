import React, { useState, useEffect } from "react";
import "../Stylesheets/App.scss";
import "../Stylesheets/normalize.scss";
import WriteTweet from "./WriteTweet";
import TweetList from "./TweetList";
import CreateAccount from "./CreateAccount";
import User from "./User";
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
      {/* <Firebase /> */}
      <BrowserRouter>
        <div className="body">
          <div className="leftColumn">
            <Routes>
              <Route exact path="/" element={<SideNavbar />}></Route>
              <Route exact path="/:username" element={<User />}></Route>
              <Route exact path="/createaccount"></Route>
            </Routes>
          </div>
          <div className="mainColumn">
            <Routes>
              <Route exact path="/" element={<Timeline />}></Route>
              <Route exact path="/:username" element={<UserProfile />}></Route>
              <Route
                exact
                path="/createaccount"
                element={<CreateAccount />}
              ></Route>
            </Routes>
          </div>
          <div className="rightColumn">
            <Routes>
              <Route exact path="/createaccount"></Route>
              <Route exact path="/" element={<User />}></Route>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
