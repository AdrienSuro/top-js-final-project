import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { auth, signIn, signOutUser, myFunc } from "./Firebase.js";

import {
  selectTweets,
  selectIsLoggedIn,
  setName,
  selectName,
  toggleIsLoggedIn,
} from "./userSlice.js";
import { onAuthStateChanged } from "firebase/auth";

export default function User() {
  //   useEffect(() => {
  //     return () => {
  //       signOut();
  //     };
  //   }, []);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log("onAuth check : userisSignedIn");
        console.log(user.toJSON().displayName);
        dispatch(setName(user.toJSON().displayName));
        dispatch(toggleIsLoggedIn(true));
      } else {
        console.log("NO USER");
        console.log("onAuth check : user is Signed Out");
      }
    });
  }, []);

  const tweets = useSelector(selectTweets);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userName = useSelector(selectName);
  const dispatch = useDispatch();

  async function signInUser() {
    signIn()
      .then((result) => {
        console.log("user signed in");
        const user = result.user;
        dispatch(setName(user.displayName));
        dispatch(toggleIsLoggedIn());
      })
      .catch((error) => {
        console.log("user sign in failed");
      });
  }

  function signOut() {
    signOutUser();
    dispatch(setName("random user"));
    dispatch(toggleIsLoggedIn());
  }

  return (
    <div>
      <p>Username : {userName}</p>
      <button onClick={() => signInUser()}>Sign In</button>
      <button onClick={() => signOut()}>Sign Out</button>
      <p>{isLoggedIn ? "signed in" : "signed out"}</p>
    </div>
  );
}
