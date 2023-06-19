import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { auth, signIn, signOutUser, myFunc } from "./Firebase.js";
import { onAuthStateChanged } from "firebase/auth";

import {
  getFirestore,
  query,
  collection,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";

import {
  selectIsLoggedIn,
  selectUserId,
  toggleIsLoggedIn,
  setUserId,
} from "./userSlice.js";

export default function User() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const displayUserId = useSelector(selectUserId);
  const dispatch = useDispatch();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      console.log(new Date() + " " + user.uid);
      dispatch(toggleIsLoggedIn(true));
      dispatch(setUserId(user.uid));
      console.log(isLoggedIn);
      // ...
    } else {
      console.log(new Date() + "no user logged in");
      dispatch(toggleIsLoggedIn(false));
      dispatch(setUserId(null));
    }
  });

  function onSignIn() {
    signIn().then((result) => {
      dispatch(toggleIsLoggedIn(true));
      console.log(result.user);
    });
  }

  return (
    <div>
      <Link className="homeLink" to="/Charles_0001">
        <img id="userSmallProfilePic" src="" alt="userProfilePicture"></img>
      </Link>
      <p>User ID : {displayUserId}</p>
      <button onClick={signIn}>Sign In</button>
      <button onClick={signOutUser}>Sign Out</button>
      <button>Check Username</button>
      <button>displayName from Redux</button>
      <p>{isLoggedIn ? "signed in" : "signed out"}</p>
    </div>
  );
}
