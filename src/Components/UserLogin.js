import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  auth,
  signUpWithGoogle,
  signOutUser,
  createUserWithEmail,
} from "../api/Firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { checkExistingUser, getOwnTweets, createNewUser } from "../api/Data.js";

import {
  selectIsLoggedIn,
  selectUserId,
  toggleIsLoggedIn,
  setUserId,
  setUserDisplayName,
  setLoginType,
} from "../redux/userSlice.js";

export default function User() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const displayUserId = useSelector(selectUserId);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function signUpWithGoogleAndDispatch() {
    signUpWithGoogle();
    dispatch(setLoginType("google"));
    navigate("/createaccountwithgoogle");
  }

  function signUpWithEmailAndDispatch() {
    dispatch(setLoginType("email"));
    createUserWithEmail();
    navigate("/createaccountwithemail");
  }

  function signOutAndBackToHome() {
    signOutUser();
    navigate("/");
  }

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      console.log(user);
      dispatch(toggleIsLoggedIn(true));
      dispatch(setUserId(user.email)); // ou bien mail ? vérifier comment est créé le user dans la database
      let userExists = await checkExistingUser(displayUserId);
      if (userExists === false) {
        // navigate("/createaccount");
      } else if (userExists === true) {
        //...
      }
    } else {
      dispatch(toggleIsLoggedIn(false));
      dispatch(setUserId(null));
    }
  });

  if (isLoggedIn) {
    return (
      <div>
        <Link className="homeLink" to={displayUserId}>
          <img id="userSmallProfilePic" src="" alt="userProfilePicture"></img>
        </Link>
        <p>User ID : {displayUserId}</p>
        <button onClick={signOutAndBackToHome}>Sign Out</button>
        <button>Check Username</button>
        <button>displayName from Redux</button>
        <p>{isLoggedIn ? "signed in" : "signed out"}</p>
      </div>
    );
  }
  return (
    <div className="signInBox">
      <h1>New on Twitter ?</h1>
      <button onClick={signUpWithGoogleAndDispatch}>Sign up with Google</button>
      <button>Sign up with Apple (soon)</button>
      <button
        onClick={() => {
          signUpWithEmailAndDispatch();
        }}
      >
        Create an Account (work in progress)
      </button>
      <p>By setting up an account, you're accepting our Terms of Use.</p>
      <button onClick={() => navigate("/login")}>
        Login to an existing account
      </button>
    </div>
  );
}
