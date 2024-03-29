import React, { useState, useEffect } from "react";
import "../Stylesheets/App.scss";
import "../Stylesheets/normalize.scss";

import CreateAccountWithGoogle from "./CreateAccountWithGoogle";
import CreateAccountWithEmail from "./CreateAccountWithEmail";
import User from "./UserLogin";
import SideNavbar from "./SideNavbar";
import Timeline from "./Timeline";
import UserProfile from "./UserProfile";
import LoginPage from "./LoginPage";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { selectIsLoggedIn } from "../redux/userSlice";
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
              <Route exact path="/createaccount"></Route>
            </Routes>
          </div>
          <div className="mainColumn">
            <Routes>
              <Route exact path="/" element={<Timeline />}></Route>
              <Route exact path="/:username" element={<UserProfile />}></Route>
              <Route
                exact
                path="/createaccountwithgoogle"
                element={<CreateAccountWithGoogle />}
              ></Route>
              <Route
                exact
                path="/createaccountwithemail"
                element={<CreateAccountWithEmail />}
              ></Route>
              <Route exact path="/login" element={<LoginPage />}></Route>
            </Routes>
          </div>
          <div className="rightColumn">
            <Routes>
              <Route exact path="/createaccount" element={<User />}></Route>
              <Route exact path="/" element={<User />}></Route>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
