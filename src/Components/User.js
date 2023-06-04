import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { auth, signIn, signOutUser, myFunc } from "./Firebase.js";
import { db, getUserName, getProfilePicUrl } from "./Firebase";
import { getFirestore, query, collection, getDocs } from "firebase/firestore";

import {
  selectIsLoggedIn,
  setName,
  selectName,
  toggleIsLoggedIn,
} from "./userSlice.js";
import { onAuthStateChanged } from "firebase/auth";

export default function User() {
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        user.providerData.forEach((profile) => {
          console.log("Sign-in provider: " + profile.providerId);
          console.log("  Provider-specific UID: " + profile.uid);
          console.log("  Name: " + profile.displayName);
          console.log("  Email: " + profile.email);
          console.log("  Photo URL: " + profile.photoURL);
        });
        console.log(user.toJSON());
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

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userName = useSelector(selectName);
  const dispatch = useDispatch();

  async function signInUser() {
    signIn()
      .then((result) => {
        console.log("user signed in");
        const user = result.user;
        dispatch(setName(user.displayName));
        dispatch(toggleIsLoggedIn(true));
      })
      .catch((error) => {
        console.log("user sign in failed");
      });
  }

  function signOut() {
    signOutUser();
    dispatch(setName(null));
    dispatch(toggleIsLoggedIn(false));
  }

  async function checkExistingUsername(name) {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      //   console.log(doc.id, " => ", doc.data());
      if (doc.id === name) {
        console.log("user already exists");
      } else {
        console.log("user id doesn't exist yet");
      }
    });
  }

  return (
    <div>
      <Link className="homeLink" to="/userprofile">
        <img
          id="userSmallProfilePic"
          src={getProfilePicUrl()}
          alt="userProfilePicture"
        ></img>
      </Link>
      <p>Username : {userName}</p>
      <button onClick={() => signInUser()}>Sign In</button>
      <button onClick={() => signOut()}>Sign Out</button>
      <button onClick={() => checkExistingUsername("2r8CtvoORnL3CQJbVs3K")}>
        Check Username
      </button>
      <p>{isLoggedIn ? "signed in" : "signed out"}</p>
    </div>
  );
}
