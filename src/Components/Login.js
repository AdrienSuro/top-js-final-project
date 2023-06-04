import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { auth, signIn, signOutUser, myFunc } from "./Firebase.js";

import { toggleIsLoggedIn, setDisplayName, setUserName } from "./userSlice.js";

export default function Login() {
  const dispatch = useDispatch();

  async function signInUser() {
    signIn()
      .then((result) => {
        console.log("user signed in");
        const user = result.user;
        dispatch(setDisplayName(user.displayName));
        console.log(user);
        dispatch(setUserName(user.uid));
        dispatch(toggleIsLoggedIn(true));
      })
      .catch((error) => {
        console.log("user sign in failed");
      });
  }

  return (
    <div>
      <p>
        If you want to try my Twitter Mock-up, please login using your Google
        Account
      </p>
      <button
        onClick={() => {
          signInUser();
        }}
      >
        LOGIN WITH GOOGLE
      </button>
    </div>
  );
}
