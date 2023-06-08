import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { auth, signIn, signOutUser, myFunc } from "./Firebase.js";
import { db, getUserName, getProfilePicUrl } from "./Firebase";
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
  selectUserName,
  selectDisplayName,
  toggleIsLoggedIn,
  setDisplayName,
  setUserName,
  setDescription,
} from "./userSlice.js";

export async function createUser(user) {
  // Add a new document in collection "cities"
  await setDoc(doc(db, "users", user.uid), {
    displayName: user.displayName,
    userName: prompt("Choose a username"),
    // create a function that can change the userName
    following: [],
    followers: [],
  });
}

export default function User() {
  onAuthStateChanged(auth, (user) => {
    // check si user.toJSON().uid correspond à une entrée de la db
    // créer user à partir de user.toJSON()
    // console.log(user.toJSON()); //est un objet
    if (user) {
      dispatch(toggleIsLoggedIn(true));
      if (selectIsLoggedIn === true) {
        if (checkExistingUser(user.uid) === true) {
          // créer fct setExistingUser ???
          dispatch(setDisplayName(user.toJSON().displayName));
          dispatch(setUserName(user.toJSON().uid));
        } else {
          // amener l'user vers une page où il peut définir son profil
          createUser(user.toJSON());
          dispatch(setDisplayName(user.toJSON().displayName));
          dispatch(setUserName(user.toJSON().uid));
        }
      }
    } else {
      console.log("Error, no User");
      console.log("onAuth check : user is Signed Out");
    }
  });

  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userName = useSelector(selectUserName);
  const displayName = useSelector(selectDisplayName);
  const dispatch = useDispatch();

  async function signInUser() {
    await signIn()
      .then((result) => {
        const user = result.user;
        console.log(user);
        if (checkExistingUser(user.uid) === false) {
          createUser(user);
          return;
        }
        dispatch(setDisplayName(user.displayName));
        dispatch(setUserName(user.uid));
        dispatch(toggleIsLoggedIn(true));
      })
      .catch((error) => {
        console.log(error);
        console.log("user sign in failed");
      });
  }

  function signOut() {
    signOutUser();
    dispatch(setDisplayName(null));
    dispatch(toggleIsLoggedIn(false));
  }

  async function checkExistingUser(id) {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id);
      //   console.log(doc.id, " => ", doc.data());
      if (doc.id === id) {
        return true;
      }
    });
  }

  //Input : userName/Id Output : TweetObjectsArray
  function getUserTweets() {
    return [];
  }

  //Update userName/Id Output : changes currentuser
  function getUserInfo() {
    return;
  }

  // Updates Firebase Information
  function updateUserDescription(description) {
    return;
  }

  // Updates Firebase Display Name
  function updateDisplayName() {
    return;
  }

  // Add Following to active User & Follower to target User
  function addFollowing(userId) {}

  return (
    <div>
      <Link className="homeLink" to="/Charles_0001">
        <img
          id="userSmallProfilePic"
          src={getProfilePicUrl()}
          alt="userProfilePicture"
        ></img>
      </Link>
      <p>Username : {userName}</p>
      <button onClick={() => signInUser()}>Sign In</button>
      <button onClick={() => signOut()}>Sign Out</button>
      <button onClick={() => checkExistingUser("2r8CtvoORnL3CQJbVs3K")}>
        Check Username
      </button>
      <button onClick={() => console.log("user from Redux is" + displayName)}>
        displayName from Redux
      </button>
      <p>{isLoggedIn ? "signed in" : "signed out"}</p>
    </div>
  );
}
