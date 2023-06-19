import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { auth, signIn, signOutUser, db } from "./Firebase.js";
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
      dispatch(toggleIsLoggedIn(true));
      dispatch(setUserId(user.uid));
      console.log(user.displayName);
      let userExists = checkExistingUser(user.uid);
      if (userExists === false) {
        setNewUser(user);
      } else if (userExists === true) {
      }
      // ...check if user.uid already refers to a user.
    } else {
      dispatch(toggleIsLoggedIn(false));
      dispatch(setUserId(null));
    }
  });

  async function checkExistingUser(id) {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      //   console.log(doc.id, " => ", doc.data());
      if (doc.id === id) {
        return true;
      }
    });
  }

  function setNewUser(user) {
    console.log("I will soon create a new profile for " + user.uid);
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
