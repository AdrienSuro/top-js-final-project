import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { auth, signInWithGoogle, signOutUser, db } from "../api/Firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { checkExistingUser, getOwnTweets, createNewUser } from "../api/Data.js";

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
  selectUserDisplayName,
  setUserDisplayName,
} from "../redux/userSlice.js";

export default function User() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const displayUserId = useSelector(selectUserId);
  const displayUserDisplayName = useSelector(selectUserDisplayName);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      if (isLoggedIn === false) {
        dispatch(toggleIsLoggedIn(true));
        dispatch(setUserId(user.uid));
        dispatch(setUserDisplayName(user.displayName));
        let userExists = await checkExistingUser(user.uid);
        if (userExists === false) {
          // redirect to a form that creates the user in FB
          setNewUser(user);
          console.log("no such user");
        } else if (userExists === true) {
          console.log("user exists already in firebase");
        }
        console.log(userExists);
      }
      // ...check if user.uid already refers to a user.
    } else {
      dispatch(toggleIsLoggedIn(false));
      dispatch(setUserId(null));
    }
  });

  function setNewUser(user) {
    console.log("I will soon create a new profile for " + user.uid);
    navigate("/createaccount");
  }
  if (isLoggedIn) {
    return (
      <div>
        <Link className="homeLink" to="/Charles_0001">
          <img id="userSmallProfilePic" src="" alt="userProfilePicture"></img>
        </Link>
        <p>User ID : {displayUserId}</p>
        {/* <button onClick={signIn}>Sign In</button> */}
        <button onClick={signOutUser}>Sign Out</button>
        <button>Check Username</button>
        <button>displayName from Redux</button>
        <p>{isLoggedIn ? "signed in" : "signed out"}</p>
      </div>
    );
  }
  return (
    <div className="signInBox">
      <h1>New on Twitter ?</h1>
      <button onClick={signInWithGoogle}>Sign in with Google</button>
      <button>Sign in with Apple (soon)</button>
      <button
        onClick={() => {
          return;
        }}
      >
        Create an Account (work in progress)
      </button>
      <p>By setting up an account, you're accepting our Terms of Use.</p>
      <button>Login to an existing account</button>
    </div>
  );
}
